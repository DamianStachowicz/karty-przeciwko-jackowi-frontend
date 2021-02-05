import { Card, CardType } from '../../interfaces/card.interface';
import { Component, Input } from '@angular/core';
import { I18nService } from 'src/app/services/i18n/i18n.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() card: Card;
  @Input() highlighted = false;
  @Input() number;
  cardTypes = CardType;

  constructor(
    public i18n: I18nService
  ) { }
}
