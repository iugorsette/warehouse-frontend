import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ReplaySubject, Subject, takeUntil } from "rxjs";
import { ICollaborator } from "src/app/interfaces/collaborator";
import { IEquipment } from "src/app/interfaces/equipment";
import { MovementTypes } from "src/app/interfaces/movement";
import { CollaboratorService } from "src/app/services/collaborator.service";
import { EquipmentService } from "src/app/services/equipment.service";
import { LoginService } from "src/app/services/login.service";
import { MovementService } from "src/app/services/movement.service";

@Component({
  selector: "app-create-movement",
  templateUrl: "./create-movement.component.html",
  styleUrls: ["./create-movement.component.scss"],
})
export class CreateMovementComponent implements OnInit {
  protected movementForm: FormGroup;

  protected collaborators: ICollaborator[] = [];
  protected equipments: IEquipment[] = [];

  public collaboratorFilterCtrl: FormControl = new FormControl("");
  public equipmentFilterCtrl: FormControl = new FormControl("");

  public filteredCollaborators: ReplaySubject<ICollaborator[]> =
    new ReplaySubject<ICollaborator[]>(1);
  public filteredEquipments: ReplaySubject<IEquipment[]> = new ReplaySubject<
    IEquipment[]
  >(1);

  protected _onDestroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private movementService: MovementService,
    private equipmentService: EquipmentService,
    private collaboratorService: CollaboratorService,
    protected loginService: LoginService,
    private dialogRef: MatDialogRef<CreateMovementComponent>
  ) {
    this.movementForm = this.fb.group({
      equipmentId: ["", Validators.required],
      byCollaboratorId: [""],
      toCollaboratorId: [""],
    });
  }

  public filterModal: boolean = false;

  public allMovementTypes: MovementTypes[] = [
    "Entrada",
    "Saída",
    "Transferência",
  ];
  public movement: MovementTypes = this.allMovementTypes[0];

  ngOnInit() {
    document.title = "Movimentações - Almoxarifado Contajá";
    this.loadEquipments();
    this.loadCollaborators();

    this.filteredEquipments.next(this.equipments.slice());
    this.filteredCollaborators.next(this.collaborators.slice());

    this.collaboratorFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.handleGetCollaborators();
      });

    this.equipmentFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.handleGetEquipments();
      });
  }

  loadCollaborators(params?: any) {
    this.collaboratorService.getCollaborator(params).subscribe((response) => {
      this.collaborators = response.data;
    });
  }

  loadEquipments(params?: any) {
    this.equipmentService.getEquipments(params).subscribe((response) => {
      this.equipments = response.data;
    });
  }

  makeReport() {
    const vinculate: any = {};
    vinculate.equipmentId = this.movementForm.value.equipmentId;
    vinculate.collaboratorId = this.movementForm.value.toCollaboratorId;
    const desvinculate: any = {};
    desvinculate.equipmentId = this.movementForm.value.equipmentId;
    desvinculate.collaboratorId = this.movementForm.value.byCollaboratorId;


    console.log(this.movementForm.value);
    console.log('vinculate: ',vinculate);
    console.log('desvinculate: ',desvinculate);

    if (this.movement === "Transferência") {
      this.desvinculate(desvinculate);
      this.vinculate(vinculate);
    }

    if (this.movement === "Entrada") {
      this.vinculate(vinculate);
    }

    if (this.movement === "Saída") {
      this.desvinculate(desvinculate);
    }
  }

  desvinculate(desvinculate: any) {
    this.movementService.removeVinculate(desvinculate).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  vinculate(vinculate: any) {
    this.movementService.vinculate(vinculate).subscribe({
      next: () => {
        this.dialogRef.close(true);
        return vinculate;
      },
      error: (error) => {
        console.log(error);
      },
    });
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

    this.loadCollaborators(title);
  }

  handleGetEquipments() {
    if (!this.equipments) {
      return;
    }

    let title = this.equipmentFilterCtrl.value;
    if (!title) {
      this.filteredEquipments.next(this.equipments.slice());
      return;
    } else {
      title = title.toLowerCase();
    }

    this.filteredEquipments.next(
      this.equipments.filter(
        (equipment) => equipment.title.toLowerCase().indexOf(title) > -1
      )
    );

    this.loadEquipments(title);
  }
}
