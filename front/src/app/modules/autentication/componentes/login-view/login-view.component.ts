import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Login }         from '../../models/login';

import { AuthService }     from '../../services/auth.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  @ViewChild('pass', { read: ElementRef, static:false }) passInput: ElementRef;
  public login:Login = new Login();

  constructor(
    private auth:   AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  next(){
    this.auth.login( this.login );
  }

  keyPress( e, input ){
    if (e.key == "Enter"){
      
      if (input == "pass") {
        this.next();
      }

      if (input == "user"){
        setTimeout(()=>{
          this.passInput.nativeElement.focus();
        },100);
      }
    }
  }

}
