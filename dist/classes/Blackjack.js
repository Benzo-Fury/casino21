import { EventEmitter } from "events";
import { Hand } from "./Hand.js";
import { Deck } from "./Deck.js";
import { HandStatus } from "../enums/HandStatus.js";
/**
 * The primary class for constructing blackjack games
 */
export class Blackjack {
    deck = new Deck();
    events = new EventEmitter();
    dealerHand = new Hand(this.deck);
    playerHands = [];
    constructor() {
        this.events.setMaxListeners(0);
    }
    /**
     * Creates a new hand and pushes it to the array of hands.
     * @fires Blackjack#newHandCreated
     */
    createNewHand(bet, identifier) {
        //creating and pushing hand
        const hand = new Hand(this.deck, bet, identifier);
        this.playerHands.push(hand);
        //emitting hand created event
        this.events.emit("newHandCreated", hand);
    }
    /**
     * Ends all players turns and starts the dealers turn ending the session!
     *
     * This method:
     * - Throws an error if any player hands have not chosen to stand.
     * - Instructs the dealer to continue drawing cards until their hand totals at least 17.
     * - Determines the winners based on the final hand values.
     *
     * @throws {Error} If any player hand hasn't stood before finalizing the game.
     * @fires Blackjack#end
     */
    finalizeGame() {
        if (this.playerHands.some((hand) => hand.status === HandStatus.Active)) {
            throw new Error("Active hands still exist!");
        }
        while (this.dealerHand.handValue < 17) {
            this.dealerHand.hit();
        }
        if (this.dealerHand.status === HandStatus.Active) {
            this.dealerHand.stand();
        }
        const winningHands = [];
        const losingHands = [];
        const tiedHands = [];
        //calculating winners based off of value instead of status
        for (const hand of this.playerHands) {
            if (hand.handValue > 21 ||
                (hand.handValue < this.dealerHand.handValue &&
                    this.dealerHand.handValue <= 21)) {
                losingHands.push(hand);
            }
            else if (hand.handValue === this.dealerHand.handValue) {
                tiedHands.push(hand);
            }
            else {
                winningHands.push(hand);
            }
        }
        this.events.emit("end", {
            winningHands,
            losingHands,
            tiedHands,
        });
    }
    /**
     * Forces all active hands to stand.
     *
     * This method iterates over all player hands that are still active
     * and changes their status to "Stand". An event is then emitted with the list of hands
     * that were forced to stand.
     *
     * @fires Blackjack#stoodAll
     */
    standAll() {
        const stoodHands = [];
        for (const hand of this.playerHands) {
            if (hand.status === HandStatus.Active) {
                stoodHands.push(hand);
                hand.stand();
            }
        }
        this.events.emit("stoodAll", stoodHands);
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
     * Removes all event listeners.
     *
     * This method is derived from the Node.js EventEmitter class.
     *
     * @param event - The name of the event to which the listener is registered.
     */
    removeAllListeners(event) {
        this.events.removeAllListeners(event);
    }
}
