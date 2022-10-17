import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-required-validation-message',
  templateUrl: './required-validation-message.component.html',
  styleUrls: ['./required-validation-message.component.scss']
})
export class RequiredValidationMessageComponent implements OnInit {
  @Input() fieldName: string;
  constructor() { }

  ngOnInit(): void {
  }

}
