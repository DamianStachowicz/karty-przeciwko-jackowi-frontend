export interface Card {
    id: number;
    text: string;
    type: CardType;
}

export enum CardType {
    ANSWER = 'answer',
    PICK_1 = 'pick_one',
    PICK_2 = 'pick_two',
    DRAW_2_PICK_3 = 'draw_two_pick_three'
}
