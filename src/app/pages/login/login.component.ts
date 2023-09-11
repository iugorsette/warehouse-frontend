import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/interfaces/user";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  public loginError: boolean = false;
  public loginErrorMessage: string = "";
  public isLogged: boolean = false;
  constructor(private router: Router, private loginService: LoginService) {}
  showPassword: boolean = false;

  type: "text" | "password" = "password";

  ngOnInit(): void {
    document.title = "Almoxarifado Contajá";
    this.checkLogged();
    if (this.isLogged) {
      this.router.navigate([""]);
    }
  }

  checkLogged() {
    this.isLogged = localStorage.getItem("token") ? true : false;
  }
  setVisibility() {
    this.showPassword = !this.showPassword;
    this.type = this.showPassword ? "text" : "password";
  }
  submitButton(user: User) {
    this.loginService.login(user).subscribe({
      next: (response) => {
        localStorage.setItem("token", response.token);
        this.router.navigate([""]);
      },
      error: (error) => {
        console.log(error);
        this.loginError = true;
        this.loginErrorMessage = error.error.message;
      }
    });
  }
}
