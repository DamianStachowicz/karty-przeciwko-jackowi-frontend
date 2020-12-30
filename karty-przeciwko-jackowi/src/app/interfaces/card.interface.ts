export interface Card {
    id: number;
    text: string;
    type: CardType;
}

export enum CardType {
    ANSWER = 'answer',
    PICK_1 = 'pick_1',
    PICK_2 = 'pick_2',
    DRAW_2_PICK_3 = 'draw_2_pick_3'
}
