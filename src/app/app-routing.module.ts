import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';



const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: 'main/:username', component: MainComponent},
  {path: 'profile/:username', component: ProfileComponent},
  {path: '', redirectTo: '/auth', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
