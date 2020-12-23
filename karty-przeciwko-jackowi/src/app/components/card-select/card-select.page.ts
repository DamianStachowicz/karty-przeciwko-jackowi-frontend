import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Card } from '../../interfaces/card.interface';

@Component({
  selector: 'app-card-select',
  templateUrl: './card-select.page.html',
  styleUrls: ['./card-select.page.scss'],
})
export class CardSelectComponent {
  @Input() cards: Card[];
  @Input() active: boolean = false;
  @Output() selected: EventEmitter<Card> = new EventEmitter<Card>();

  @ViewChild(IonSlides) slidesRef: IonSlides;

  constructor() { }

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

  snap($event) {
    const srcElement: HTMLElement = $event.target;
    this.slidesRef.getActiveIndex().then(
      index => srcElement.firstElementChild.setAttribute('style', `transform: translateX(-${90 * index}%)`)
    );
  }
}
