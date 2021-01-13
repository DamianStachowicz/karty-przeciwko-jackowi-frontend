import { AlertController, AnimationController } from '@ionic/angular';
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
  public questionCard: Card;
  public players: Player[];
  public questionCardOnTop = false;
  public handOnTop = false;
  public answerCards: Card[];
  public tsarId: number;
  public interval$: Subscription;
  public tsarAlertShown = false;
  public yourId = 0;

  constructor(
    public i18n: I18nService,
    private alertController: AlertController,
    private animationCtrl: AnimationController,
    private gameStateService: GameStateService,
  ) {
    this.startStateUpdating();
  }

  ngOnDestroy() {
    this.interval$.unsubscribe();
  }

  private startStateUpdating() {
    this.interval$ = interval(environment.gameUpdateInterval).subscribe(
      () => this.gameStateService.getState(0).pipe(take(1)).subscribe(
        state => {
          this.questionCard = state.currentBlack;
          this.players = state.players;
          this.answerCards = state.hand.map(card => ({ ...card, type: CardType.ANSWER }));
          this.tsarId = state.czarId;

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
        },
        error => this.showErrorDialog(error)
      )
    );
  }

  private async displayAlert(header: string, text: string, handler: () => void) {
    const alert = await this.alertController.create({
      header,
      message: text,
      buttons: [{ text: 'OK', handler }],
      enterAnimation: (baseEl: any, opts?: any) => this.animationCtrl
        .create()
        .addElement(baseEl.querySelector('.alert-wrapper'))
        .duration(250)
        .keyframes([
          { offset: 0, opacity: '0' },
          { offset: 1, opacity: '1' }
      ])
    });

    await alert.present();
  }

  private showErrorDialog(error) {
    this.interval$.unsubscribe();
    this.displayAlert(
      this.i18n.get('error'),
      error.message || this.i18n.get('defaultError'),
      () => this.startStateUpdating()
    );
  }

  private showTsarAlert(tsarName: string) {
    this.displayAlert(
      '',
      this.i18n.get('currentTsarText').replace('${tsarName}', tsarName),
      () => {}
    );
  }

  private showYouReATsarAlert(tsarName: string) {
    this.displayAlert(
      '',
      this.i18n.get('youReATsarText').replace('${tsarName}', tsarName),
      () => {}
    );
  }
}
