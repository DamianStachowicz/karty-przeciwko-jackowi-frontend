import { Card } from '../../interfaces/card.interface';
import { Component, Input, OnInit } from '@angular/core';
import { PlayersService } from 'src/app/services/players/players.service';
import { Player } from 'src/app/interfaces/player.interface';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-question',
  templateUrl: './current-question.page.html',
  styleUrls: ['./current-question.page.scss'],
})
export class CurrentQuestionPage implements OnInit {
  questionCard: Card = {
    id: 0,
    text: 'W przypływie pijackiej szczerości postanowiłem ucałować ___',
    type: 'question'
  };
  players: Player[];
  questionCardTop: boolean = false;

  constructor(
    private playersService: PlayersService
  ) {
    this.playersService.getPlayers().pipe(take(1)).subscribe(
      players => this.players = players
    )
  }

  ngOnInit() {
  }

}
