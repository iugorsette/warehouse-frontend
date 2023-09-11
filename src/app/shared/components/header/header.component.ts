import { Component, OnInit } from '@angular/core'
import { LoginService } from 'src/app/services/login.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public goHome() {
    window.location.href = '/'
  }

  constructor(protected loginService: LoginService) {}

  ngOnInit(): void {}
}
