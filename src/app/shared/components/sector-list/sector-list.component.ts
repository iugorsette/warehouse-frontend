import { Component } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { Sector } from 'src/app/interfaces/sector'
import { LoginService } from 'src/app/services/login.service'
import { SectorService } from 'src/app/services/sector.service'

@Component({
  selector: 'app-sector-list',
  templateUrl: './sector-list.component.html',
  styleUrls: ['./sector-list.component.scss'],
})
export class SectorListComponent {
  public sectors: Sector[] = []
  public modal: boolean = false
  public form: any = {}

  public sectorForm = this.fb.group({
    title: [''],
  })

  public createSuccess: boolean = false
  public createError: boolean = false
  public createMessage: string = ''

  constructor(
    private sectorService: SectorService,
    private fb: FormBuilder,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    document.title = "Setores - Almoxarifado Contajá";
    this.loadSector()
  }

  loadSector() {
    this.sectorService.getSector(this.loginService.token!).subscribe({
      next: (response) => {
        this.sectors = response.sector
      },
      error: (error) => {
        console.log(error)
      },
    })
  }
  handleModal() {
    this.modal = !this.modal
  }

  addSector() {
    const newSector: any = {}
    newSector.title = this.sectorForm.value.title
    this.sectorService.addSector(newSector, this.loginService.token!).subscribe({
      next: (response) => {
        this.loadSector()
        this.handleModal()
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
}
