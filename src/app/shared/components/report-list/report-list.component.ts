import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  Validators,
} from "@angular/forms";
import { ICollaborator } from "src/app/interfaces/collaborator";
import { IEquipment } from "src/app/interfaces/equipment";
import { IReport, MovementTypes } from "src/app/interfaces/movement";
import { CollaboratorService } from "src/app/services/collaborator.service";
import { EquipmentService } from "src/app/services/equipment.service";
import { MovementService } from "src/app/services/movement.service";

@Component({
  selector: "app-report-list",
  templateUrl: "./report-list.component.html",
  styleUrls: ["./report-list.component.scss"],
})
export class ReportListComponent implements OnInit{
  public collaborators: ICollaborator[] = [];
  public reports: IReport[] = [];
  public equipments: IEquipment[] = [];
  public form: any = {};
  public filterModal: boolean = false;

  public allMovementTypes: MovementTypes[] = ["Entrada", "Saída", "Transferência"];
  public movement:MovementTypes = this.allMovementTypes[0]

  public filteredEquipments: IEquipment[] = [];

  public filters = this.fb.group({
    title: [""],
    collaborator: [""],
    stock: [false],
  });

  public createSuccess: boolean = false;
  public createError: boolean = false;
  public createMessage: string = "";

  public reportForm = this.fb.group({
    equipmentId: ["", Validators.required],
    collaboratorId: ["", Validators.required],
  });

  constructor(
    private momentService: MovementService,
    private collaboratorService: CollaboratorService,
    private equipmentService: EquipmentService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    document.title = "Movimentações - Almoxarifado Contajá";
    this.loadReport();
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
        this.filteredEquipments = this.equipments;
      });
  }

  loadReport() {
    this.momentService.getReport().subscribe((response) => {
      console.log(response);
      this.reports = response.data;
    });
  }

  makeReport() {
    const vinculate: any = {};
    vinculate.equipmentId = this.reportForm.value.equipmentId;
    vinculate.collaboratorId = this.reportForm.value.collaboratorId;

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
    this.momentService.removeVinculate(desvinculate).subscribe({
      next: (response) => {
        this.loadReport();
        this.createSuccess = true;
        this.createMessage = response.message;
      },
      error: (error) => {
        this.createSuccess = false;
        this.createError = true;
        this.createMessage = error.error.message;
      },
    });
  }

  vinculate(vinculate: any) {
    this.momentService.vinculate(vinculate).subscribe({
      next: (response) => {
        this.loadReport();
        this.createSuccess = true;
        this.createMessage = response.message;
      },
      error: (error) => {
        this.createSuccess = false;
        this.createError = true;
        this.createMessage = error.error.message;
      },
    });
  }

  handleFilters() {
    this.loadEquipments();
    this.handleFilterModal();
  }

  handleFilterModal() {
    this.filterModal = !this.filterModal;
  }
}
