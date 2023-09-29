
import { Component, Inject, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ICollaborator } from "src/app/interfaces/collaborator";
import { IEquipment } from "src/app/interfaces/equipment";
import { IItem } from "src/app/interfaces/item";
import { CollaboratorService } from "src/app/services/collaborator.service";
import { EquipmentService } from "src/app/services/equipment.service";
import { ItemService } from "src/app/services/item.service";
import { LoginService } from "src/app/services/login.service";


interface DialogData {
  equipment?: IEquipment;
}

@Component({
  selector: 'app-equipment-modal',
  templateUrl: './equipment-modal.component.html',
  styleUrls: ['./equipment-modal.component.scss']
})
export class EquipmentModalComponent  implements OnInit {
  public title: string = this.data.equipment?.id
    ? "Editar Equipamento"
    : "Adicionar Equipamento";
  public collaborators: ICollaborator[] = [];
  protected form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private equipmentService: EquipmentService,
    private collaboratorService: CollaboratorService,
    protected loginService: LoginService,
    private dialogRef: MatDialogRef<EquipmentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.form = this.fb.group({
      title: [data.equipment?.title],
      description: [data.equipment?.description],
      collaborators: [data.equipment?.collaborators],
      attributes: this.fb.array(
        data.equipment?.items?.map(({ property, value }) => {
          return this.fb.group({
            property,
            value,
          });
        }) || []
      ),
    });
  }

  ngOnInit(): void {
    this.collaboratorService.getCollaborator().subscribe((response) => {
      this.collaborators = response.data;
    });
  }

  submit() {
    const equipmentEdited: any = {};
    equipmentEdited.id = this.data.equipment?.id;
    equipmentEdited.title = this.form.value.title;
    equipmentEdited.description = this.form.value.description;
    let itens: Partial<IItem>[] = [];
    for (let attribute of this.form.value.attributes!) {
      itens.push({
        property: attribute.property,
        value: attribute.value,
        equipmentId: this.data.equipment?.id,
      });
    }
    itens.map((item) => {
      this.itemService.addItem(item).subscribe(() => {});
    });

    if (equipmentEdited.id) {
      this.equipmentService.editEquipment(equipmentEdited).subscribe(() => {
        this.dialogRef.close(true);
      });
      return;
    }

    this.equipmentService.addEquipment(equipmentEdited).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  get attributes() {
    return this.form.get("attributes") as FormArray;
  }

  addAttributes() {
    this.attributes.push(
      this.fb.group({
        property: [""],
        value: [""],
      })
    );
  }
  removeAttributes(index: number) {
    this.attributes.removeAt(index);
  }
}
