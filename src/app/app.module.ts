import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { LoginComponent } from './pages/login/login.component'
import { HomeComponent } from './pages/home/home.component'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'


import { SharedModule } from './shared/shared.module'
import { ErrorComponent } from './pages/error/error.component'
import { ItemComponent } from './pages/item/item.component'
import { ReportComponent } from './pages/report/report.component'
import { CollaboratorComponent } from './pages/collaborator/collaborator.component'

import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'

import { LoginService } from './services/login.service';
import { DepartmentComponent } from './pages/department/department.component';
import { EquipmentComponent } from './pages/equipment/equipment.component'
import { ToastrModule } from 'ngx-toastr'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ErrorComponent,
    ItemComponent,
    ReportComponent,
    CollaboratorComponent,
    DepartmentComponent,
    EquipmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    SharedModule,
    MatButtonModule,
    MatCardModule,
    ToastrModule.forRoot(),
  ],
  providers: [LoginService],
  bootstrap: [AppComponent],
})
export class AppModule {}
