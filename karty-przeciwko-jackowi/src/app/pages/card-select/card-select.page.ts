import { Component, OnInit } from '@angular/core';
import { Card } from '../../interfaces/card.interface';

@Component({
  selector: 'app-card-select',
  templateUrl: './card-select.page.html',
  styleUrls: ['./card-select.page.scss'],
})
export class CardSelectPage implements OnInit {
  cards: Card[] = [{
    id: 0,
    text: 'Pudel Ciastek',
    type: 'answer'
  }, {
    id: 1,
    text: 'Karty Przeciwko Jackowi',
    type: 'answer'
  }, {
    id: 2,
    text: 'Sucha ryba',
    type: 'answer'
  }];

  constructor() { }

  ngOnInit() {
  }

  select(card: Card) {
    console.log({ selctedCard: card });
  }

}
