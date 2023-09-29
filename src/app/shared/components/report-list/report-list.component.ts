import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ICollaborator } from "src/app/interfaces/collaborator";
import { IEquipment } from "src/app/interfaces/equipment";
import { IReport } from "src/app/interfaces/movement";
import { CollaboratorService } from "src/app/services/collaborator.service";
import { EquipmentService } from "src/app/services/equipment.service";
import { MovementService } from "src/app/services/movement.service";
import { CreateMovementComponent } from "../create-movement/create-movement.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-report-list",
  templateUrl: "./report-list.component.html",
  styleUrls: ["./report-list.component.scss"],
})

export class ReportListComponent implements OnInit {
  public collaborators: ICollaborator[] = [];
  public reports: IReport[] = [];
  public equipments: IEquipment[] = [];
  public form: any = {};
  public filterModal: boolean = false;

  public filteredEquipments: IEquipment[] = [];

  public filters = this.fb.group({
    title: [""],
    collaborator: [""],
    stock: [false],
  });

  public createSuccess: boolean = false;
  public createError: boolean = false;
  public createMessage: string = "";

  constructor(
    private momentService: MovementService,
    private collaboratorService: CollaboratorService,
    private equipmentService: EquipmentService,
    private fb: FormBuilder,
    private dialog: MatDialog
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

  handleFilters() {
    this.loadEquipments();
    this.handleFilterModal();
  }

  handleFilterModal() {
    this.filterModal = !this.filterModal;
  }

  handleAddItem() {
    const dialogRef = this.dialog.open(CreateMovementComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadReport();
      }
    });
  }
}
