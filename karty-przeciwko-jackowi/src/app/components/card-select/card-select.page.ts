import { AlertController, AnimationController } from '@ionic/angular';
import { Card } from '../../interfaces/card.interface';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
  } from '@angular/core';
import { GameStateService, Move } from 'src/app/services/game-state/game-state.service';
import { I18nService } from 'src/app/services/i18n/i18n.service';

@Component({
  selector: 'app-card-select',
  templateUrl: './card-select.page.html',
  styleUrls: ['./card-select.page.scss'],
})
export class CardSelectComponent implements OnInit {
  @Input() cards: Card[];
  @Input() active = false;
  @Output() selected: EventEmitter<Card> = new EventEmitter<Card>();

  public slideWidth: number; // in px

  constructor(
    public i18n: I18nService,
    private alertController: AlertController,
    private animationCtrl: AnimationController,
    private gameStateService: GameStateService
  ) {}

  ngOnInit() {
    this.slideWidth = window.innerWidth * 0.9;
  }

  select(card: Card) {
    if (!this.active) {
      return;
    }

    this.selected.emit(card);
    this.remove(card);

    this.gameStateService.makeAMove(1, Move.PICK, [card.id]).subscribe(
      () => { },
      error => this.displayAlert(
        this.i18n.get('error'),
        error.message || this.i18n.get('defaultError'),
        () => { }
      )
    );
  }

  private remove(card: Card) {
    const index = this.cards.findIndex(elem => elem === card);

    if (index > -1) {
      this.cards.splice(index, 1);
    }
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
}
