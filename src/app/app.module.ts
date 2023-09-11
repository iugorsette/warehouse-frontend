import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { LoginComponent } from './pages/login/login.component'
import { HomeComponent } from './pages/home/home.component'

import { MatIconModule } from '@angular/material/icon'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'

import { MatButtonModule } from '@angular/material/button'

import { SharedModule } from './shared/shared.module'
import { ErrorComponent } from './pages/error/error.component'
import { ItemComponent } from './pages/item/item.component'
import { ReportComponent } from './pages/report/report.component'
import { CollaboratorComponent } from './pages/collaborator/collaborator.component'
import { SectorComponent } from './pages/sector/sector.component'

import { MatCardModule } from '@angular/material/card'

import { LoginService } from './services/login.service'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ErrorComponent,
    ItemComponent,
    ReportComponent,
    CollaboratorComponent,
    SectorComponent,
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
  ],
  providers: [LoginService],
  bootstrap: [AppComponent],
})
export class AppModule {}
