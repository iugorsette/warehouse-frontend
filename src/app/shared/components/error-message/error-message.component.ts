import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {
  @Input() errorMessage: string = ''
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
