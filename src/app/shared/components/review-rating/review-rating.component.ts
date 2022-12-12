import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RdAuthenticateService } from '../../services/authentication/rd-authenticate.service';

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
  constructor(@Inject(MAT_DIALOG_DATA) public inputData: any,private rdAuthenticateService: RdAuthenticateService){
    this.data = this.inputData;
    this.currentUser = this.rdAuthenticateService.getLocalStorageData();
  }
  submitRating(event:any){
    // event.userPortfolioRating = event.userPortfolioRating.toString();
    // event.userLoginId = this.currentUser.id;
    // console.log(Object.assign([],event))
    // this.rdUserService.submitRating(event)
    //   .subscribe(res => {
    //     this.GetPortfolioDetail();
    //   })
  }
}
