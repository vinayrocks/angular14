import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rd-footer',
  templateUrl: './rd-footer.component.html',
  styleUrls: ['./rd-footer.component.scss']
})
export class RdFooterComponent implements OnInit {
  data : Date = new Date();
  constructor() { }

  ngOnInit(): void {
  }

}
