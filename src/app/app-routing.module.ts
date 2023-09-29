import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { LoginComponent } from './pages/login/login.component'
import { HomeComponent } from './pages/home/home.component'
import { ErrorComponent } from './pages/error/error.component'
import { ItemComponent } from './pages/item/item.component'
import { CollaboratorComponent } from './pages/collaborator/collaborator.component'
import { ReportComponent } from './pages/report/report.component'

import { loginGuard } from './guards/login.guard'
import { DepartmentComponent } from './pages/department/department.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'Equipamentos', component: ItemComponent, canActivate: [loginGuard] },
  { path: 'Colaborador', component: CollaboratorComponent, canActivate: [loginGuard] },
  { path: 'Departamento', component: DepartmentComponent, canActivate: [loginGuard] },
  { path: 'Relatório', component: ReportComponent, canActivate: [loginGuard] },
  { path: '', component: HomeComponent },
  { path: '**', component: ErrorComponent },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
