import { Component, OnInit } from '@angular/core';
import { BackuserService } from '../../_common/_services/_global/backuser.service';
import { AuthenticationService } from '../../_common/_services/_specific/authentication.service';
import { SessionStorageService } from '../../_common/_services/_specific/session-storage.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators,  } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup-in',
  templateUrl: './signup-in.component.html',
  styleUrls: ['./signup-in.component.scss']
})

export class SignupInComponent implements OnInit{

  username : string = "";
  password : string = "";
  email : string = "";
  confirmPassword : string = "";
  registerMessage : string = "";
  loginMessage : string = "";
  submitted : boolean = false;
  isRightPanelActive: boolean = false;
  isLoggedIn : Observable<boolean>;

  registerForm : FormGroup = new FormGroup({
    username : new FormControl(""),
    email : new FormControl(""),
    password : new FormControl(""),
    confirmPassword : new FormControl("")
  });

  loginForm : FormGroup = new FormGroup({
    username : new FormControl(""),
    password : new FormControl("")
  });
  
  constructor(private _backuserService : BackuserService, private authService : AuthenticationService, private storageService : SessionStorageService, private router : Router, private formBuilder : FormBuilder){
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group ({
      username : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]){6,}$/)]],
      confirmPassword : ['', Validators.required]
    });
    this.loginForm = this.formBuilder.group ({
      username : ['', [Validators.required]],
      password : ['', [Validators.required]],
    });
  }

  get registerCtrl() {
    return this.registerForm.controls;
  }

  get loginCtrl() {
    return this.loginForm.controls;
  }

  public addNewUser(){
    this.username = this.registerForm.get("username")?.value;
    this.email = this.registerForm.get("email")?.value;
    this.password = this.registerForm.get("password")?.value;
    this.confirmPassword = this.registerForm.get("confirmPassword")?.value;
    this.submitted = true;
    if(this.confirmPassword !== this.password){
      this.registerMessage = "Les mots de passe doivent correspondre !"
      return;
    } 
    else { 
      this._backuserService.addNewUser(this.username, this.password, this.email)
    .subscribe({
      next: (response) => {
        this.router.navigate(['/genre'], { queryParams: {user : this.username}});
        this.registerMessage = response.message;
      },
      error: (err : Error) => {
        console.error(err);
      }
    });
  }
  }

  public login(){
    this.username = this.loginForm.get("username")?.value;
    this.password = this.loginForm.get("password")?.value;
    this.submitted = true;
    if (!this.loginForm.invalid) {
      this.authService.login(this.username, this.password).subscribe({
        next: data => {
          this.storageService.saveUser(data);
          this.storageService.login.next(true);
          this.router.navigate(['/home']);
        },
        error: err => {
          console.log(err);
          this.storageService.login.next(false);
          this.loginMessage = "Le nom d'utilisateur ou le mot de passe est erroné !"
        }
      });
    }
    }

  public onSignUpClick() {
    this.isRightPanelActive = true;
  }

  public onSignInClick() {
    this.isRightPanelActive = false;
  }

  public switchLoginView() {
    var signup = document.getElementById("sc-signup");
    var signin = document.getElementById("sc-signin");
    if (signup?.className == "sc-signup" && signin?.className == "sc-signin"){
      signup.className += " active";
      signin.className += " inactive";
    } else if (signup?.className == "sc-signup active" && signin?.className == "sc-signin inactive"){
      signup.className = "sc-signup";
      signin.className = "sc-signin";
    }
  }

}
