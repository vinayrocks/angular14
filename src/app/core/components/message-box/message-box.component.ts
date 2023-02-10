import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RdAuthenticateService } from 'src/app/shared/services/authentication/rd-authenticate.service';

@Component({
  selector: 'message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent {
  currentUser: any = [];
  constructor(public dialogRef: MatDialogRef<MessageBoxComponent>, private rdAuthenticateService: RdAuthenticateService) {
    dialogRef.disableClose = true;
    this.currentUser = this.rdAuthenticateService.getLocalStorageData();
  }
  showMessage() {
    this.rdAuthenticateService.logout();
    this.currentUser.isLoggedIn = false;
    this.currentUser.isPortfolio = false;
    window.location.href = "/account/login";
  }
}
