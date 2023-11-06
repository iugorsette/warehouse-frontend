import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CollaboratorService } from "src/app/services/collaborator.service";
import { HandleRemoveDialogComponent } from "../handle-remove-dialog/handle-remove-dialog.component";
import { LoginService } from "src/app/services/login.service";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ICollaborator } from "src/app/interfaces/collaborator";
import { IEquipment } from "src/app/interfaces/equipment";
import { EquipmentService } from "src/app/services/equipment.service";
import { EquipmentModalComponent } from "../equipment-modal/equipment-modal.component";

import { ReplaySubject, Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";

@Component({
  selector: "app-equipment-list",
  templateUrl: "./equipment-list.component.html",
  styleUrls: ["./equipment-list.component.scss"],
})
export class EquipmentListComponent implements OnInit {
  public totalItens: number = 0;
  public pageSize: number = 10;
  public pageIndex: number = 0;

  public equipments: IEquipment[] = [];
  public filterModal: boolean = true; //false
  public itemModal: boolean[] = [];
  public form: any = {};
  public filteredItens: IEquipment[] = [];
  public filters: FormGroup = this.fb.group({
    register: [""],
    title: [""],
    collaborator: [""],
    stock: [false],
  });

  protected collaborators: ICollaborator[] = [];

  public collaboratorCtrl: FormControl = new FormControl();

  public collaboratorFilterCtrl: FormControl = new FormControl("");

  public filteredCollaborators: ReplaySubject<ICollaborator[]> =
    new ReplaySubject<ICollaborator[]>(1);

  protected _onDestroy = new Subject<void>();

  constructor(
    private equipmentService: EquipmentService,
    private collaboratorService: CollaboratorService,
    public dialog: MatDialog,
    protected loginService: LoginService,
    private fb: FormBuilder
  ) {
    this.filteredItens.forEach(() => this.itemModal.push(false));
  }

  ngOnInit(): void {
    document.title = "Equipamentos - Almoxarifado Sette";
    this.pageChange({ pageIndex: 0, pageSize: 10 });
    this.collaboratorService.getCollaborator().subscribe((response) => {
      this.collaborators = response.data;
    });

    this.filteredCollaborators.next(this.collaborators.slice());

    this.collaboratorFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCollaborators();
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

  protected filterCollaborators() {
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

  pageChange(event: any) {
    this.equipmentService
      .getEquipments({
        offset: event.pageIndex,
        limit: event.pageSize,
      })
      .subscribe((response) => {
        this.equipments = response.data;
        console.log(this.equipments);
        this.filteredItens = this.equipments;
        this.totalItens = response.total;
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
      });
  }

  handleAddEquipment(equipment?: IEquipment) {
    const dialogRef = this.dialog.open(EquipmentModalComponent, {
      data: {
        equipment,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.pageChange({ pageIndex: this.pageIndex, pageSize: this.pageSize });
    });
  }

  handleRemoveItem(equipment: IEquipment) {
    const dialogRef = this.dialog.open(HandleRemoveDialogComponent, {
      data: {
        equipment,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.pageChange({ pageIndex: this.pageIndex, pageSize: this.pageSize });
    });
  }

  handleItemModal(i: number) {
    this.itemModal[i] = !this.itemModal[i];
  }
  handleFilterModal() {
    this.filterModal = !this.filterModal;
  }

  handleClearFilters() {
    this.filters.reset();
    this.handleFilters();
  }

  handleSearch(event: any) {
    this.filteredItens = this.equipments.filter((item) => {
      return item.title
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
  }

  handleFilters() {
    this.equipmentService
      .getEquipments({
        register: this.filters.value.register
          ? this.filters.value.register
          : "",
        title: this.filters.value.title ? this.filters.value.title : "",
        collaboratorId: this.filters.value.collaborator
          ? this.filters.value.collaborator
          : "",
        showStock: this.filters.value.stock ? this.filters.value.stock : false,
      })
      .subscribe((response) => {
        this.equipments = response.data;
        this.filteredItens = this.equipments;
        this.totalItens = response.total;
      });
  }
}
