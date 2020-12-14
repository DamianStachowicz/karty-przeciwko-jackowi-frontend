import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../interfaces/card.interface';

@Component({
  selector: 'app-answer-card',
  templateUrl: './answer-card.component.html',
  styleUrls: ['./answer-card.component.scss'],
})
export class AnswerCardComponent implements OnInit {
  @Input() card: Card;

  constructor() { }

  ngOnInit() {}

}
