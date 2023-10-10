
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { IItem } from "src/app/interfaces/item";
import { CollaboratorService } from "src/app/services/collaborator.service";

interface DialogData {
  item: IItem;
}
@Component({
  selector: 'app-item-remove-modal',
  templateUrl: './item-remove-modal.component.html',
  styleUrls: ['./item-remove-modal.component.scss']
})
export class ItemRemoveModalComponent  {
  constructor(
    private collaboratorService: CollaboratorService,
    private dialogRef: MatDialogRef<ItemRemoveModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  deleteItem() {
    this.collaboratorService.deleteCollaborator(this.data.item.id)
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }
}
