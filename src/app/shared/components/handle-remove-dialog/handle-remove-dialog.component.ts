import { Component, Inject, Input } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Item } from 'src/app/interfaces/item'
import { ItemService } from 'src/app/services/item.service'
import { LoginService } from 'src/app/services/login.service'

interface DialogData {
  item: Item
}
@Component({
  selector: 'app-handle-remove-dialog',
  templateUrl: './handle-remove-dialog.component.html',
  styleUrls: ['./handle-remove-dialog.component.scss'],
})
export class HandleRemoveDialogComponent {
  constructor(
    private itemService: ItemService,
    protected loginService: LoginService,
    private dialogRef: MatDialogRef<HandleRemoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  deleteItem() {
    console.log(this.data.item._id)
    this.itemService
      .deleteItem(this.data.item._id)
      .subscribe((response) => {
        console.log(response)
        this.dialogRef.close(true)
      })
  }
}
