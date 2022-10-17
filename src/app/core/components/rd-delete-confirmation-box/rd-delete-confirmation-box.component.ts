import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { DeleteEvent, DeletePortfolio, DeleteProfile } from 'src/app/shared/core/models/rd-common/rd-common';
import { RdUserService } from 'src/app/shared/services/user/rd-user-service';

@Component({
  selector: 'app-rd-delete-confirmation-box',
  templateUrl: './rd-delete-confirmation-box.component.html',
  styleUrls: ['./rd-delete-confirmation-box.component.scss']
})
export class RdDeleteConfirmationBoxComponent implements OnInit {
  deleteRadianData: any = [];
  deleteData: any = [];
  constructor(public dialogRef: MatDialogRef<RdDeleteConfirmationBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private rdUserService: RdUserService) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close('Cancel');
  }
  Submit() {
    if (this.data.type === 'Event') {
      this.deleteRadianData.EventId = this.data.id;
      this.deleteData = new DeleteEvent(this.deleteRadianData);
    } else if (this.data.type === 'Portfolio') {
      this.deleteRadianData.PortfolioId = this.data.id;
      this.deleteData = new DeletePortfolio(this.deleteRadianData);
    } else {
      this.deleteRadianData.ProfileId = this.data.id;
      this.deleteData = new DeleteProfile(this.deleteRadianData);
    }
    this.rdUserService.DeleteRequest(this.deleteData,this.data.type)
      .pipe(first())
      .subscribe(
        res => {
          if( res.status){
            this.dialogRef.close('Success');
          } else {
            this.dialogRef.close('Cancel'); 
          }
        },
        error => {
        });
  }

}
