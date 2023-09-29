import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
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
  protected form: FormGroup;
  protected filters: FormGroup;
  protected movementForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private movementService: MovementService,
    private equipmentService: EquipmentService,
    private collaboratorService: CollaboratorService,
    protected loginService: LoginService,
    private dialogRef: MatDialogRef<CreateMovementComponent>
  ) {
    this.form = this.fb.group({
      collaboratorId: ["", Validators.required],
      equipmentId: ["", Validators.required],
    });

    this.filters = this.fb.group({
      title: [""],
      collaborator: [""],
      stock: [false],
    });
    this.movementForm = this.fb.group({
      equipmentId: ["", Validators.required],
      collaboratorId: ["", Validators.required],
    });
  }

  public filterModal: boolean = false;
  public collaborators: any[] = [];
  public equipments: any[] = [];

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
  }

  loadCollaborators() {
    this.collaboratorService.getCollaborator().subscribe((response) => {
      this.collaborators = response.data;
    });
  }

  loadEquipments() {
    this.equipmentService
      .getEquipments({
        title: this.filters.value.title,
        collaboratorId: this.filters.value.collaborator,
        showStock: this.filters.value.stock,
      })
      .subscribe((response) => {
        this.equipments = response.data;
      });
  }

  makeReport() {
    const vinculate: any = {};
    vinculate.equipmentId = this.movementForm.value.equipmentId;
    vinculate.collaboratorId = this.movementForm.value.collaboratorId;

    if (this.movement === "Transferência") {
      this.desvinculate(vinculate);
      this.vinculate(vinculate);
    }

    if (this.movement === "Entrada") {
      this.vinculate(vinculate);
    }

    if (this.movement === "Saída") {
      this.desvinculate(vinculate);
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
  handleFilterModal() {
    this.filterModal = !this.filterModal;
  }

  handleFilters() {
    this.loadEquipments();
    this.loadCollaborators();
    this.handleFilterModal();
  }
}
