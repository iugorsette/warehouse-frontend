import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CollaboratorService } from "src/app/services/collaborator.service";
import { AddItemComponent } from "../add-item/add-item.component";
import { HandleRemoveDialogComponent } from "../handle-remove-dialog/handle-remove-dialog.component";
import { LoginService } from "src/app/services/login.service";
import { FormBuilder } from "@angular/forms";
import { ICollaborator } from "src/app/interfaces/collaborator";
import { IEquipment } from "src/app/interfaces/equipment";
import { EquipmentService } from "src/app/services/equipment.service";

@Component({
  selector: "app-item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.scss"],
})
export class ItemListComponent implements OnInit {
  public totalItens: number = 0;
  public pageSize: number = 10;
  public pageIndex: number = 0;

  public equipments: IEquipment[] = [];
  public collaborators: ICollaborator[] = [];
  public filterModal: boolean = false;
  public itemModal: boolean[] = [];
  public form: any = {};
  public filteredItens: IEquipment[] = [];

  public filters = this.fb.group({
    title: [""],
    collaborator: [""],
    stock: [false],
  });

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
    document.title = "Equipamentos - Almoxarifado Contajá";
    this.pageChange({ pageIndex: 0, pageSize: 10 });
    this.collaboratorService
      .getCollaborator()
      .subscribe((response) => {
        this.collaborators = response.data;
      });
  }

  pageChange(event: any) {
    this.equipmentService
      .getEquipments( {
        offset: event.pageIndex,
        limit: event.pageSize,
      })
      .subscribe((response) => {
        console.log(response);
        this.equipments = response.data;
        this.filteredItens = this.equipments;
        this.totalItens = response.total;
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
      });
  }

  handleAddItem(equipment?: IEquipment) {
    const dialogRef = this.dialog.open(AddItemComponent, {
      data: {
        equipment,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
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

  handleSearch(event: any) {
    this.filteredItens = this.equipments.filter((item) => {
      return item.title
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
  }

  handleFilters() {
    this.equipmentService.getEquipments({
        title: this.filters.value.title && this.filters.value.title,
        collaboratorId: this.filters.value.collaborator && this.filters.value.collaborator,
        showStock : this.filters.value.stock
      })
      .subscribe((response) => {
        this.equipments = response.data;
        this.filteredItens = this.equipments;
        this.totalItens = response.total;
      });
  }

  handleModal() {
    this.filterModal = !this.filterModal;
  }
}
