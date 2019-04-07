import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-customerfb',
  templateUrl: './customerfb.component.html',
  styleUrls: ['./customerfb.component.css']
})
export class CustomerfbComponent implements OnInit {

  constructor(private Auth:AuthService) { }

  public feedbackArr = [];

  ngOnInit() {
  	this.Auth.getCustomerFeedbackDetails().subscribe(data=>{
    var self = this;
    console.log(data);
    data.forEach(function(value){
      self.feedbackArr.push(value);
    });

    });
  }

}
