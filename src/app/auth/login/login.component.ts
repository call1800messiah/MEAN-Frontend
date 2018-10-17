import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenPayload } from '../../core/interfaces/ITokenPayload';
import { Observable} from 'rxjs/index';
import { map } from 'rxjs/internal/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;
  isLoggedIn: boolean;
  private bob: TokenPayload;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.setMessage();
    this.bob = {
      email: 'bob@test.de',
      name: 'Bob',
      password: 'test',
    };
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const token = params.get('token');
      if (token) {
        this.authService.saveToken(token);
        this.performLogin();
      }
    });
  }

  setMessage() {
    this.message = `Logged ${this.isLoggedIn ? 'in' : 'out'}`;
  }

  login() {
    this.message = 'Trying to log in';

    this.authService.login(this.bob).subscribe(() => {
      this.performLogin();
    });
  }

  loginSteam() {
    this.authService.loginSteam();
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


  private performLogin() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.setMessage();
    if (this.isLoggedIn) {
      const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '';
      this.router.navigate([redirect]);
    }
  }
}
