import { Component, Input } from '@angular/core';
import { Player } from 'src/app/interfaces/player.interface';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss'],
})
export class PlayersListComponent {
  @Input() players: Player[];
  @Input() tsarId: number;
}
