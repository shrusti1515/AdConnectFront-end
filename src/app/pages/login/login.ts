import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './../../services/api.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ToastService } from './../../shared/services/toast.service';

interface LoginErrors {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  errorMessage = "";
  successMessage = "";
  loading = false;

  showPassword = false;   // 👁️ toggle password

  errors: LoginErrors = {
    email: '',
    password: ''
  };

  constructor(
    private api: ApiService,
    private readonly routes: Router,
    private toast: ToastService
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login(email: string, password: string) {

    this.errorMessage = "";
    this.successMessage = "";

    // reset errors
    this.errors = {
      email: '',
      password: ''
    };

    // email validation
    if (!email) {
      this.errors.email = "Email is required";
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.errors.email = "Enter valid email";
    }

    // password validation
    if (!password) {
      this.errors.password = "Password is required";
    }

    if (this.errors.email || this.errors.password) return;

    this.loading = true;

    this.api.post('User/login', { email, password }).subscribe({

      next: (res: any) => {

  console.log("Login Response:", res);

  this.loading = false;

  this.toast.show("Login Successful");

  const user = res.user;

  // store common user info
  localStorage.setItem("userId", user.id);
  localStorage.setItem("userRole", user.role);
  localStorage.setItem("userEmail", user.email);
  

  // store role-specific IDs
  if (user.clientId) {
    localStorage.setItem("clientId", user.clientId);
     localStorage.setItem("clientName", user.name);
  }

  if (user.admakerId) {
    localStorage.setItem("admakerId", user.admakerId);
  }

  const role = user.role?.toLowerCase();

  // role based redirect
  if (role === "admin")
    this.routes.navigate(['/admin/dashboard']);

  else if (role === "client")
    this.routes.navigate(['/client/dashboard']);

  else if (role === "admaker")
    this.routes.navigate(['/admaker/dashboard']);

  else
    this.routes.navigate(['/']);

},

      error: (err: any) => {

        this.loading = false;

        if (typeof err === "string")
          this.errorMessage = err;

        else if (err?.error?.message)
          this.errorMessage = err.error.message;

        else
          this.errorMessage = "Invalid email or password";

        console.log("login error", err);
      }

    });
  }
}