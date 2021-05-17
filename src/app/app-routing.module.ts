import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticateLoginGuard } from './auth.guard';
//import { IsLoginAuthGuard } from './is-login-auth.guard';

//Tenemos que proteger las rutas con el Guard

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home-view',
    pathMatch: 'full'
  },
  {
    path: 'home-view',
    //loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
    //LazidLoad ?
    loadChildren: () => import('./pages/home-view/home-view.module').then( m => m.HomeViewPageModule)
  },
  {
    path: 'products-view',
    loadChildren: () => import('./pages/products-view/products-view.module').then( m => m.ProductsViewPageModule)
  },
  {
    path: 'cart-view',
    loadChildren: () => import('./pages/cart-view/cart-view.module').then( m => m.CartViewPageModule)
  },
  {
    path: 'login-view',
    loadChildren: () => import('./pages/login-view/login.module').then( m => m.LoginPageModule),
    //canActivate: [IsLoginAuthGuard],
  },
  {
    path: 'register-view',
    loadChildren: () => import('./pages/register-view/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'admin-view',
    loadChildren: () => import('./pages/admin-view/admin-view.module').then( m => m.AdminViewPageModule),
    canActivate: [AuthenticateLoginGuard],
  },
  {
    path: 'forgot-password-view',
    loadChildren: () => import('./pages/forgot-password-view/forgot-password-view.module').then( m => m.ForgotPasswordViewPageModule)
  },
  {
    path: 'logout-view',
    loadChildren: () => import('./pages/logout-view/logout-view.module').then( m => m.LogoutViewPageModule)
  },
  {
    path: 'notfound-view',
    loadChildren: () => import('./pages/notfound-view/notfound-view.module').then( m => m.NotfoundViewPageModule)
  },
  {
    path: 'promotions-view',
    loadChildren: () => import('./pages/promotions-view/promotions-view.module').then( m => m.PromotionsViewPageModule)
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//Componente no traen archivo de ruta
//Paginas trae archivo de ruta.