import { Card, CardType } from '../../interfaces/card.interface';
import { Component, OnDestroy } from '@angular/core';
import { GameStateService } from 'src/app/services/game-state/game-state.service';
import { I18nService } from 'src/app/services/i18n/i18n.service';
import { Player } from 'src/app/interfaces/player.interface';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-current-question',
  templateUrl: './current-question.page.html',
  styleUrls: ['./current-question.page.scss'],
})
export class CurrentQuestionPage implements OnDestroy {
  questionCard: Card;
  players: Player[];
  questionCardOnTop: boolean = false;
  handOnTop: boolean = false;
  answerCards: Card[];
  tsarId: number;
  interval$: Subscription;

  constructor(
    public i18n: I18nService,
    private gameStateService: GameStateService
  ) {
    this.interval$ = interval(environment.gameUpdateInterval).subscribe(
      () => this.gameStateService.getState(0).pipe(take(1)).subscribe(
        state => {
          this.questionCard = state.currentBlack;
          this.players = state.players;
          this.answerCards = state.hand.map(card => ({ ...card, type: CardType.ANSWER }));
          this.tsarId = state.czarId
        }
      )
    );
  }

  ngOnDestroy() {
    this.interval$.unsubscribe();
  }
}
