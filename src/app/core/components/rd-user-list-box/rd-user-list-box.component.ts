import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { RdEventIntUser } from 'src/app/shared/core/models/rd-common/rd-common';
import { RdUserService } from 'src/app/shared/services/user/rd-user-service';

@Component({
  selector: 'app-rd-user-list-box',
  templateUrl: './rd-user-list-box.component.html',
  styleUrls: ['./rd-user-list-box.component.scss']
})
export class RdUserListBoxComponent implements OnInit {

  getEventUserParameter: any = [];
  userList: any = [];
  showData:Boolean=true;
  constructor(public dialogRef: MatDialogRef<RdUserListBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private rdUserService: RdUserService) {
    this.getEventUserParameter.EventId = this.data.id;
    this.GetUserList(this.getEventUserParameter)
  }

  ngOnInit(): void {

  }
  GetUserList(data) {
    this.rdUserService.getEventInterestedUserList(new RdEventIntUser(data))
      .pipe(first())
      .subscribe(
        res => {
          if (res.status) {
            res.data.forEach(element => {
              element.userContactDetail = JSON.parse(element.userContactDetail)
            });
            this.userList = res.data;
          }
          this.showData=false;
        },
        error => {
          this.showData=false;
        });
  }
}
