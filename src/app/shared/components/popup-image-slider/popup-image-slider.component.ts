import { Component, OnInit, Input, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { EmbedVideoService } from 'ngx-embed-video';
@Component({
  selector: 'app-popup-image-slider',
  templateUrl: './popup-image-slider.component.html',
  styleUrls: ['./popup-image-slider.component.scss'],
  providers: [NgbCarouselConfig]
})
export class PopupImageSliderComponent implements OnInit {
  @ViewChild('imagecarousel') imagecarousel: NgbCarousel;
  imageArray: any;
  slideIndex=0;
  youtubeUrl = "https://www.youtube.com/watch?v=iHhcHTlGtRs";
  yutube:any
  constructor(@Inject(MAT_DIALOG_DATA) public inputData: any,config: NgbCarouselConfig,
  private embedService: EmbedVideoService) {
    this.imageArray = this.inputData.imageArray
    this.slideIndex=this.inputData.imageActive.toString();
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }

  ngOnInit(): void {
    const indexSelected = 'slide'+this.slideIndex;
    setTimeout(() => { this.imagecarousel.select(indexSelected) });
    ;
  }
  getVideo(url){
      return this.embedService.embed(url);
  }
  
}
