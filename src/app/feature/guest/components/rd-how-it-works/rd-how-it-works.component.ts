import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rd-how-it-works',
  templateUrl: './rd-how-it-works.component.html',
  styleUrls: ['./rd-how-it-works.component.scss']
})
export class RdHowItWorksComponent implements OnInit {
  constructor( private router: Router) { }
  ngOnInit(): void {
   // this.accordion.openAll();
  }
  joinUs(){
    this.router.navigate(['/account/signup']);
  }

}
