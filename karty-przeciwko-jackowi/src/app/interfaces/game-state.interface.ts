import { Card } from './card.interface';
import { Player } from './player.interface';

export interface GameState {
    czarId: number;
    players: Player[];
    currentBlack: Card;
    hand: Card[];
}
