import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core/services/auth-guard.service';

const routes: Routes = [
  {
    loadChildren: 'src/app/auth/auth.module#AuthModule',
    path: 'auth',
  },
  {
    // canLoad: [AuthGuardService],
    loadChildren: 'src/app/data/data.module#DataModule',
    path: 'data',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
