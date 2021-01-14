import { Card } from './card.interface';
import { Player } from './player.interface';

export interface GameState {
    tsarId: number;
    players: Player[];
    black: Card;
    hand: Card[];
}
