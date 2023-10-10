import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ICollaborator } from "src/app/interfaces/collaborator";
import { IEquipment } from "src/app/interfaces/equipment";
import { IReport } from "src/app/interfaces/movement";
import { CollaboratorService } from "src/app/services/collaborator.service";
import { EquipmentService } from "src/app/services/equipment.service";
import { MovementService } from "src/app/services/movement.service";
import { CreateMovementComponent } from "../create-movement/create-movement.component";
import { MatDialog } from "@angular/material/dialog";
import { ReplaySubject, Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-report-list",
  templateUrl: "./report-list.component.html",
  styleUrls: ["./report-list.component.scss"],
})
export class ReportListComponent implements OnInit {
  public totalItens: number = 0;
  public pageSize: number = 10;
  public pageIndex: number = 0;
  protected allMovementTypes: string[] = ["Entrada", "Saída"];

  protected collaborators: ICollaborator[] = [];
  public collaboratorFilterCtrl: FormControl = new FormControl("");
  public filteredCollaborators: ReplaySubject<ICollaborator[]> =
    new ReplaySubject<ICollaborator[]>(1);

  protected equipments: IEquipment[] = [];
  public equipmentFilterCtrl: FormControl = new FormControl("");
  public filteredEquipments: ReplaySubject<IEquipment[]> = new ReplaySubject<
    IEquipment[]
  >(1);

  protected _onDestroy = new Subject<void>();

  public reports: IReport[] = [];

  public filterModal: boolean = false;
  public filters = this.fb.group({
    type: [""],
    equipmentId: [""],
    collaboratorId: [""],
  });

  public createSuccess: boolean = false;
  public createError: boolean = false;
  public createMessage: string = "";

  constructor(
    private movementService: MovementService,
    private collaboratorService: CollaboratorService,
    private equipmentService: EquipmentService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    document.title = "Movimentações - Almoxarifado Contajá";
    this.pageChange({ pageIndex: 0, pageSize: 10 });
    this.loadEquipments();
    this.loadCollaborators();

    this.filteredCollaborators.next(this.collaborators.slice());
    this.filteredEquipments.next(this.equipments.slice());

    this.equipmentFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.handleGetEquipments();
      });
    this.collaboratorFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.handleGetCollaborators();
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

  loadReport() {
    this.movementService
      .getReport({
        type: this.filters.value.type ? this.filters.value.type : "",
        equipmentId: this.filters.value.equipmentId
          ? this.filters.value.equipmentId
          : "",
        collaboratorId: this.filters.value.collaboratorId
          ? this.filters.value.collaboratorId
          : "",
        offset: this.pageIndex,
        limit: this.pageSize,
      })
      .subscribe((response) => {
        console.log(response);
        this.reports = response.data;
      });
  }

  handleClearFilters() {
    this.filters.reset();
    this.handleFilters();
  }

  handleFilters() {
    console.log(this.filters.value);
    this.loadReport();
  }

  handleFilterModal() {
    this.filterModal = !this.filterModal;
  }

  handleAddItem() {
    const dialogRef = this.dialog.open(CreateMovementComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.pageChange({ pageIndex: this.pageIndex, pageSize: this.pageSize });
      }
    });
  }

  pageChange(event: any) {
    this.movementService
      .getReport({
        offset: event.pageIndex,
        limit: event.pageSize,
      })
      .subscribe((response) => {
        console.log(response);
        this.reports = response.data;
        this.totalItens = response.total;
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
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
