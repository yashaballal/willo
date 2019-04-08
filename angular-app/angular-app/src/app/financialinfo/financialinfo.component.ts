import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-financialinfo',
  templateUrl: './financialinfo.component.html',
  styleUrls: ['./financialinfo.component.css']
})
export class FinancialinfoComponent implements OnInit {

  constructor( private Auth:AuthService, private router: Router) { }

  ngOnInit() {
  	if(!this.Auth.getLoggedInStatus())
    {
      this.router.navigate(['/login'])
    }

  }

}
