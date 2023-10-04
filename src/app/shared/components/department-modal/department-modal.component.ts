import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { IDepartment } from "src/app/interfaces/department";
import { DepartmentService } from "src/app/services/department.service";
import { LoginService } from "src/app/services/login.service";

interface DialogData {
  department?: IDepartment;
}

@Component({
  selector: 'app-department-modal',
  templateUrl: './department-modal.component.html',
  styleUrls: ['./department-modal.component.scss']
})
export class DepartmentModalComponent implements OnInit {
  public title: string = this.data.department?.id
    ? "Editar Departamento"
    : "Adicionar Departamento";
  protected form: FormGroup;
  public departments: IDepartment[] = [];
  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService, 
    protected loginService: LoginService,
    private dialogRef: MatDialogRef<DepartmentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.form = this.fb.group({
      name: [data?.department?.name]
    });
  }

  ngOnInit(): void {
    this.departmentService.getDepartment().subscribe((response) => {
      this.departments = response.data;
    });

  }

  submit() {
    const departmentEditted: any = {};
    departmentEditted.id = this.data?.department?.id;
    departmentEditted.name = this.form.value.name;


    if (departmentEditted.id) {
      this.departmentService.editDepartment(departmentEditted).subscribe(() => {
        this.dialogRef.close(true);
      });
      return;
    }

    this.departmentService.addDepartment(departmentEditted).subscribe(() => {
      this.dialogRef.close(true);
    });

    this.dialogRef.close(true);
    
  }

}
