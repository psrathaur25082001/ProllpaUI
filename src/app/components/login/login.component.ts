import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username :string='';
  password :string='';
  loginError :boolean=false;

  onSubmit() {
    if (this.username === 'user' && this.password === 'password') {
      // Successful login logic here
      this.loginError = false;
      alert('Login successful!');
    } else {
      this.loginError = true;  // Show error if login fails
    }
  }
}

