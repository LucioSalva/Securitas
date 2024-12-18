import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { E404Component } from './components/e404/e404.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  {path: '', component:LoginComponent},
  {path:'home', component:HomeComponent },
  {path: 'E404', component:E404Component },
  {path: '**', redirectTo:'/E404', pathMatch:'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
