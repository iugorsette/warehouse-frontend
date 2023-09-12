import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ICollaborator } from "src/app/interfaces/collaborator";
import { IEquipment } from "src/app/interfaces/equipment";
import { Movement } from "src/app/interfaces/movement";
import { CollaboratorService } from "src/app/services/collaborator.service";
import { EquipmentService } from "src/app/services/equipment.service";
import { LoginService } from "src/app/services/login.service";
import { MovementService } from "src/app/services/movement.service";

@Component({
  selector: "app-report-list",
  templateUrl: "./report-list.component.html",
  styleUrls: ["./report-list.component.scss"],
})
export class ReportListComponent implements OnInit {
  public collaborators: ICollaborator[] = [];
  public reports: Movement[] = [];
  public equipments: IEquipment[] = [];
  public form: any = {};
  public filterModal: boolean = false;
  public movementsType = ["in", "out", "all"];

  public movement = new FormGroup({
    type: new FormControl(this.movementsType[0], Validators.required),
  });

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
    item: ["", Validators.required],
    toCollaborator: ["", Validators.required],
  });


  constructor(
    private momentService: MovementService,
    private collaboratorService: CollaboratorService,
    private equipmentService: EquipmentService,
    private fb: FormBuilder,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    document.title = "Movimentações - Almoxarifado Contajá";
    this.loadReport();
    this.loadItens();
    this.collaboratorService.getCollaborator().subscribe((response) => {
      this.collaborators = response.collaborator;
    });
  }


  loadItens() {
    this.equipmentService
      .getEquipments({
        title: this.filters.value.title && this.filters.value.title,
        collaboratorId:
          this.filters.value.stock === true
            ? "null"
            : this.filters.value.collaborator,
      })
      .subscribe((response) => {
        this.equipments = response.data;
        this.filteredEquipments = this.equipments;
      });
  }

  loadReport() {
    this.momentService
      .getReport(this.loginService.token!)
      .subscribe((response) => {
        console.log(response);
        this.reports = response.report;
      });
  }

  makeReport() {
    const newReport: any = {};
    newReport.itemId = this.reportForm.value.item;
    newReport.toCollaborator = this.reportForm.value.toCollaborator;
    this.momentService
      .makeMovement(newReport, this.loginService.token!)
      .subscribe({
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
    this.loadItens();
    this.handleFilterModal();
  }

  handleFilterModal() {
    this.filterModal = !this.filterModal;
  }
}
