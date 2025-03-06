import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { SignupComponent } from './page/signup/signup.component';
import { HomeComponent } from './page/home/home.component';

export const routes: Routes = [
    {path:'', redirectTo:'home', pathMatch: 'full'},
    {path:'login', component: LoginComponent},
    {path:'signup', component: SignupComponent},
    {path:'home', component: HomeComponent}    
];
