import { Component, Inject, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { ICollaborator } from 'src/app/interfaces/collaborator'
import { Item } from 'src/app/interfaces/item'
import { CollaboratorService } from 'src/app/services/collaborator.service'
import { ItemService } from 'src/app/services/item.service'
import { LoginService } from 'src/app/services/login.service'

interface DialogData {
  item?: Item
}

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
  public title: string = this.data.item?._id ? 'Editar equipamento' : 'Adicionar equipamento'
  public collaborators: ICollaborator[] = []
  protected form: FormGroup
  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private collaboratorService: CollaboratorService,
    protected loginService: LoginService,
    private dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.form = this.fb.group({
      title: [data.item?.title],
      description: [data.item?.description],
      collaborator: [data.item?.collaborator],
      attributes: this.fb.array(
        data.item?.attributes?.map((attribute) => {
          return this.fb.group({
            property: [Object.keys(attribute)[0]],
            value: [attribute[Object.keys(attribute)[0]]],
          })
        }) || []
      ),
    })
  }

  ngOnInit(): void {
    this.collaboratorService.getCollaborator().subscribe((response) => {
      this.collaborators = response.data
    })
  }

  submit() {
    const itemEdited: any = {}
    itemEdited._id = this.data.item?._id
    itemEdited.title = this.form.value.title
    itemEdited.description = this.form.value.description
    itemEdited.collaboratorId = this.form.value.collaborator
    let attributes: any = []
    for (let attribute of this.form.value.attributes!) {
      attributes.push({ [attribute.property as string]: attribute.value })
    }

    itemEdited.attributes = attributes

    if (itemEdited._id) {
      this.itemService.editItem(itemEdited).subscribe(() => {
        this.dialogRef.close(true)
      })
      return
    }
    this.itemService.addItem(itemEdited).subscribe(() => {
      this.dialogRef.close(true)
    })
  }

  get attributes() {
    return this.form.get('attributes') as FormArray
  }

  addAttributes() {
    this.attributes.push(
      this.fb.group({
        property: [''],
        value: [''],
      })
    )
  }
  removeAttributes(index: number) {
    this.attributes.removeAt(index)
  }
}
