export class BetManager {
    bets;
    constructor() {
        this.bets = new Map();
    }
    /**
     * Place a bet for a specific user.
     * @param userId - The ID of the user.
     * @param amount - The bet amount.
     */
    placeBet(userId, amount) {
        if (amount <= 0) {
            throw new Error("Bet amount must be positive.");
        }
        this.bets.set(userId, amount);
    }
    /**
     * Retrieve the bet for a specific user.
     * @param userId - The ID of the user.
     * @returns The bet amount or null if no bet found.
     */
    getBet(userId) {
        return this.bets.get(userId) || null;
    }
    /**
     * Remove the bet for a specific user.
     * @param userId - The ID of the user.
     */
    removeBet(userId) {
        this.bets.delete(userId);
    }
    /**
     * Double the current bet for a user.
     * Useful for blackjack actions like "double down".
     * @param userId - The ID of the user.
     */
    doubleBet(userId) {
        const currentBet = this.getBet(userId);
        if (currentBet) {
            this.bets.set(userId, currentBet * 2);
        }
        else {
            throw new Error("No existing bet found for the user.");
        }
    }
    /**
     * Clear all bets.
     */
    clearBets() {
        this.bets.clear();
    }
}
