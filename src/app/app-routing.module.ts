import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IonTabs } from '@ionic/angular';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  {
    path: 'tabs' , loadChildren: './tabs/tabs.module#TabsPageModule',

  },
  // {
  //   path: 'home',
  //   loadChildren: './home/home.module#HomePageModule'
  // },
  // {
  //   path: 'list',
  //   loadChildren: './list/list.module#ListPageModule'
  // },

  // { path: 'branches', loadChildren: './branches/branches.module#BranchesPageModule' },
  // { path: 'information', loadChildren: './information/information.module#InformationPageModule' },
   { path: 'statistics/:title/:address', loadChildren: './statistics/statistics.module#StatisticsPageModule' },
   // { path: 'maps', loadChildren: './maps/maps.module#MapsPageModule' },
  // { path: 'pop', loadChildren: './pop/pop.module#PopPageModule' },
  { path: 'contact/:title/:address', loadChildren: './contact/contact.module#ContactPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }