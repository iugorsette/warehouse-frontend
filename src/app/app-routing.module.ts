import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { LoginComponent } from './pages/login/login.component'
import { HomeComponent } from './pages/home/home.component'
import { ErrorComponent } from './pages/error/error.component'
import { ItemComponent } from './pages/item/item.component'
import { ReportComponent } from './pages/report/report.component'

import { loginGuard } from './guards/login.guard'
import { DepartmentComponent } from './pages/department/department.component'
import { EquipmentComponent } from './pages/equipment/equipment.component'
import { CollaboratorComponent } from './pages/collaborator/collaborator.component'
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'equipamentos', component: EquipmentComponent, canActivate: [loginGuard] },
  { path: 'colaborador', component: CollaboratorComponent, canActivate: [loginGuard] },
  { path: 'departamento', component: DepartmentComponent, canActivate: [loginGuard] },
  { path: 'movimentacao', component: ReportComponent, canActivate: [loginGuard] },
  { path: 'itens', component: ItemComponent, canActivate: [loginGuard] },
  { path: '', component: HomeComponent },
  { path: '**', component: ErrorComponent },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
