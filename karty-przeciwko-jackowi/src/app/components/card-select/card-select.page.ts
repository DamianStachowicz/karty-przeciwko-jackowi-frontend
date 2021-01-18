import { Card, CardType } from '../../interfaces/card.interface';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
  } from '@angular/core';
import { GameStateService, Move } from 'src/app/services/game-state/game-state.service';
import { I18nService } from 'src/app/services/i18n/i18n.service';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-card-select',
  templateUrl: './card-select.page.html',
  styleUrls: ['./card-select.page.scss'],
})
export class CardSelectComponent implements OnInit {
  @Input() blackType: CardType;
  @Input() cards: Card[];
  @Input() active = false;
  @Output() selected: EventEmitter<Card[]> = new EventEmitter<Card[]>();
  @Output() onclose: EventEmitter<void> = new EventEmitter<void>();
  highlighted: number[] = [];
  highlightedEnough = false;

  public slideWidth: number; // in px

  constructor(
    public i18n: I18nService,
    private alertService: AlertService,
    private gameStateService: GameStateService
  ) {}

  ngOnInit() {
    this.slideWidth = window.innerWidth * 0.9;
  }

  highlight(card: Card) {
    if (!this.active) {
      return;
    }

    const index = this.highlighted.findIndex(id => id === card.id);
    if (index > -1) {
      this.highlighted.splice(index, 1);
      this.highlightedEnough = false;
      return;
    }

    if (this.canHighlight()) {
      this.highlighted.push(card.id);
      this.highlightedEnough = !this.canHighlight();
    }
  }

  canHighlight(): boolean {
    switch (this.blackType) {
      case CardType.PICK_1: return this.highlighted.length < 1;
      case CardType.PICK_2: return this.highlighted.length < 2;
      case CardType.DRAW_2_PICK_3: return this.highlighted.length < 3;
      default: return false;
    }
  }

  select() {
    if (!this.active) {
      return;
    }

    this.selected.emit(this.getHighlightedCards());
    this.highlighted.forEach(id => this.removeFromCards(id));

    this.gameStateService.makeAMove(1, Move.PICK, this.highlighted).subscribe(
      () => {
        this.clear();
        this.selected.emit(this.getHighlightedCards());
      },
      error => this.alertService.displayAlert(
        this.i18n.get('error'),
        error.message || this.i18n.get('defaultError'),
        () => { }
      )
    );
  }

  close($event: Event) {
    this.onclose.emit();
    $event.stopPropagation();
    this.clear();
  }

  private getCardById(id: number) {
    console.log(this.cards.find(card => card.id = id));
    return this.cards.find(card => card.id = id);
  }

  private getHighlightedCards(): Card[] {
    return this.cards.filter(card => this.highlighted.some(id => id === card.id));
  }

  private removeFromCards(id: number) {
    const index = this.cards.findIndex(card => card.id === id);

    if (index > -1) {
      this.cards.splice(index, 1);
    }
  }

  private clear() {
    this.highlighted = [];
    this.highlightedEnough = false;
  }
}
