import { Component, OnInit } from "@angular/core";
import { CollaboratorService } from "src/app/services/collaborator.service";
import { ItemService } from "src/app/services/item.service";
import { LoginService } from "src/app/services/login.service";
import { SectorService } from "src/app/services/sector.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public itensQuantity: number = 0;
  public collaboratorsQuantity: number = 0;
  public sectorsQuantity: number = 0;

  constructor(
    protected loginService: LoginService,
    private itemService: ItemService,
    private collaboratorService: CollaboratorService,
    private sectorService: SectorService
  ) {}

  ngOnInit(): void {
    this.itemService.getItens().subscribe(({ total }) => {
      this.itensQuantity = total;
    });
    this.collaboratorService.getCollaborator().subscribe(({ total }) => {
      this.collaboratorsQuantity = total;
    });
    this.sectorService.getSector().subscribe(({ total }) => {
      this.sectorsQuantity = total;
    });
  }
}
