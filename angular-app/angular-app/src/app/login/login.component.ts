import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DashboardComponent } from '../dashboard/dashboard.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private Auth:AuthService, private router: Router, private dashboard: DashboardComponent) { }

  ngOnInit() {
  }

   loginUser(event){
	    event.preventDefault()
	    const target = event.target
	    const username  = target.querySelector('#username').value
	    const password  = target.querySelector('#password').value
	    this.Auth.getUserDetails(username,password).subscribe(data=>{
	      if(data['result']){
	        this.router.navigate(['/dashboard'])
	        this.Auth.setLoggedInStatus(true)

	      }
	      else{
	        window.alert("Invalid credentials! Please try again.")
	      }
	    })
	    console.log(username,password)
  }
}
