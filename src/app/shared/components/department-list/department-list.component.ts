import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { IDepartment } from "src/app/interfaces/department";
import { DepartmentService } from "src/app/services/department.service";
import { DepartmentModalComponent } from "../department-modal/department-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { DepartmentRemoveModalComponent } from "../department-remove-modal/department-remove-modal.component";

@Component({
  selector: "app-department-list",
  templateUrl: "./department-list.component.html",
  styleUrls: ["./department-list.component.scss"],
})
export class DepartmentListComponent {
  public totalItens: number = 0;
  public pageSize: number = 10;
  public pageIndex: number = 0;

  public departments: IDepartment[] = [];
  public modal: boolean = false;
  public form: any = {};

  public departmentForm = this.fb.group({
    title: [""],
  });

  public createSuccess: boolean = false;
  public createError: boolean = false;
  public createMessage: string = "";

  constructor(
    private departmentService: DepartmentService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    document.title = "Departamentos - Almoxarifado Contajá";
    this.loadDepartment();
  }

  loadDepartment() {
    this.departmentService.getDepartment().subscribe({
      next: (response) => {
        this.departments = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  handleModal() {
    this.modal = !this.modal;
  }

  addDeparment() {
    const newDepartment: any = {};
    newDepartment.name = this.departmentForm.value.title;
    this.departmentService.addDepartment(newDepartment).subscribe({
      next: (response) => {
        this.loadDepartment();
        this.handleModal();
        this.createSuccess = true;
        this.createMessage = response.message;
      },
      error: (error) => {
        this.createSuccess = false;
        this.createError = true;
        this.createMessage = error.error.message;
      },
    });
  }

  handleAddDeparment(department?: IDepartment) {
    const dialogRef = this.dialog.open(DepartmentModalComponent, {
      data: {
        department,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadDepartment();
      }
    });
  }
  handleRemoveDeparment(department: IDepartment) {
    console.log(department);
    const dialogRef = this.dialog.open(DepartmentRemoveModalComponent, {
      data: {
        department,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.pageChange({ pageIndex: this.pageIndex, pageSize: this.pageSize });
    });
  }

  pageChange(event: any) {
    this.departmentService
      .getDepartment({
        offset: event.pageIndex,
        limit: event.pageSize,
      })
      .subscribe((response) => {
        this.departments = response.data;
        this.totalItens = response.total;
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
      });
  }
}
