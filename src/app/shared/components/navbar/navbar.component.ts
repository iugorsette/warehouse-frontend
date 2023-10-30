import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  public showNameActive: boolean = false;
  private isMouseOver: boolean = false;
  public links = [
    { name: "Home", path: "/", icon: "home" },
    { name: "Equipamentos", path: "/equipamentos", icon: "devices" },
    { name: "Movimentação", path: "/movimentacao", icon: "swap_horiz" },
    { name: "Colaborador", path: "/colaborador", icon: "person" },
    { name: "Departamento", path: "/departamento", icon: "groups" },
    { name: "Itens", path: "/itens", icon: "inventory" },
  ];

  constructor(protected router: Router) {}

  public showName(event: MouseEvent) {
    this.isMouseOver = true;
    setTimeout(() => {
      if (this.isMouseOver) this.showNameActive = true;
    }, 300);
  }

  public hideName(event: MouseEvent) {
    this.isMouseOver = false;
    this.showNameActive = false;
  }

}
