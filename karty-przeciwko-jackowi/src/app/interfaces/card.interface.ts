export interface Card {
    id: number;
    text: string;
    playerId?: number;
    type: 'answer' | 'question';
}
