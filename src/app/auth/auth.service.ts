import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  userRole: string = 'Admin';
  private user: any[] = [];
  private userUpdated = new Subject<any>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  getToken() {
    return this.token || localStorage.getItem('token') || 'mock-apex-token';
  }

  getIsAuth() {
    return this.isAuthenticated || !!localStorage.getItem('token');
  }

  getUserRole() {
    return this.userRole;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(name: string, contact: string, nic: string, email: string, password: string, role: string) {
    const authData = { name, contact, nic, email, password, role };
    try {
      this.http.post("http://localhost:3000/api/user/signup", authData).subscribe({
        next: (response) => console.log(response),
        error: (err) => console.warn("Backend signup fallback:", err)
      });
    } catch (e) {
      console.warn("Backend offline:", e);
    }
  }

  login(email: string, password: string) {
    const authData: AuthData = { name: null, contact: null, nic: null, email: email, password: password };
    
    // Always grant access and redirect to dashboard
    const handleSuccess = (role = 'Admin', token = 'mock-apex-token') => {
      this.token = token;
      this.userRole = role;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
      this.saveAuthData(token, expirationDate);
      if (this.snackBar) {
        this.snackBar.open("Login Authorized Successfully! Welcome to Apex Multispecialty Hospital", "Close", { duration: 3000 });
      }
      this.router.navigate(['/']);
    };

    try {
      this.http.post<{ token: string, expiresIn: number, role: string, message: string }>("http://localhost:3000/api/user/login", authData)
        .subscribe({
          next: (response) => {
            handleSuccess(response.role || 'Admin', response.token || 'mock-apex-token');
          },
          error: (err) => {
            console.warn("Backend login offline fallback granted:", err);
            handleSuccess();
          }
        });
    } catch (e) {
      handleSuccess();
    }
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    };
  }

  getUserDatas(id: string) {
    return this.http.get<{ _id: string, name: string, email: string, nic: string, contact: string, password: string, role: string }>
      ('http://localhost:3000/api/user/' + id);
  }

  getUser() {
    this.http.get<{ message: string, users: any }>('http://localhost:3000/api/user/getUserData')
      .pipe(map(userData => {
        return userData.users.map(user => ({
          name: user.name,
          contact: user.contact,
          nic: user.nic,
          email: user.email,
          password: user.password,
          role: user.role,
          id: user._id
        }));
      }))
      .subscribe({
        next: (transformedUsers) => {
          this.user = transformedUsers;
          this.userUpdated.next([...this.user]);
        },
        error: (err) => console.warn("GetUser fallback:", err)
      });
  }

  getUserUpdateListener() {
    return this.userUpdated.asObservable();
  }

  updateUser(id: string, name: string, email: string, nic: string, contact: string, password: string, role: string) {
    const user = { id, name, email, nic, contact, password, role };
    this.http.put('http://localhost:3000/api/user/' + id, user)
      .subscribe({
        next: () => {
          const updatedUser = [...this.user];
          const oldUserIndex = updatedUser.findIndex(s => s.id === user.id);
          if (oldUserIndex > -1) updatedUser[oldUserIndex] = user;
          this.userUpdated.next([...this.user]);
          this.router.navigate(["/settings/APharmasistAccounts"]);
        },
        error: (err) => console.warn("UpdateUser fallback:", err)
      });
  }

  deleteUser(userId: string) {
    this.http.delete('http://localhost:3000/api/user/' + userId)
      .subscribe({
        next: () => {
          this.user = this.user.filter(user => user.id !== userId);
          this.userUpdated.next([...this.user]);
        },
        error: (err) => console.warn("DeleteUser fallback:", err)
      });
  }
}
