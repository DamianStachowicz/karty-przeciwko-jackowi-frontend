import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
  } from '@angular/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Card, CardType } from '../../interfaces/card.interface';
import { DomController, GestureController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { finalize, take } from 'rxjs/operators';
import { GameStateService } from 'src/app/services/game-state/game-state.service';
import { I18nService } from 'src/app/services/i18n/i18n.service';
import { interval, Subscription } from 'rxjs';
import { Player } from 'src/app/interfaces/player.interface';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-current-question',
  templateUrl: './current-question.page.html',
  styleUrls: ['./current-question.page.scss'],
})
export class CurrentQuestionPage implements AfterViewInit, OnDestroy {
  @ViewChild('hand', { read: ElementRef }) hand: ElementRef;
  @ViewChild('question', { read: ElementRef }) question: ElementRef;

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
    private domCtrl: DomController,
    private gameStateService: GameStateService,
    private gestureCtrl: GestureController
  ) {
    // todo remove timeout (it's for debugging as there's no loading screen yet)
    setTimeout(() => this.startStateUpdating(), 3000);
  }

  ngOnDestroy() {
    this.interval$.unsubscribe();
  }

  ngAfterViewInit() {
    this.domCtrl.read(() => {
      this.setupHandGesture();
      this.setupQuestionGesture();
    });
  }

  private setupHandGesture() {
    let handTop = 0;
    let transition = 'top 0.7s';

    const moveGesture = this.gestureCtrl.create({
      el: this.hand.nativeElement,
      threshold: 0,
      gestureName: 'move',
      onStart: ev => {
        handTop = UtilsService.cssGetTopPx(this.hand.nativeElement);
        transition = this.hand.nativeElement.style.transition;

        this.hand.nativeElement.style.transition = 'none';
      },
      onMove: ev => { this.hand.nativeElement.style.top = `${handTop + ev.deltaY}px`; },
      onEnd: ev => {
        this.hand.nativeElement.style.transition = transition;

        const threshold = window.innerHeight / 4;
        if (this.handOnTop) {
          if (ev.deltaY > threshold) {
            this.handOnTop = false;
            this.hand.nativeElement.style.top = '66%';
          } else if (ev.deltaY !== 0) {
            this.handOnTop = false;
            this.hand.nativeElement.style.top = '66%';
          }
        } else {
          if (ev.deltaY < -threshold || ev.deltaY === 0) {
            this.handOnTop = true;
            this.hand.nativeElement.style.top = '5%';
          } else if (ev.deltaY === 0) {
            this.handOnTop = true;
            this.hand.nativeElement.style.top = '5%';
          } else {
            this.handOnTop = false;
            this.hand.nativeElement.style.top = '66%';
          }
        }
      }
    });

    moveGesture.enable(true);
  }

  private setupQuestionGesture() {
    let questionTop = 0;
    let transition = 'top 0.7s';

    const moveGesture = this.gestureCtrl.create({
      el: this.question.nativeElement,
      threshold: 0,
      gestureName: 'move',
      onStart: ev => {
        questionTop = UtilsService.cssGetTopPx(this.question.nativeElement);
        transition = this.question.nativeElement.style.transition;

        this.question.nativeElement.style.transition = 'none';
      },
      onMove: ev => { this.question.nativeElement.style.top = `${questionTop + ev.deltaY}px`; },
      onEnd: ev => {
        this.question.nativeElement.style.transition = transition;

        const threshold = window.innerHeight / 8;
        if (this.questionCardOnTop) {
          if (ev.deltaY < -threshold || ev.deltaY === 0) {
            this.questionCardOnTop = false;
            this.question.nativeElement.style.top = '33%';
          }
          if (ev.deltaY > threshold) {
            this.questionCardOnTop = false;
            this.question.nativeElement.style.top = '33%';
          } else if (ev.deltaY !== 0) {
            this.questionCardOnTop = false;
            this.question.nativeElement.style.top = '33%';
          }
        } else {
          if (ev.deltaY < -threshold || ev.deltaY === 0) {
            this.questionCardOnTop = true;
            this.question.nativeElement.style.top = '5%';
          } else if (ev.deltaY === 0) {
            this.questionCardOnTop = true;
            this.question.nativeElement.style.top = '5%';
          } else {
            this.questionCardOnTop = false;
            this.question.nativeElement.style.top = '33%';
          }
        }
      }
    });

    moveGesture.enable(true);
  }

  private startStateUpdating() {
    this.updateGameState();
    this.interval$ = interval(environment.gameUpdateInterval).subscribe(
      () => this.updateGameState(),
      error => this.showErrorDialog(error)
    );
  }

  private updateGameState() {
    this.gameStateService.getState(0).pipe(take(1), finalize(() => this.loading = false)).subscribe(
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
