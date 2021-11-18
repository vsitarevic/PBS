import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ClientComponent } from 'src/app/pages/client/client.component'
import { AdminComponent } from 'src/app/pages/admin/admin.component';

const routes: Routes = [
  {path: '', component: ClientComponent},
  {path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
