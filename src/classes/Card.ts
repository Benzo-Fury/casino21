/**
 * This class represents a single card.
 */
export class Card {
  public value: number | "REQUIRES VALIDATION";
  public rank: string;
  public suit: string;

  /**
   * Constructs a brand-new card from the inherited deck
   */
  constructor(rank: string, suit: string) {
    this.rank = rank;
    this.suit = suit;
    this.value = this.calculateValue();
  }

  private calculateValue(): number | "REQUIRES VALIDATION" {
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
