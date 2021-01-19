import { AlertService } from 'src/app/services/alert/alert.service';
import { Card, CardType } from '../../interfaces/card.interface';
import { Component, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { finalize, take } from 'rxjs/operators';
import { GameStateService } from 'src/app/services/game-state/game-state.service';
import { I18nService } from 'src/app/services/i18n/i18n.service';
import { interval, Subscription } from 'rxjs';
import { Player } from 'src/app/interfaces/player.interface';

@Component({
  selector: 'app-current-question',
  templateUrl: './current-question.page.html',
  styleUrls: ['./current-question.page.scss'],
})
export class CurrentQuestionPage implements OnDestroy {
  public questionCard: Card;
  public players: Player[];
  public questionCardOnTop = false;
  public handOnTop = false;
  public answerCards: Card[];
  public tsarId: number;
  public interval$: Subscription;
  public tsarAlertShown = false;
  public yourId = 1;
  public loading = true;

  constructor(
    public i18n: I18nService,
    private alertService: AlertService,
    private gameStateService: GameStateService
  ) {
    // todo remove timeout (it's for debugging as there's no loading screen yet)
    setTimeout(() => this.startStateUpdating(), 3000);
  }

  ngOnDestroy() {
    this.interval$.unsubscribe();
  }

  private startStateUpdating() {
    this.updateGameState();
    this.interval$ = interval(environment.gameUpdateInterval).subscribe(
      () => this.updateGameState(),
      error => this.showErrorDialog(error)
    );
  }

  private updateGameState() {
    this.gameStateService.getState(1).pipe(take(1), finalize(() => this.loading = false)).subscribe(
      state => {
        this.questionCard = state.black;
        this.players = state.players;
        this.answerCards = state.hand.map(card => ({ ...card, type: CardType.ANSWER }));
        this.tsarId = state.tsarId;

        if (!this.tsarAlertShown) {
          const tsar = this.players.find(player => player.id === this.tsarId);

          if (!tsar) {
            this.showErrorDialog({});
            return;
          }

          if (tsar.id === this.yourId) {
            this.showYouReATsarAlert(tsar.name);
          } else {
            this.showTsarAlert(tsar.name);
          }

          this.tsarAlertShown = true;
        }
      }
    );
  }

  private showErrorDialog(error) {
    this.interval$.unsubscribe();
    this.alertService.displayAlert(
      this.i18n.get('error'),
      error.message || this.i18n.get('defaultError'),
      () => this.startStateUpdating()
    );
  }

  private showTsarAlert(tsarName: string) {
    this.alertService.displayToast(
      this.i18n.get('currentTsarText').replace('${tsarName}', tsarName)
    );
  }

  private showYouReATsarAlert(tsarName: string) {
    this.alertService.displayToast(
      this.i18n.get('youReATsarText').replace('${tsarName}', tsarName)
    );
  }

  hideCards() {
    this.questionCardOnTop = false;
    this.handOnTop = false;
  }
}
