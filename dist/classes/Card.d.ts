/**
 * This class represents a single card.
 */
export declare class Card {
    value: number | "REQUIRES VALIDATION";
    rank: string;
    suit: string;
    /**
     * Constructs a brand-new card from the inherited deck
     */
    constructor(rank: string, suit: string);
    private calculateValue;
}
