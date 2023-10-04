
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ICollaborator } from "src/app/interfaces/collaborator";
import { CollaboratorService } from "src/app/services/collaborator.service";

interface DialogData {
  collaborator: ICollaborator;
}
@Component({
  selector: 'app-collaborator-remove-modal',
  templateUrl: './collaborator-remove-modal.component.html',
  styleUrls: ['./collaborator-remove-modal.component.scss']
})
export class CollaboratorRemoveModalComponent {
  constructor(
    private collaboratorService: CollaboratorService,
    private dialogRef: MatDialogRef<CollaboratorRemoveModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  deleteItem() {
    this.collaboratorService.deleteCollaborator(this.data.collaborator.id)
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }
}
