import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { ICollaborator } from "src/app/interfaces/collaborator";
import { CollaboratorService } from "src/app/services/collaborator.service";
import { CollaboratorModalComponent } from "../collaborator-modal/collaborator-modal.component";
import { FormBuilder } from "@angular/forms";
@Component({
  selector: "app-collaborator-list",
  templateUrl: "./collaborator-list.component.html",
  styleUrls: ["./collaborator-list.component.scss"],
})
export class CollaboratorListComponent {
  public totalItens: number = 0;
  public pageSize: number = 10;
  public pageIndex: number = 0;

  public filterModal: boolean = false;
  public filters = this.fb.group({
    id: [""],
    name: [""],
    role: [""],
    department: [""],
  });

  public collaborators: ICollaborator[] = [];

  public createSuccess: boolean = false;
  public createError: boolean = false;
  public createMessage: string = "";

  constructor(
    private collaboratorService: CollaboratorService,
    private dialog: MatDialog,
    private fb : FormBuilder
  ) {}

  ngOnInit(): void {
    document.title = "Colaboradores - Almoxarifado Contajá";
    this.loadCollaborator();
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
        this.loadCollaborator();
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
        console.log(response);
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
        department: this.filters.value.department ? this.filters.value.department : false,
        
      })
      .subscribe((response) => {
        this.collaborators = response.data;
        this.totalItens = response.total;
      });
  }

  handleFilterModal() {
    this.filterModal = !this.filterModal;
  }

  handleClearFilters() {
    this.filters.reset();
    this.handleFilters();
  }
}
