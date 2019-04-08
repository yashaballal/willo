import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fpwd',
  templateUrl: './fpwd.component.html',
  styleUrls: ['./fpwd.component.css']
})
export class FpwdComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  sendPassword(title:string)
  {
  	console.log(title)
  }

}
