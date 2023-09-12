import { Component, Inject, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ICollaborator } from "src/app/interfaces/collaborator";
import { IEquipment } from "src/app/interfaces/equipment";
import { IItem, Item } from "src/app/interfaces/item";
import { CollaboratorService } from "src/app/services/collaborator.service";
import { EquipmentService } from "src/app/services/equipment.service";
import { ItemService } from "src/app/services/item.service";
import { LoginService } from "src/app/services/login.service";

interface DialogData {
  equipment?: IEquipment;
}

@Component({
  selector: "app-add-item",
  templateUrl: "./add-item.component.html",
  styleUrls: ["./add-item.component.scss"],
})
export class AddItemComponent implements OnInit {
  public title: string = this.data.equipment?.id
    ? "Editar equipamento"
    : "Adicionar equipamento";
  public collaborators: ICollaborator[] = [];
  protected form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private equipmentService: EquipmentService,
    private collaboratorService: CollaboratorService,
    protected loginService: LoginService,
    private dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.form = this.fb.group({
      title: [data.equipment?.title],
      description: [data.equipment?.description],
      collaborator: [data.equipment?.collaborator],
      attributes: this.fb.array(
        data.equipment?.attributes?.map((attribute) => {
          return this.fb.group({
            property: [Object.keys(attribute)[0]],
            value: [attribute[Object.keys(attribute)[0]]],
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
