
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { IDepartment } from "src/app/interfaces/department";
import { DepartmentService } from "src/app/services/department.service";

interface DialogData {
  department: IDepartment;
}
@Component({
  selector: 'app-department-remove-modal',
  templateUrl: './department-remove-modal.component.html',
  styleUrls: ['./department-remove-modal.component.scss']
})
export class DepartmentRemoveModalComponent  {
  constructor(
    private departmentService: DepartmentService,
    private dialogRef: MatDialogRef<DepartmentRemoveModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  deleteItem() {
    this.departmentService.deleteDepartment(this.data.department.id)
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }
}
