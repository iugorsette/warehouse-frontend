
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { IDepartment } from "src/app/interfaces/department";
import { IItem } from "src/app/interfaces/item";
import { DepartmentService } from "src/app/services/department.service";
import { ItemService } from "src/app/services/item.service";
import { LoginService } from "src/app/services/login.service";

interface DialogData {
  item?: IItem;
}
@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.scss']
})
export class ItemModalComponent  implements OnInit {
  public title: string = this.data.item?.id
    ? "Editar Item"
    : "Adicionar Item";
  protected form: FormGroup;
  public departments: IDepartment[] = [];
  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private departmentService: DepartmentService, 
    protected loginService: LoginService,
    private dialogRef: MatDialogRef<ItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.form = this.fb.group({
      property: [data?.item?.property],
      value: [data?.item?.value],
    });
  }

  ngOnInit(): void {
    this.departmentService.getDepartment().subscribe((response) => {
      this.departments = response.data;
    });

  }

  submit() {
    const item: any = {};
    item.id = this.data.item?.id;
    item.property = this.form.get("property")?.value ? this.form.get("property")?.value : "";
    item.value = this.form.get("value")?.value ? this.form.get("value")?.value : "";



    if (item?.id) {
      this.itemService.editItem(item).subscribe(() => {
        this.dialogRef.close(true);
      });
      return;
    }

    this.itemService.addItem(item).subscribe(() => {
      this.dialogRef.close(true);
    });

    this.dialogRef.close(true);
    
  }

}
