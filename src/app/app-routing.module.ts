import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthAdminGuard } from './auth-admin.guard';
import { AuthenticateLoginGuard } from './auth.guard';
//import { IsLoginAuthGuard } from './is-login-auth.guard';

//Tenemos que proteger las rutas con el Guard
//TODO: Rutas comentadas para evitar el acceso publico. Añadir en el github.

const routes: Routes = [
  {
    path: '**', 
    pathMatch: 'full',
    redirectTo: 'home-view'
  },
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
  },  {
    path: 'choice-restaurant',
    loadChildren: () => import('./modals/choice-restaurant/choice-restaurant.module').then( m => m.ChoiceRestaurantPageModule)
  },

  // {
  //   path: 'products-view',
  //   loadChildren: () => import('./pages/products-view/products-view.module').then( m => m.ProductsViewPageModule)
  // },
  // {
  //   path: 'cart-view',
  //   loadChildren: () => import('./pages/cart-view/cart-view.module').then( m => m.CartViewPageModule)
  // },
  // {
  //   path: 'login-view',
  //   loadChildren: () => import('./pages/login-view/login.module').then( m => m.LoginPageModule),
  //   //canActivate: [IsLoginAuthGuard],
  // },
  // {
  //   path: 'register-view',
  //   loadChildren: () => import('./pages/register-view/register.module').then( m => m.RegisterPageModule)
  // },
  // {
  //   path: 'admin-view',
  //   loadChildren: () => import('./pages/admin-view/admin-view.module').then( m => m.AdminViewPageModule),
  //   canActivate: [AuthAdminGuard],
  // },
  // {
  //   path: 'profile-view',
  //   loadChildren: () => import('./pages/profile-view/profile-view.module').then( m => m.ProfileViewPageModule),
  //   canActivate: [AuthenticateLoginGuard],
  // },
  // {
  //   path: 'forgot-password-view',
  //   loadChildren: () => import('./pages/forgot-password-view/forgot-password-view.module').then( m => m.ForgotPasswordViewPageModule)
  // },
  // {
  //   path: 'logout-view',
  //   loadChildren: () => import('./pages/logout-view/logout-view.module').then( m => m.LogoutViewPageModule)
  // },
  // {
  //   path: 'notfound-view',
  //   loadChildren: () => import('./pages/notfound-view/notfound-view.module').then( m => m.NotfoundViewPageModule)
  // },
  // {
  //   path: 'promotions-view',
  //   loadChildren: () => import('./pages/promotions-view/promotions-view.module').then( m => m.PromotionsViewPageModule)
  // },
  // {
  //   path: 'build-order',
  //   loadChildren: () => import('./modals/build-order/build-order.module').then( m => m.BuildOrderPageModule)
  // },
  // {
  //   path: 'pay-info',
  //   loadChildren: () => import('./modals/pay-info/pay-info.module').then( m => m.PayInfoPageModule)
  // }


  
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