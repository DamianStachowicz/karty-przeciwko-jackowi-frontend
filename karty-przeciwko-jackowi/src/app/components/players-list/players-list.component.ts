import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/interfaces/player.interface';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss'],
})
export class PlayersListComponent implements OnInit {
  @Input() players: Player[] = [{
    id: '0',
    name: 'Jacek',
    points: 0,
    isActive: true,
    playedCardId: null
  }, {
    id: '1',
    name: 'Pioter',
    points: 0,
    isActive: false,
    playedCardId: null
  }, {
    id: '2',
    name: 'Damian',
    points: 0,
    isActive: false,
    playedCardId: 0
  }, {
    id: '3',
    name: 'Golden',
    points: 0,
    isActive: false,
    playedCardId: null
  }, {
    id: '4',
    name: 'Hania',
    points: 0,
    isActive: false,
    playedCardId: 2
  }];

  constructor() { }

  ngOnInit() {}

}
