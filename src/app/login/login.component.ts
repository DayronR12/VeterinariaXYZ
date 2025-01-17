import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Credenciales } from '../interfaces/credenciales';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required]],
      contra: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credenciales:Credenciales = this.loginForm.value;
      
      this.loginService.login(credenciales).subscribe(
        {
          next: (response) => {
            localStorage.setItem("token", response.token)
            this.router.navigate(['/principal']);
          },
          error: (error) => {
            console.error(error);
          }
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
}
