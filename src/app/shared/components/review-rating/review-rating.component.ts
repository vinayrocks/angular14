import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RdAuthenticateService } from '../../services/authentication/rd-authenticate.service';
import { RdUserService } from '../../services/user/rd-user-service';

@Component({
  selector: 'review-rating',
  templateUrl: './review-rating.component.html',
  styleUrls: ['./review-rating.component.scss'],
  styles: [
		`
			i {
				position: relative;
				display: inline-block;
				font-size: 1.5rem;
				padding-right: 0.1rem;
				color: #d3d3d3;
			}

			.filled {
				color: red;
				overflow: hidden;
				position: absolute;
				top: 0;
				left: 0;
			}
		`,
	]
})
export class ReviewRatingComponent {
  data:any=[];
  currentUser:any=[];
  constructor(public dialogRef: MatDialogRef<ReviewRatingComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: any,private rdAuthenticateService: RdAuthenticateService,private rdUserService: RdUserService){
    this.data = this.inputData;
    this.currentUser = this.rdAuthenticateService.getLocalStorageData();
  }
  submitRating(){
    const dxData:any = {};
    dxData.userPortfolioAttachmentId = this.data.userPortfolioAttachmentId;
    dxData.userPortfolioId =this.data.userPortfolioId;
    dxData.userPortfolioRating = this.data.userPortfolioRating;
    dxData.UserId = this.currentUser.id;
    dxData.userPortfolioAttachmentRatingId = this.data.userPortfolioAttachmentRatingId;
    console.log(dxData)
    this.rdUserService.submitRating(dxData)
      .subscribe(res => {
        this.dialogRef.close();
    })
  }
}
