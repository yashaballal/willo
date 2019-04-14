import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css']
})
export class AddadminComponent implements OnInit {

  constructor(private Auth:AuthService, private router: Router) {}

  ngOnInit() {
  	if(!this.Auth.getLoggedInStatus())
    {
      this.router.navigate(['/login'])
    }

  }

  displayPass:boolean = false;
  displayFail:boolean = false;

  addAdmin(textInput:string, passwordInput:string)
  {
    console.log("The text input is: "+ textInput+"The password input is: "+passwordInput);
    this.Auth.addAdminApi(textInput, passwordInput).subscribe(data=>{
        if(data['result']){
          this.displayPass = true;
          this.displayFail = false;
        }
        else{
          this.displayFail = true;
          this.displayPass = false;
          }

    });
  }

}
