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
    { name: 'Equipamentos', path: '/equipamentos' },
    { name: 'Movimentação', path: '/movimentacao' },
    { name: 'Colaborador', path: '/colaborador' },
    { name: 'Departamento', path: '/departamento' },
    { name: 'Itens', path: '/itens'}
  ]

  constructor(protected router: Router) {}
}
