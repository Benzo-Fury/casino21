import { HandStatus } from "../enums/HandStatus.js";
import { EventEmitter } from "events";
export class Hand {
    deck;
    bet;
    identifier;
    cards = [];
    handValue = 0;
    status = HandStatus.Active;
    playCount = 0;
    events = new EventEmitter();
    /**
     * Initializes a hand and deals it 2 starting cards.
     * @param deck The deck from which the cards are drawn.
     * @param bet The initial bet associated with this hand.
     * @param identifier A way to assign a ID or information to this hand.
     */
    constructor(deck, bet, identifier) {
        this.deck = deck;
        this.bet = bet;
        this.identifier = identifier;
        // Deal initial two cards
        this.addCard();
        this.addCard();
        // Check and validate for aces
        if (this.cards.some((card) => card.value === "REQUIRES VALIDATION")) {
            this.validate();
        }
    }
    /**
     * Draws a card from the Deck and adds it to the hand.
     * @fires Hand#bust/Hand#blackjack/Hand#changed
     * @throws {Error} if hand has stood or busted
     * @returns void
     */
    hit() {
        if (this.status !== HandStatus.Active) {
            throw new Error("Hand is no longer active.");
        }
        this.addCard();
        this.validate();
        this.playCount += 1;
        if (this.handValue > 21) {
            this.status = HandStatus.Bust;
            this.events.emit("bust");
        }
        else if (this.handValue === 21) {
            this.status = HandStatus.Blackjack;
            this.events.emit("blackjack");
        }
        else {
            //this.handStatus = HandStatus.Active; (Hand Status is already active)
            this.events.emit("changed");
        }
    }
    /**
     * Marks this hand as 'stood', signaling the end of its active turn in a Blackjack game.
     * Once a hand is set to 'stand', no further actions should be taken on it.
     * @param forceValidation - Optional. If set to true, triggers an additional validation
     *                          pass to ensure that all aces in the hand have the correct value.
     *                          Defaults to false.
     * @example
     * hand.stand();             // Stand without forcing validation.
     * hand.stand(true);         // Stand and force validation.
     *
     */
    stand(forceValidation = false) {
        if (this.status !== HandStatus.Active) {
            throw new Error("Hand cannot currently stand!");
        }
        this.status = HandStatus.Stand;
        if (forceValidation) {
            this.validate();
        }
    }
    /**
     * Double downs the hand essentially just multiplying the bet by 2.
     * @throws {Error} if no bet amount was provided in the constructor
     */
    doubleDown() {
        if (!this.bet) {
            throw new Error("Double down and split are not available when no bet has been provided");
        }
        this.bet *= 2;
        this.hit();
    }
    /**
     * Splits the hand into two hands.
     * @returns {Hand[]} - Returns an array of two new hands.
     * @throws {Error} - Throws an error if the hand cannot be split. (Use `hand.canSplit()` to avoid)
     */
    split() {
        if (!this.bet) {
            throw new Error("Double down and split are not available when no bet has been provided");
        }
        if (!this.canSplit()) {
            throw new Error("Hand cannot be split");
        }
        const hand1 = new Hand(this.deck);
        const hand2 = new Hand(this.deck);
        // Assign the cards to the new hands
        hand1.cards = [this.cards[0], this.deck.drawCard()];
        hand2.cards = [this.cards[1], this.deck.drawCard()];
        // Assign the bets
        hand1.bet = this.bet;
        hand2.bet = this.bet;
        return [hand1, hand2];
    }
    /**
     * Checks if the hand can be split.
     * @returns {boolean}
     */
    canSplit() {
        if (this.cards.length !== 2)
            return false;
        const card1Value = this.cards[0].value;
        const card2Value = this.cards[1].value;
        // Make sure the values are not "REQUIRES VALIDATION"
        if (card1Value === "REQUIRES VALIDATION" ||
            card2Value === "REQUIRES VALIDATION") {
            this.validate();
        }
        return this.cards[0].value === this.cards[1].value;
    }
    /**
     * Checks if the hand can double down.
     * @returns {boolean}
     */
    canDoubleDown() {
        return this.playCount === 0;
    }
    /**
     * Checks if the hand can hit.
     * @returns {boolean}
     */
    canHit() {
        return this.status === HandStatus.Active;
    }
    /**
     * Checks if the hand can stand.
     * @returns {boolean}
     */
    canStand() {
        return this.status === HandStatus.Active;
    }
    /**
     * Registers an event listener callback to a specified event.
     *
     * This method is derived from the Node.js EventEmitter and allows the caller
     * to react to specific events emitted by this class.
     *
     * @param event - The name of the event to which the listener is registered.
     * @param listener - The callback function to be invoked when the event is emitted.
     * @example
     * instance.on('eventName', (arg1, arg2) => {
     *   // handle event
     * });
     */
    on(event, listener) {
        this.events.on(event, listener);
    }
    /**
     * Shorthand method to easily add cards.
     * @private
     */
    addCard() {
        const card = this.deck.drawCard();
        this.cards.push(card);
        this.validate();
    }
    /**
     * Validates the current hand, particularly the value of any aces.
     * @private
     */
    validate() {
        this.handValue = this.calculateHandValue();
        this.cards
            .filter((card) => card.value === "REQUIRES VALIDATION")
            .forEach((ace) => {
            // If counting Ace as 11 won't bust the hand, set its value to 11
            if (this.handValue + 11 <= 21) {
                ace.value = 11;
                this.handValue += 11;
            }
            else {
                ace.value = 1;
                this.handValue += 1;
            }
        });
    }
    /**
     * Calculates the total value of the hand.
     * @private
     */
    calculateHandValue() {
        return this.cards.reduce((total, card) => total + (card.value !== "REQUIRES VALIDATION" ? card.value : 0), 0);
    }
}
