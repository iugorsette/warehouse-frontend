import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { ICollaborator } from "src/app/interfaces/collaborator";
import { CollaboratorService } from "src/app/services/collaborator.service";
import { CollaboratorModalComponent } from "../collaborator-modal/collaborator-modal.component";
import { FormBuilder, FormControl } from "@angular/forms";
import { IDepartment } from "src/app/interfaces/department";
import { ReplaySubject, Subject, takeUntil } from "rxjs";
import { DepartmentService } from "src/app/services/department.service";
import { CollaboratorRemoveModalComponent } from "../collaborator-remove-modal/collaborator-remove-modal.component";
@Component({
  selector: "app-collaborator-list",
  templateUrl: "./collaborator-list.component.html",
  styleUrls: ["./collaborator-list.component.scss"],
})
export class CollaboratorListComponent {
  public totalItens: number = 0;
  public pageSize: number = 10;
  public pageIndex: number = 0;

  public filters = this.fb.group({
    name: [""],
    role: [""],
    department: [""],
  });

  public collaborators: ICollaborator[] = [];

  public createSuccess: boolean = false;
  public createError: boolean = false;
  public createMessage: string = "";

  protected departments: IDepartment[] = [];

  public departmentCtrl: FormControl = new FormControl();

  public departmentFilterCtrl: FormControl = new FormControl("");

  public filteredDepartments: ReplaySubject<IDepartment[]> = new ReplaySubject<
    IDepartment[]
  >(1);

  protected _onDestroy = new Subject<void>();

  constructor(
    private collaboratorService: CollaboratorService,
    private departmentService: DepartmentService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    document.title = "Colaboradores - Almoxarifado Contajá";
    this.pageChange({ pageIndex: 0, pageSize: 10 });

    this.departmentService.getDepartment().subscribe((response) => {
      this.departments = response.data;
    });

    this.filteredDepartments.next(this.departments.slice());

    this.departmentFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterDepartments();
      });
  }

  filterDepartments() {
    if (!this.departments) {
      return;
    }
    let search = this.departmentFilterCtrl.value;
    if (!search) {
      this.filteredDepartments.next(this.departments.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredDepartments.next(
      this.departments.filter((department) => {
        return department.name.toLowerCase().indexOf(search) > -1;
      })
    );
  }

  loadCollaborator() {
    this.collaboratorService.getCollaborator().subscribe((response) => {
      this.collaborators = response.data;
      console.log(this.collaborators);
    });
  }

  handleAddCollaborator(collaborator?: ICollaborator) {
    const dialogRef = this.dialog.open(CollaboratorModalComponent, {
      data: {
        collaborator,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.pageChange({ pageIndex: this.pageIndex, pageSize: this.pageSize });
      }
    });
  }

  pageChange(event: any) {
    this.collaboratorService
      .getCollaborator({
        offset: event.pageIndex,
        limit: event.pageSize,
      })
      .subscribe((response) => {
        this.collaborators = response.data;
        this.totalItens = response.total;
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
      });
  }

  handleFilters() {
    this.collaboratorService
      .getCollaborator({
        name: this.filters.value.name ? this.filters.value.name : "",
        role: this.filters.value.role ? this.filters.value.role : "",
        department: this.filters.value.department
          ? this.filters.value.department
          : "",
      })
      .subscribe((response) => {
        this.collaborators = response.data;
        this.totalItens = response.total;
      });
  }


  handleRemoveCollaborator(collaborator: ICollaborator) {
    const dialogRef = this.dialog.open(CollaboratorRemoveModalComponent, {
      data: {
        collaborator,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.pageChange({ pageIndex: this.pageIndex, pageSize: this.pageSize });
    });
  }

  handleClearFilters() {
    this.filters.reset();
    this.handleFilters();
  }
}
