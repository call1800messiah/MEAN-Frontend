import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { TokenPayload } from '../../core/interfaces/ITokenPayload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;
  isLoggedIn: boolean;
  private bob: TokenPayload;

  constructor(private authService: AuthService, private router: Router) {
    this.setMessage();
    this.isLoggedIn = this.authService.isLoggedIn();
    this.bob = {
      email: 'bob@test.de',
      name: 'Bob',
      password: 'test',
    };
  }

  ngOnInit() {
  }

  setMessage() {
    this.message = `Logged ${this.isLoggedIn ? 'in' : 'out'}`;
  }

  login() {
    this.message = 'Trying to log in';

    this.authService.login(this.bob).subscribe(() => {
      this.isLoggedIn = this.authService.isLoggedIn();
      this.setMessage();
      if (this.isLoggedIn) {
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '';
        this.router.navigate([redirect]);
      }
    });
  }

  loginSteam() {
    this.authService.loginSteam().subscribe(() => {
      this.isLoggedIn = this.authService.isLoggedIn();
      this.setMessage();
      if (this.isLoggedIn) {
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '';
        this.router.navigate([redirect]);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }

  register() {
    this.authService.register(this.bob).subscribe((res) => {
      console.log(res);
    });
  }
}
