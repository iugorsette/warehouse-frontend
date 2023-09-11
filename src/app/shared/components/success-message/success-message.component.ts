import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.scss'],
})
export class SuccessMessageComponent {
  @Input() successMessage: string = ''
  public show: boolean = true

  ngOnInit(): void {
    this.closeModal()
  }
  closeModal() {
    setInterval(() => {
      this.show = false
    }, 5000)
  }
}
