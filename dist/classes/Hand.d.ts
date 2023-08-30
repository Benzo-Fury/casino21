import { Card } from "./Card.js";
import { Deck } from "./Deck.js";
import { HandStatus } from "../enums/HandStatus.js";
import { HandEvents } from "../types/Events.js";
export declare class Hand {
    deck: Deck;
    bet: number;
    identifier?: string | undefined;
    cards: Array<Card>;
    handValue: number;
    status: HandStatus;
    private events;
    /**
     * Initializes a hand and deals it 2 starting cards.
     * @fires Hand#newHand
     * @param deck The deck from which the cards are drawn.
     * @param bet The initial bet associated with this hand.
     * @param identifier A way to assign a ID or information to this hand.
     */
    constructor(deck: Deck, bet?: number, identifier?: string | undefined);
    /**
     * Draws a card from the Deck and adds it to the hand.
     * @fires Hand#bust/Hand#blackjack/Hand#changed
     * @throws {Error} if hand has stood or busted
     * @returns void
     */
    hit(): void;
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
    stand(forceValidation?: boolean): void;
    /**
     * Double downs the hand essentially just multiplying the bet by 2
     */
    doubleDown(): void;
    /**
     * Splits the hand into two hands.
     * @returns {Hand[]} - Returns an array of two new hands.
     * @throws {Error} - Throws an error if the hand cannot be split.
     */
    split(): Hand[];
    /**
     * Checks if the hand can be split.
     * @returns {boolean}
     */
    canSplit(): boolean;
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
    on(event: HandEvents, listener: (...args: any[]) => void): void;
    /**
     * Shorthand method to easily add cards.
     * @private
     */
    private addCard;
    /**
     * Validates the current hand, particularly the value of any aces.
     */
    private validate;
    /**
     * Calculates the total value of the hand.
     * @private
     */
    private calculateHandValue;
}
