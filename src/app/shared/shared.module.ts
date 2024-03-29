import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { ItemListComponent } from "./components/item-list/item-list.component";
import { ModalComponent } from "./components/modal/modal.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { PaginatorComponent } from "./components/paginator/paginator.component";
import { ReportListComponent } from "./components/report-list/report-list.component";

import { FormsModule } from "@angular/forms";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";

import { ReactiveFormsModule } from "@angular/forms";
import { CollaboratorListComponent } from "./components/collaborator-list/collaborator-list.component";
import { MatDialogModule } from "@angular/material/dialog";
import { AddItemComponent } from "./components/add-item/add-item.component";
import { HandleRemoveDialogComponent } from "./components/handle-remove-dialog/handle-remove-dialog.component";
import { ErrorMessageComponent } from "./components/error-message/error-message.component";
import { SuccessMessageComponent } from "./components/success-message/success-message.component";
import { CreateMovementComponent } from "./components/create-movement/create-movement.component";
import { CollaboratorModalComponent } from "./components/collaborator-modal/collaborator-modal.component";
import { DepartmentModalComponent } from "./components/department-modal/department-modal.component";
import { DepartmentListComponent } from "./components/department-list/department-list.component";
import { EquipmentListComponent } from "./components/equipment-list/equipment-list.component";
import { EquipmentModalComponent } from "./components/equipment-modal/equipment-modal.component";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";

import {
  MAT_SELECTSEARCH_DEFAULT_OPTIONS,
  MatSelectSearchOptions,
} from "ngx-mat-select-search";
import { CollaboratorRemoveModalComponent } from "./components/collaborator-remove-modal/collaborator-remove-modal.component";
import { DepartmentRemoveModalComponent } from "./components/department-remove-modal/department-remove-modal.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ItemModalComponent } from './components/item-modal/item-modal.component';
import { ItemRemoveModalComponent } from './components/item-remove-modal/item-remove-modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ItemListComponent,
    ModalComponent,
    NavbarComponent,
    PaginatorComponent,
    CollaboratorListComponent,
    AddItemComponent,
    ReportListComponent,
    HandleRemoveDialogComponent,
    ErrorMessageComponent,
    SuccessMessageComponent,
    CreateMovementComponent,
    CollaboratorModalComponent,
    DepartmentModalComponent,
    DepartmentListComponent,
    EquipmentListComponent,
    EquipmentModalComponent,
    CollaboratorRemoveModalComponent,
    DepartmentRemoveModalComponent,
    ItemModalComponent,
    ItemRemoveModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCardModule,
    MatInputModule,
    MatTabsModule,
    MatToolbarModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule,
    NgxMatSelectSearchModule,
    MatTooltipModule,
  ],
  exports: [
    HeaderComponent,
    ModalComponent,
    NavbarComponent,
    ItemListComponent,
    CollaboratorListComponent,
    PaginatorComponent,
    ReportListComponent,
    EquipmentListComponent,
    DepartmentListComponent,
    ErrorMessageComponent,
    SuccessMessageComponent,
  ],
  providers: [
    {
      provide: MAT_SELECTSEARCH_DEFAULT_OPTIONS,
      useValue: <MatSelectSearchOptions>{
        closeIcon: "delete",
        noEntriesFoundLabel: "Não há dados para exibir",
        placeholderLabel: "Pesquisar",
      },
    },
  ],
})
export class SharedModule {}
