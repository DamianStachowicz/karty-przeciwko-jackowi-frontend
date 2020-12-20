import { Card } from '../../interfaces/card.interface';
import { Component } from '@angular/core';
import { PlayersService } from 'src/app/services/players/players.service';
import { Player } from 'src/app/interfaces/player.interface';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-question',
  templateUrl: './current-question.page.html',
  styleUrls: ['./current-question.page.scss'],
})
export class CurrentQuestionPage {
  questionCard: Card = {
    id: 0,
    text: 'W przypływie pijackiej szczerości postanowiłem ucałować ___',
    type: 'question'
  };
  players: Player[];
  questionCardOnTop: boolean = false;
  handOnTop: boolean = false;
  answerCards: Card[] = [{
    id: 0,
    text: 'Pudel Ciastek',
    type: 'answer'
  }, {
    id: 1,
    text: 'Karty Przeciwko Jackowi',
    type: 'answer'
  }, {
    id: 2,
    text: 'Sucha ryba',
    type: 'answer'
  }];

  constructor(
    private playersService: PlayersService
  ) {
    this.playersService.getPlayers().pipe(take(1)).subscribe(
      players => this.players = players
    )
  }
}
