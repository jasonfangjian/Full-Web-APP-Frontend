import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { MainComponent } from './main/main.component';
import { PostComponent } from './main/post/post.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { PwdValidateDirective } from './pwd-validate.directive';
import { DobValidateDirective } from './dob-validate.directive';
import { FollowingComponent } from './main/following/following.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegistrationComponent,
    MainComponent,
    PostComponent,
    ProfileComponent,
    LoginComponent,
    PwdValidateDirective,
    DobValidateDirective,
    FollowingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
