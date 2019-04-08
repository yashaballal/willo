import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customerfb',
  templateUrl: './customerfb.component.html',
  styleUrls: ['./customerfb.component.css']
})
export class CustomerfbComponent implements OnInit {

  constructor(private Auth:AuthService, private router: Router) { }

  public feedbackArr = [];
  someThing:boolean = false;

  ngOnInit() {
    if(!this.Auth.getLoggedInStatus())
    {
      this.router.navigate(['/login'])
    }

  	this.Auth.getCustomerFeedbackDetails().subscribe(data=>{
    var self = this;
    console.log(data);
    data.forEach(function(value){
      self.feedbackArr.push(value);
    });

    });
    $(document).ready( function () {
      $('#myTable').DataTable();
  } );
  }
  someFunction(){
    this.someThing = !this.someThing;
  }
}
