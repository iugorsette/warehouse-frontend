import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public links = [
    { name: 'Home', path: '/' },
    { name: 'Equipamentos', path: '/Equipamentos' },
    { name: 'Movimentação', path: '/Relatório' },
    { name: 'Colaborador', path: '/Colaborador' },
    { name: 'Departamento', path: '/Departamento' },
    { name: 'Itens', path: '/Itens'}
  ]

  constructor(protected router: Router) {}
}
