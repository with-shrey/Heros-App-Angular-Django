import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {HeroesComponent} from "./components/heroes/heroes.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {HeroDetailComponent} from "./components/hero-detail/hero-detail.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'heroes', component: HeroesComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'dashboard', component: DashboardComponent },
]
@NgModule({
  declarations: [],
  exports: [
    RouterModule
  ],
  imports:[
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
