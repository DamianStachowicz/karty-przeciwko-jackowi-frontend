import { Card } from '../../interfaces/card.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-question',
  templateUrl: './current-question.page.html',
  styleUrls: ['./current-question.page.scss'],
})
export class CurrentQuestionPage implements OnInit {
  card: Card = {
    id: 0,
    text: 'W przypływie pijackiej szczerości postanowiłem ucałować ___',
    type: 'question'
  };

  constructor() { }

  ngOnInit() {
  }

}
