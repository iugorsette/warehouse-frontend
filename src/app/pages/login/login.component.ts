import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { User } from "src/app/interfaces/user";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  public isLogged: boolean = false;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService
  ) {}
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
      next: () => {
        this.router.navigate([""]);
      },
      error: (error) => {
        console.log(error);
        this.showSuccess(error);
      },
    });
  }

  showSuccess(error:any) {
    const { message } = error.error.message;

    if (message === "Unauthorized") {
      this.toastr.error("Usuário ou senha inválidos");
    }
    this.toastr.error("Erro ao fazer login");
  }
}
