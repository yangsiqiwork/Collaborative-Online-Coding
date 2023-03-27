import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  title = "COJ";
  username = "";

  constructor(public auth: AuthService,
    @Inject(DOCUMENT) public document: Document,
    ) {}
  
  ngOnInit() {
    // this.username = user.nickname;
  }

  // loginAndGetProfile() {
  //   this.auth.loginWithRedirect();
  //   var profile = this.localAuth.getProfile();
  //   this.username = profile.name;
  //   console.log(this.username);
  // }

  // const decodedToken = getDecodedAccessToken();
  // const userId = decodedToken.sub;
  // const userEmail = decodedToken.email;
  // const userName = decodedToken.name;

}

