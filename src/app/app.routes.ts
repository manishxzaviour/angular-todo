import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { SignupComponent } from './page/signup/signup.component';
import { HomeComponent } from './page/home/home.component';
import { EditorComponent } from './page/editor/editor.component';

export const routes: Routes = [
    {path:'', redirectTo:'home', pathMatch: 'full'},
    {path:'login', component: LoginComponent},
    {path:'signup', component: SignupComponent},
    {path:'create', component:EditorComponent},
    {path:'home', component: HomeComponent}    
];
