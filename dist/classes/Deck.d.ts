import { Card } from "./Card.js";
/**
 * This class represents an entire Deck of cards (52 cards).
 * It is simply a manager, giving new cards when requested!
 */
export declare class Deck {
    cards: Array<Card>;
    constructor();
    /**
     * Draws a new card from the deck of possible cards!
     * @returns Card
     */
    drawCard(): Card;
}
