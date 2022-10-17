import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/common/rd-notification/notification.service';
import { RdUserService } from 'src/app/shared/services/user/rd-user-service';

@Component({
  selector: 'app-rd-url-link-box',
  templateUrl: './rd-url-link-box.component.html',
  styleUrls: ['./rd-url-link-box.component.scss']
})
export class RdUrlLinkBoxComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RdUrlLinkBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }
  showMessage(){
    this.notificationService.success('Clipboard copied.');
  }
  onNoClick(): void {
    this.dialogRef.close('Cancel');
  }
}
