import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  email: string;
  username: string;
  
  constructor(public auth: AuthService, public httpClient: HttpClient) {}

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    this.auth.idTokenClaims$
      .subscribe((claims: any) => {
        this.email = claims.email;
        this.username = claims.nickname;
      });
  }
  
  public resetPassword(): void {
 
    
    // const httpOptions = {
      // url: 'https://${this.Domain}/api/v2/users/%7BuserId%7D',
      // headers: new HttpHeaders({
      //   'Content-Type': 'application/json',
      //   'Authorization': `Bearer {yourMgmtApiAccessToken}`
    //   })
    // };
    
    // const body = {
    //   password: 'newPassword',
    //   connection: 'connectionName'
    // };

    // updateResource(id: number, data: any) {
    //   const url = `https://example.com/resources/${id}`;
    //   return this.http.patch(url, data);
    // }





    // const url = 'https://{yourDomain}/api/v2/users/%7BuserId%7D';
    //   const httpOptions = {
    //     headers: new HttpHeaders({
    //       'Content-Type':  'application/json',
    //       'Authorization': 'Bearer {yourMgmtApiAccessToken}'
    //     })
    //   };
    //   const requestBody = {password: 'newPassword', connection: 'connectionName'};
    
    //   this.httpClient.patch(url, requestBody, httpOptions)
    //     .subscribe(response => console.log(response),
    //                error => console.error(error));
  }
}


// var axios = require("axios").default;

// var options = {
//   method: 'PATCH',
//   url: 'https://{yourDomain}/api/v2/users/%7BuserId%7D',
//   headers: {
//     'content-type': 'application/json',
//     authorization: 'Bearer {yourMgmtApiAccessToken}'
//   },
//   data: {password: 'newPassword', connection: 'connectionName'}
// };

// axios.request(options).then(function (response) {
//   console.log(response.data);
// }).catch(function (error) {
//   console.error(error);
// });