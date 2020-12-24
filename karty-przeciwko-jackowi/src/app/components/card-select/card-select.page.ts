import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../../interfaces/card.interface';

@Component({
  selector: 'app-card-select',
  templateUrl: './card-select.page.html',
  styleUrls: ['./card-select.page.scss'],
})
export class CardSelectComponent implements OnInit {
  @Input() cards: Card[];
  @Input() active: boolean = false;
  @Output() selected: EventEmitter<Card> = new EventEmitter<Card>();

  public slideWidth: number; // in px

  constructor() {}

  ngOnInit() {
    this.slideWidth = window.innerWidth * 0.9;
  }

  select(card: Card) {
    if (!this.active) {
      return;
    }

    this.selected.emit(card);
    this.remove(card);
    console.log({ selctedCard: card });
  }

  private remove(card: Card) {
    const index = this.cards.findIndex(elem => elem === card);

    if (index > -1) {
      this.cards.splice(index, 1);
    }
  }
}
