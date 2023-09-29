import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { ICollaborator } from "src/app/interfaces/collaborator";
import { CollaboratorService } from "src/app/services/collaborator.service";
import { CollaboratorModalComponent } from "../collaborator-modal/collaborator-modal.component";
@Component({
  selector: "app-collaborator-list",
  templateUrl: "./collaborator-list.component.html",
  styleUrls: ["./collaborator-list.component.scss"],
})
export class CollaboratorListComponent {
  public collaborators: ICollaborator[] = [];

  public createSuccess: boolean = false;
  public createError: boolean = false;
  public createMessage: string = "";

  constructor(
    private collaboratorService: CollaboratorService,
    private dialog: MatDialog
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
}
