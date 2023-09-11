import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Item } from 'src/app/interfaces/item'
import { Collaborator } from 'src/app/interfaces/sector'
import { CollaboratorService } from 'src/app/services/collaborator.service'
import { ItemService } from 'src/app/services/item.service'
import { AddItemComponent } from '../add-item/add-item.component'
import { HandleRemoveDialogComponent } from '../handle-remove-dialog/handle-remove-dialog.component'
import { LoginService } from 'src/app/services/login.service'
import { FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit{
  public totalItens: number = 0
  public pageSize: number = 10
  public pageIndex: number = 0

  public itens: Item[] = []
  public collaborators: Collaborator[] = []
  public filterModal: boolean = false
  public itemModal: boolean[] = []
  public form: any = {}
  public filteredItens: Item[] = []

  public filters = this.fb.group({
    title: [''],
    collaborator: [''],
    stock: [false],
  })

  constructor(
    private itemService: ItemService,
    private collaboratorService: CollaboratorService,
    public dialog: MatDialog,
    protected loginService: LoginService,
    private fb: FormBuilder
  ) {
    this.filteredItens.forEach(() => this.itemModal.push(false))
  }

  ngOnInit(): void {
    document.title = "Itens - Almoxarifado Contajá";
    this.pageChange({ pageIndex: 0, pageSize: 10 })
    this.collaboratorService.getCollaborator(this.loginService.token!).subscribe((response) => {
      this.collaborators = response.collaborator
    })
  }

  pageChange(event: any) {
    this.itemService
      .getItens(this.loginService.token!, {
        offset: event.pageIndex,
        limit: event.pageSize,
      })
      .subscribe((response) => {
        this.itens = response.itens
        this.filteredItens = this.itens
        this.totalItens = response.count
        this.pageIndex = event.pageIndex
        this.pageSize = event.pageSize
      })
  }

  handleAddItem(item?: Item) {
    const dialogRef = this.dialog.open(AddItemComponent, {
      data: {
        item,
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.pageChange({ pageIndex: this.pageIndex, pageSize: this.pageSize })
    })
  }

  handleRemoveItem(item: Item) {
    console.log(item)
    const dialogRef = this.dialog.open(HandleRemoveDialogComponent, {
      data: {
        item,
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.pageChange({ pageIndex: this.pageIndex, pageSize: this.pageSize })
    })
  }

  handleItemModal(i: number) {
    this.itemModal[i] = !this.itemModal[i]
  }
  handleFilterModal() {
    this.filterModal = !this.filterModal
  }

  handleSearch(event: any) {
    this.filteredItens = this.itens.filter((item) => {
      return item.title.toLowerCase().includes(event.target.value.toLowerCase())
    })
  }

  handleFilters() {
    this.itemService
      .getItens(this.loginService.token!, {
        title: this.filters.value.title && this.filters.value.title,
        collaboratorId:
          this.filters.value.stock === true ? 'null' : this.filters.value.collaborator,
      })
      .subscribe((response) => {
        console.log(response)
        this.itens = response.itens
        this.filteredItens = this.itens
        this.totalItens = response.count
      })
  }

  handleModal() {
    this.filterModal = !this.filterModal
  }
}
