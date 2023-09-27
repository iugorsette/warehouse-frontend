import { Component, Inject, Input } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { IEquipment } from "src/app/interfaces/equipment";
import { EquipmentService } from "src/app/services/equipment.service";
import { LoginService } from "src/app/services/login.service";

interface DialogData {
  equipment: IEquipment;
}
@Component({
  selector: "app-handle-remove-dialog",
  templateUrl: "./handle-remove-dialog.component.html",
  styleUrls: ["./handle-remove-dialog.component.scss"],
})
export class HandleRemoveDialogComponent {
  public haveItensAssociate :boolean = this.data.equipment.items.length > 0;
  public haveCollaboratorsAssociate :boolean = this.data.equipment.collaborators.length > 0;
  
  public canDelete :boolean = !this.haveItensAssociate && !this.haveCollaboratorsAssociate;

  constructor(
    private equipmentSevice: EquipmentService,
    protected loginService: LoginService,
    private dialogRef: MatDialogRef<HandleRemoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  deleteItem() {
    this.equipmentSevice
      .deleteEquipment(this.data.equipment.id)
      .subscribe((response) => {
        console.log(response);
        this.dialogRef.close(true);
      });
  }
}
