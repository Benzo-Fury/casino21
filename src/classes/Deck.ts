import { Card } from "./Card.js";
import { rank, suits } from "../utils/constants.js";

/**
 * This class represents an entire Deck of cards (52 cards).
 * It is simply a manager, giving new cards when requested!
 */
export class Deck {
  public cards: Array<Card> = [];

  constructor() {
    for (let suit of suits) {
      for (let rankName of rank) {
        this.cards.push(new Card(rankName, suit));
      }
    }
  }

  /**
   * Draws a new card from the deck of possible cards!
   * @returns Card
   */

  drawCard(): Card {
    if (this.cards.length === 0) {
      throw new Error("No cards left in the deck!");
    }

    const randomIndex = Math.floor(Math.random() * this.cards.length);
    const drawnCard = this.cards[randomIndex];
    this.cards.splice(randomIndex, 1);
    return drawnCard;
  }
}
