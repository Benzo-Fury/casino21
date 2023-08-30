export declare class BetManager {
    private bets;
    constructor();
    /**
     * Place a bet for a specific user.
     * @param userId - The ID of the user.
     * @param amount - The bet amount.
     */
    placeBet(userId: string, amount: number): void;
    /**
     * Retrieve the bet for a specific user.
     * @param userId - The ID of the user.
     * @returns The bet amount or null if no bet found.
     */
    getBet(userId: string): number | null;
    /**
     * Remove the bet for a specific user.
     * @param userId - The ID of the user.
     */
    removeBet(userId: string): void;
    /**
     * Double the current bet for a user.
     * Useful for blackjack actions like "double down".
     * @param userId - The ID of the user.
     */
    doubleBet(userId: string): void;
    /**
     * Clear all bets.
     */
    clearBets(): void;
}
