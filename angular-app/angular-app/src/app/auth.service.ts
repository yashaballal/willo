import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

const apiURL= "http://localhost:4600/api/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = false
  private username:string;
  private cid:string;

  constructor(private http: HttpClient) { }

  setLoggedInStatus(value:boolean){
    this.loggedInStatus = value
  }
  get isLoggedIn(){
    return this.loggedInStatus
  }

  setCID(cid:string){
    this.cid=cid;
  }

  getUserDetails(username, password){
    this.username = username;
    var URL = apiURL+"auth";
    return this.http.post(URL,{
      username,password
    })
  }

  getStatsDetails()
  {
    var statsURL = apiURL+"stats";
    console.log("Reached till this point getStatDetails "+statsURL);
    return this.http.get<any[]>(statsURL);
  }

  getUserAccountDetails()
  {
    var useraccountURL = apiURL+"useraccount";
    console.log("Reached till this point getUserAccountDetails "+useraccountURL);
    return this.http.get<any[]>(useraccountURL);
  }

  getCustomerFeedbackDetails()
  {
    var customerfbURL = apiURL+"customerfb";
    console.log("Reached till this point getUserAccountDetails "+customerfbURL);
    return this.http.get<any[]>(customerfbURL);
  }


}
