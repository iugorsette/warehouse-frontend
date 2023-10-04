import { Component, Inject, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ReplaySubject, Subject, take, takeUntil } from "rxjs";
import { ICollaborator } from "src/app/interfaces/collaborator";
import { IEquipment } from "src/app/interfaces/equipment";
import { IItem } from "src/app/interfaces/item";
import { CollaboratorService } from "src/app/services/collaborator.service";
import { EquipmentService } from "src/app/services/equipment.service";
import { LoginService } from "src/app/services/login.service";

interface DialogData {
  equipment?: IEquipment;
}

@Component({
  selector: "app-equipment-modal",
  templateUrl: "./equipment-modal.component.html",
  styleUrls: ["./equipment-modal.component.scss"],
})
export class EquipmentModalComponent implements OnInit {
  public title: string = this.data.equipment?.id
    ? "Editar Equipamento"
    : "Adicionar Equipamento";
  protected form: FormGroup;

  protected collaborators: ICollaborator[] = [];

  public collaboratorFilterCtrl: FormControl = new FormControl("");

  public filteredCollaborators: ReplaySubject<ICollaborator[]> =
    new ReplaySubject<ICollaborator[]>(1);

  protected _onDestroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
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
    this.filteredCollaborators.next(this.collaborators.slice());

    this.collaboratorFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.handleGetCollaborators();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected setInitialValue() {
    this.filteredCollaborators.pipe(take(1), takeUntil(this._onDestroy));
  }

  handleGetCollaborators() {
    if (!this.collaborators) {
      return;
    }

    let title = this.collaboratorFilterCtrl.value;
    if (!title) {
      this.filteredCollaborators.next(this.collaborators.slice());
      return;
    } else {
      title = title.toLowerCase();
    }

    this.filteredCollaborators.next(
      this.collaborators.filter(
        (collaborator) => collaborator.name.toLowerCase().indexOf(title) > -1
      )
    );

    this.collaboratorService.getCollaborator(title).subscribe((response) => {
      this.collaborators = response.data;
    });
  }

  submit() {
    const equipment: any = {};
    equipment.id = this.data.equipment?.id;
    equipment.title = this.form.value.title;
    equipment.description = this.form.value.description;

    let itens: Partial<IItem>[] = [];
    for (let attribute of this.form.value.attributes!) {
      itens.push({
        id: attribute.id,
        property: attribute.property,
        value: attribute.value,
      });
    }
    equipment.items = itens;

    if (equipment.id) {
      this.equipmentService.editEquipment(equipment).subscribe(() => {
        this.dialogRef.close(true);
      });
      return;
    }
    equipment.collaborators = [this.form.value.collaborators];
    this.equipmentService.addEquipment(equipment).subscribe(() => {
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
