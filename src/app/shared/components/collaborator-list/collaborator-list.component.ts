import { Component } from '@angular/core'
import { FormArray, FormBuilder } from '@angular/forms'
import { Collaborator, Sector } from 'src/app/interfaces/sector'
import { CollaboratorService } from 'src/app/services/collaborator.service'
import { LoginService } from 'src/app/services/login.service'
import { SectorService } from 'src/app/services/sector.service'

@Component({
  selector: 'app-collaborator-list',
  templateUrl: './collaborator-list.component.html',
  styleUrls: ['./collaborator-list.component.scss'],
})
export class CollaboratorListComponent {
  public collaborators: Collaborator[] = []
  public sectors: Sector[] = []
  public modal: boolean = false
  public form: any = {}

  public createSuccess: boolean = false
  public createError: boolean = false
  public createMessage: string = ''

  public collaboratorForm = this.fb.group({
    name: [''],
    role: [''],
    sector: [''],
  })

  constructor(
    private collaboratorService: CollaboratorService,
    private sectorService: SectorService,
    private fb: FormBuilder,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    document.title = "Colaboradores - Almoxarifado Contajá";
    this.loadCollaborator()
    this.loadSector()
  }
  loadSector() {
    this.sectorService.getSector().subscribe((response) => {
      this.sectors = response.data
    })
  }
  loadCollaborator() {
    this.collaboratorService.getCollaborator().subscribe((response) => {
      this.collaborators = response.data
    })
  }
  handleModal() {
    this.modal = !this.modal
  }

  addCollaborator() {
    const newCollaborator: any = {}
    newCollaborator.name = this.collaboratorForm.value.name
    newCollaborator.role = this.collaboratorForm.value.role
    newCollaborator.sectorId = this.collaboratorForm.value.sector

    this.collaboratorService.addCollaborator(newCollaborator, this.loginService.token!).subscribe({
      next: (response) => {
        this.loadCollaborator()
        this.createSuccess = true
        this.createMessage = response.message
        this.handleModal()
      },
      error: (error) => {
        this.createSuccess = false
        this.createError = true
        this.createMessage = error.error.message
      },
    })
  }
}
