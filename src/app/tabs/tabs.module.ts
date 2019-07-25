import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { TabsPage } from './tabs.page';

import { InformationPageModule } from '../information/information.module';
import { MapsPageModule } from '../maps/maps.module';
import { HomePageModule } from '../home/home.module'

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      { path: 'home', loadChildren: '../home/home.module#HomePageModule' },
      { path: 'maps', loadChildren: '../maps/maps.module#MapsPageModule' },
      { path: 'information', loadChildren: '../information/information.module#InformationPageModule' },
      { path: 'statistics/:title/:address', loadChildren: '../statistics/statistics.module#StatisticsPageModule' },
      { path: 'login', loadChildren: '../login/login.module#LoginPageModule' }




    ]
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }