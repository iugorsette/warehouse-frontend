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


  public filters = this.fb.group({
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
    this.pageChange({ pageIndex: 0, pageSize: 10 });
  }

  handleFilters() {
    this.departmentService
      .getDepartment({
        name: this.filters.value.title ? this.filters.value.title : "",
      })
      .subscribe((response) => {
        this.departments = response.data;
        this.totalItens = response.total;
      });
  }

  handleClearFilters() {
    this.filters.reset();
    this.handleFilters();
  }


  handleAddDeparment(department?: IDepartment) {
    const dialogRef = this.dialog.open(DepartmentModalComponent, {
      data: {
        department,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.pageChange({ pageIndex: this.pageIndex, pageSize: this.pageSize });
      }
    });
  }
  
  handleRemoveDeparment(department: IDepartment) {
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
