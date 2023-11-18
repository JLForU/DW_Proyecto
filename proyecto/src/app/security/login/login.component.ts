import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/dto/login-dto';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginDto: LoginDto = new LoginDto("", "");

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth.logout();
  }

  login() {
    this.auth.login(this.loginDto)
      .subscribe({
        next: jwt => {
          console.log(jwt);
          this.router.navigate(["vehiculo/anadirVehiculo"]);
        },
        error: err => { console.error("Login failed:", err) }
      });
  }

}
