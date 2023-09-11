import { Component, Input, Output } from '@angular/core'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  public modal = false

  @Output() public handleModal() {
    this.modal = !this.modal
  }

  @Input() public title: string = 'Modal'
  @Input() public form: any = {}
  @Input() public button: string = 'Salvar'
  @Input() public handleAction: any = () => {}
}
