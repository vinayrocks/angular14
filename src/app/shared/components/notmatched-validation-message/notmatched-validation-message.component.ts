import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notmatched-validation-message',
  templateUrl: './notmatched-validation-message.component.html',
  styleUrls: ['./notmatched-validation-message.component.scss']
})
export class NotmatchedValidationMessageComponent implements OnInit {
  @Input() fieldName: string='';
  constructor() { }

  ngOnInit(): void {
  }

}
