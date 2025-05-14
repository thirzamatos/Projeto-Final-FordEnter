import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Login } from '../interfaces/Login.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
  ]
})

export class LoginComponent {
   mensagemDeErro: string | null = null;

  constructor(private router: Router, private service:ApiService) {}

  onLogin(login:Login[]): void {
    console.log('Login data:', login)
    this.service.login(login).subscribe({
      next: ()=>{
        this.router.navigateByUrl('/home');

      },
      error:(error)=>{
        this.mensagemDeErro=error.error.message
      }
    })
    
  }
}
