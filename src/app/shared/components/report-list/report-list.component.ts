import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Item } from 'src/app/interfaces/item'
import { Movement } from 'src/app/interfaces/movement'
import { Collaborator } from 'src/app/interfaces/sector'
import { CollaboratorService } from 'src/app/services/collaborator.service'
import { ItemService } from 'src/app/services/item.service'
import { LoginService } from 'src/app/services/login.service'
import { MovementService } from 'src/app/services/movement.service'

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
})
export class ReportListComponent implements OnInit {
  public collaborators: Collaborator[] = []
  public reports: Movement[] = []
  public itens: Item[] = []
  public form: any = {}
  public filterModal: boolean = false

  public filteredItens: Item[] = []

  public filters = this.fb.group({
    title: [''],
    collaborator: [''],
    stock: [false],
  })

  public createSuccess: boolean = false
  public createError: boolean = false
  public createMessage: string = ''

  public reportForm = this.fb.group({
    item: ['', Validators.required],
    toCollaborator: ['', Validators.required],
  })

  constructor(
    private momentService: MovementService,
    private collaboratorService: CollaboratorService,
    private itemService: ItemService,
    private fb: FormBuilder,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    document.title = "Movimentações - Almoxarifado Contajá";
    this.loadReport()
    this.loadItens()
    this.collaboratorService.getCollaborator().subscribe((response) => {
      this.collaborators = response.collaborator
    })
  }

  loadItens() {
    this.itemService
      .getItens({
        title: this.filters.value.title && this.filters.value.title,
        collaboratorId:
          this.filters.value.stock === true ? 'null' : this.filters.value.collaborator,
      })
      .subscribe((response) => {
        this.itens = response.itens
        this.filteredItens = this.itens
      })
  }

  loadReport() {
    this.momentService.getReport(this.loginService.token!).subscribe((response) => {
      console.log(response)
      this.reports = response.report
    })
  }

  makeReport() {
    const newReport: any = {}
    newReport.itemId = this.reportForm.value.item
    newReport.toCollaborator = this.reportForm.value.toCollaborator
    this.momentService.makeMovement(newReport, this.loginService.token!).subscribe({
      next: (response) => {
        this.loadReport()
        this.createSuccess = true
        this.createMessage = response.message
      },
      error: (error) => {
        this.createSuccess = false
        this.createError = true
        this.createMessage = error.error.message
      },
    })
  }

  handleFilters() {
    this.loadItens()
    this.handleFilterModal()
  }

  handleFilterModal() {
    this.filterModal = !this.filterModal
  }
}
