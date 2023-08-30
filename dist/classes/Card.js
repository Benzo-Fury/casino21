/**
 * This class represents a single card.
 */
export class Card {
    value;
    rank;
    suit;
    /**
     * Constructs a brand-new card from the inherited deck
     */
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
        this.value = this.calculateValue();
    }
    calculateValue() {
        const rank = this.rank;
        switch (rank) {
            case "jack":
            case "queen":
            case "king":
                return 10;
            case "ace":
                return "REQUIRES VALIDATION";
            default:
                return parseInt(rank) || 10;
        }
    }
}
