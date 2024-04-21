import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dynamicFields',
    pathMatch: 'full'
  },
 
  {
    path: 'dynamicFields',
    loadChildren: () => import('./dynamic-fields/dynamic-fileds-routing.module').then(m=>m.DynamicFiledsRoutingModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
