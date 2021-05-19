import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
//
import { User } from '../interfaces/user';
//
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase/app';
//
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { AlertController } from '@ionic/angular';
//
import { errorHandler } from '../errors-handler/errors-handler';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public dataUser$: Observable<User>;
  public errorHandlre = new errorHandler(this.alertController, this.router);

  //guard observable
  public authenticationState : BehaviorSubject<boolean> = new BehaviorSubject(false);
  public authenticationAdminState : BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private firebaseAuth : AngularFireAuth, 
    private fireStore: AngularFirestore, 
    public alertController: AlertController,
    public router: Router
  )
  {
    this.pipeOfDataUser$();
  }

  userAdmin(email:string):boolean{

    const adminsEmails = Object.values(environment.adminUsers);
    const user = adminsEmails.find(i=> i == email);
    
    return (user != undefined ? true : false);

    //return email == environment.adminUsers.devbryansank ? true : false;
  }
  //

  pipeOfDataUser$(){
    this.dataUser$ = this.firebaseAuth.authState.pipe(
      switchMap( (userState)=>{
        if(userState){
          //console.log("Tomando el Uid de userState para validar-");
          return this.fireStore.doc<User>(`users/${userState.uid}`).valueChanges();
        }else{
          return of(null);
        }
      })
    );
  }

  isEmailValid(user: User) : boolean {
    return user.emailVerified === true ? true : false;
  }

  async sendVerificateEmailMethod(): Promise<void>{
    try {
      return (await this.firebaseAuth.currentUser).sendEmailVerification();
    } catch (error) {
      this.errorHandlre.handlerError(error);
    }
  }

  async resetPassword(email: string): Promise<void>{
    try { 
      return this.firebaseAuth.sendPasswordResetEmail(email);
    } catch (error) {
      this.errorHandlre.handlerError(error);
    }
  }

  async loginGoogle(): Promise<User>{
    //debugger;
    try { 
      const instanceFire = new firebase.default.auth.GoogleAuthProvider();
      const {user} = await this.firebaseAuth.signInWithPopup(instanceFire);

      this.UpdateUserDataInFireStore(user);
      return user;

    } catch (error) {
      //debugger;
      this.errorHandlre.handlerError(error);
    }
  }

  async register(email:string, password:string): Promise<User>{
    try { 
      const { user } = await this.firebaseAuth.createUserWithEmailAndPassword(email, password);
      await  this.sendVerificateEmailMethod();
      return user;
    } catch (error) {
      this.errorHandlre.handlerError(error);
    }
  }

  async login(email:string, password:string): Promise<User>{
    try { 
      const { user } = await this.firebaseAuth.signInWithEmailAndPassword(email, password);
      this.UpdateUserDataInFireStore(user);
      return user;
    } catch (error) {
      this.errorHandlre.handlerError(error);
    }
  }

  async logout(): Promise<void>{
    try { 
      await this.firebaseAuth.signOut();
      this.AuthenticatedAdmin(false);
      this.Authenticated(false);
      
    } catch (error) {
      this.errorHandlre.handlerError(error);
    }
  }

  private UpdateUserDataInFireStore(user: User){
    const userRef: AngularFirestoreDocument<User> = this.fireStore.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName
    };
    //Insertando en la db, si encuentra el mismo correo le hace merge
    return userRef.set(data, {merge:true});
  }

  public isAuthenticated(authState:string) :boolean {
    return authState == "profile" ? this.authenticationState.value : this.authenticationAdminState.value;
  }

  public AuthenticatedAdmin(flag:boolean):void{
    flag == true ? this.authenticationAdminState.next(true): this.authenticationAdminState.next(false);
  }

  public Authenticated(flag:boolean):void{
    flag == true ? this.authenticationState.next(true): this.authenticationState.next(false);
  }

}
