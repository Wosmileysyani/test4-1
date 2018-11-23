import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../app/home/home.component';
import { CreateComponent } from '../app/home/create/create.component';
import { RouterModule, Routes } from '@angular/router';


const Routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'home/create', component: CreateComponent },
  { path: 'home/edit/:id', component: CreateComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(Routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
