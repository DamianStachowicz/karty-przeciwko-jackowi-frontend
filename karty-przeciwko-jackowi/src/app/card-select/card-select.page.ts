import { Component, OnInit } from '@angular/core';
import { Card } from '../interfaces/card.interface';

@Component({
  selector: 'app-card-select',
  templateUrl: './card-select.page.html',
  styleUrls: ['./card-select.page.scss'],
})
export class CardSelectPage implements OnInit {
  cards: Card[] = [{
    id: 0,
    text: 'Pudel Ciastek'
  }, {
    id: 1,
    text: 'Karty Przeciwko Jackowi'
  }, {
    id: 2,
    text: 'Sucha ryba'
  }];

  constructor() { }

  ngOnInit() {
  }

  select(card: Card) {
    console.log({ selctedCard: card });
  }

}
