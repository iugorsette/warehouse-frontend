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
    { name: 'Itens', path: '/Item' },
    { name: 'Movimentação', path: '/Report' },
    { name: 'Colaboradores', path: '/Collaborator' },
    { name: 'Setores', path: '/Sector' },
  ]

  constructor(protected router: Router) {}
}
