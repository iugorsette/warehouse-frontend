import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CollaboratorService } from "src/app/services/collaborator.service";
import { LoginService } from "src/app/services/login.service";
import { FormBuilder } from "@angular/forms";
import { ICollaborator } from "src/app/interfaces/collaborator";
import { ItemService } from "src/app/services/item.service";
import { IItem } from "src/app/interfaces/item";
import { ItemRemoveModalComponent } from "../item-remove-modal/item-remove-modal.component";
import { ItemModalComponent } from "../item-modal/item-modal.component";

@Component({
  selector: "app-item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.scss"],
})
export class ItemListComponent implements OnInit {
  public totalItens: number = 0;
  public pageSize: number = 10;
  public pageIndex: number = 0;

  public items: IItem[] = [];
  public collaborators: ICollaborator[] = [];
  public itemModal: boolean[] = [];
  public form: any = {};

  public filters = this.fb.group({
    property: [""],
    value: [""],
    stock: [false],
  });

  constructor(
    private collaboratorService: CollaboratorService,
    public dialog: MatDialog,
    private itemService: ItemService,
    protected loginService: LoginService,
    private fb: FormBuilder
  ) {
    this.items.forEach(() => this.itemModal.push(false));
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
    this.itemService.getItens({
        offset: event.pageIndex,
        limit: event.pageSize,
      })
      .subscribe((response) => {
        this.items = response.data;
        this.totalItens = response.total;
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
      });
  }

  handleAddItem(item?: IItem) {
    const dialogRef = this.dialog.open(ItemModalComponent, {
      data: {
        item,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this.pageChange({ pageIndex: this.pageIndex, pageSize: this.pageSize });
    });
  }

  handleRemoveItem(item: IItem) {
    const dialogRef = this.dialog.open(ItemRemoveModalComponent, {
      data: {
        item,
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


  handleFilters() {
    this.itemService.getItens({
        property: this.filters.value.property ? this.filters.value.property : "",
        value: this.filters.value.value ? this.filters.value.value : "",
        showStock: this.filters.value.stock ? this.filters.value.stock : "",
      })
      .subscribe((response) => {
        this.items = response.data;
        this.totalItens = response.total;
      });
  }
  handleClearFilters() {
    this.filters.reset();
    this.handleFilters();
  }
}
