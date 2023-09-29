import { Component, Inject, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ICollaborator } from "src/app/interfaces/collaborator";
import { IDepartment } from "src/app/interfaces/department";
import { CollaboratorService } from "src/app/services/collaborator.service";
import { LoginService } from "src/app/services/login.service";

interface DialogData {
  collaborator?: ICollaborator;
  deparment?: IDepartment;
}

@Component({
  selector: "app-create-modal",
  templateUrl: "./create-modal.component.html",
  styleUrls: ["./create-modal.component.scss"],
})
export class CreateModalComponent implements OnInit {
  public title: string = this.data.collaborator?.id
    ? "Editar Colaborador"
    : "Adicionar Colaborador";
  protected form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private collaboratorService: CollaboratorService,
    protected loginService: LoginService,
    private dialogRef: MatDialogRef<CreateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.form = this.fb.group({
      title: [data.collaborator?.name],
      description: [data.collaborator?.role],
      collaborators: [data.collaborator?.department],
    });
  }

  ngOnInit(): void {
   
  }

  submit() {
    const equipmentEdited: any = {};
    equipmentEdited.id = this.data.collaborator?.id;
    
  }

  
  handleCollaborator() {
    this.collaboratorService
      .addCollaborator(this.form.value)
      .subscribe((response) => {
        console.log(response);
        this.dialogRef.close(true);
      });
  }
}
