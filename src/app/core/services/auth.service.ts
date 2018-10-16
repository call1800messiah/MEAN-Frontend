import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs/index';
import { delay, map, tap } from 'rxjs/internal/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserDetails } from '../interfaces/IUserDetails';
import { TokenResponse } from '../interfaces/ITokenResponse';
import { TokenPayload } from '../interfaces/ITokenPayload';
import { CONFIG } from '../config';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: string;
  private token: string;


  constructor(private http: HttpClient, private router: Router) { }


  getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }


  isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }


  login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }


  loginSteam(): Observable<any> {
    return this.request('get', 'steam');
  }


  logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }


  register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }


  private request(method: 'post'|'get', type: 'login'|'register'|'profile'|'steam', user?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(
      `${CONFIG.API_HOST}${CONFIG.API_PATH}${CONFIG.API_VERSION}/users/${type}`,
        user
      );
    } else {
      const options = {
        headers: {}
      };
      if (type !== 'steam') {
        options.headers = { Authorization: `Bearer ${this.getToken()}` };
      }
      base = this.http.get(
      `${CONFIG.API_HOST}${CONFIG.API_PATH}${CONFIG.API_VERSION}/users/${type}`,
      options
      );
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }


  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }


  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }
}
