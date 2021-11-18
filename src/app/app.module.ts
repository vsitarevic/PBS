import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuButtonComponent } from './components/menu-button/menu-button.component';
import { ClientComponent } from './pages/client/client.component';
import { AdminComponent } from './pages/admin/admin.component';
import { BikesComponent } from './components/bikes/bikes.component';
import { DocksComponent } from './components/docks/docks.component';
import { BikeItemComponent } from './components/bike-item/bike-item.component';
import { ClientsComponent } from './components/clients/clients.component';
import { AddBikeComponent } from './components/add-bike/add-bike.component';
import { DialogConfirmComponent } from './components/dialog/dialog.component';
import { AddDockComponent } from './components/add-dock/add-dock.component';
import { DockItemComponent } from './components/dock-item/dock-item.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { ClientItemComponent } from './components/client-item/client-item.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuButtonComponent,
    ClientComponent,
    AdminComponent,
    BikesComponent,
    DocksComponent,
    BikeItemComponent,
    ClientsComponent,
    AddBikeComponent,
    DialogConfirmComponent,
    AddDockComponent,
    DockItemComponent,
    AddClientComponent,
    ClientItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
