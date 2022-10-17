import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-format-validation-message',
  templateUrl: './format-validation-message.component.html',
  styleUrls: ['./format-validation-message.component.scss']
})
export class FormatValidationMessageComponent implements OnInit {
  @Input() fieldName: string='';
  constructor() { }

  ngOnInit(): void {
  }

}
