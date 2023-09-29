import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ICollaborator } from "src/app/interfaces/collaborator";
import { IDepartment } from "src/app/interfaces/department";
import { CollaboratorService } from "src/app/services/collaborator.service";
import { DeparmentService } from "src/app/services/department.service";
import { LoginService } from "src/app/services/login.service";

interface DialogData {
  collaborator?: ICollaborator;
}
@Component({
  selector: "app-collaborator-modal",
  templateUrl: "./collaborator-modal.component.html",
  styleUrls: ["./collaborator-modal.component.scss"],
})
export class CollaboratorModalComponent implements OnInit {
  public title: string = this.data.collaborator?.id
    ? "Editar Colaborador"
    : "Adicionar Colaborador";
  protected form: FormGroup;
  public departments: IDepartment[] = [];
  constructor(
    private fb: FormBuilder,
    private collaboratorService: CollaboratorService,
    private departmentService: DeparmentService, 
    protected loginService: LoginService,
    private dialogRef: MatDialogRef<CollaboratorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.form = this.fb.group({
      title: [data?.collaborator?.name],
      description: [data?.collaborator?.role],
      collaborators: [data?.collaborator?.department],
    });
  }

  ngOnInit(): void {
    this.departmentService.getDepartment().subscribe((response) => {
      this.departments = response.data;
    });

  }

  submit() {
    const collaboratorEditted: any = {};
    collaboratorEditted.id = this.data.collaborator?.id;


    if (collaboratorEditted.id) {
      this.collaboratorService.editCollaborator(collaboratorEditted).subscribe(() => {
        this.dialogRef.close(true);
      });
      return;
    }

    this.collaboratorService.addCollaborator(collaboratorEditted).subscribe(() => {
      this.dialogRef.close(true);
    });

    this.dialogRef.close(true);
    
  }

}
