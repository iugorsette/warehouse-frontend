import { Component, OnInit } from "@angular/core";
import { CollaboratorService } from "src/app/services/collaborator.service";
import { DepartmentService } from "src/app/services/department.service";
import { ItemService } from "src/app/services/item.service";
import { LoginService } from "src/app/services/login.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public itensQuantity: number = 0;
  public collaboratorsQuantity: number = 0;
  public departmentsQuantity: number = 0;

  constructor(
    protected loginService: LoginService,
    private itemService: ItemService,
    private collaboratorService: CollaboratorService,
    private DepartmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    if (!this.loginService.isLogged) {
      window.location.href = "/login";
    }
    this.itemService.getItens().subscribe(({ total }) => {
      this.itensQuantity = total;
    });
    this.collaboratorService.getCollaborator().subscribe(({ total }) => {
      this.collaboratorsQuantity = total;
    });
    this.DepartmentService.getDepartment().subscribe(({ total }) => {
      this.departmentsQuantity = total;
    });
  }
}
