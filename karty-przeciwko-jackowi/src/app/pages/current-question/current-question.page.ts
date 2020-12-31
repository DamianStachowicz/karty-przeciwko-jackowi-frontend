import { AlertController } from '@ionic/angular';
import { Card, CardType } from '../../interfaces/card.interface';
import { Component, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GameStateService } from 'src/app/services/game-state/game-state.service';
import { I18nService } from 'src/app/services/i18n/i18n.service';
import { interval, Subscription } from 'rxjs';
import { Player } from 'src/app/interfaces/player.interface';
import { take } from 'rxjs/operators';

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
    private alertController: AlertController,
    private gameStateService: GameStateService
  ) {
    this.startStateUpdating();
  }

  ngOnDestroy() {
    this.interval$.unsubscribe();
  }

  private startStateUpdating() {
    this.interval$ = interval(environment.gameUpdateInterval).subscribe(
      () => this.gameStateService.getState(12).pipe(take(1)).subscribe(
        state => {
          this.questionCard = state.currentBlack;
          this.players = state.players;
          this.answerCards = state.hand.map(card => ({ ...card, type: CardType.ANSWER }));
          this.tsarId = state.czarId
        },
        error => this.showErrorDialog(error)
      )
    );
  }

  private async showErrorDialog(error) {
    this.interval$.unsubscribe();

    const alert = await this.alertController.create({
      header: this.i18n.get('error'),
      message: error.message || this.i18n.get('defaultError'),
      buttons: [{
        text: 'OK',
        handler: () => this.startStateUpdating()
      }]
    });

    await alert.present();
  }
}
