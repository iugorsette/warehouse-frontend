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
    this.itemService.getItens(this.loginService.token!).subscribe((res) => {
      this.itensQuantity = res.count;
    });
    this.collaboratorService
      .getCollaborator(this.loginService.token!)
      .subscribe((res) => {
        this.collaboratorsQuantity = res.collaborator.length;
      });
    this.sectorService.getSector(this.loginService.token!).subscribe((res) => {
      this.sectorsQuantity = res.sector.length;
    })
  }
}
