import { Hand } from "./Hand.js";
import { BlackjackEvents } from "../types/Events.js";
/**
 * The primary class for constructing blackjack games
 */
export declare class Blackjack {
    private deck;
    private events;
    dealerHand: Hand;
    playerHands: Array<Hand>;
    constructor();
    /**
     * Creates a new hand and pushes it to the array of hands.
     * @fires Blackjack#newHandCreated
     */
    createNewHand(bet?: number, identifier?: string): void;
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
    finalizeGame(): void;
    /**
     * Forces all active hands to stand.
     *
     * This method iterates over all player hands that are still active
     * and changes their status to "Stand". An event is then emitted with the list of hands
     * that were forced to stand.
     *
     * @fires Blackjack#stoodAll
     */
    standAll(): void;
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
    on(event: BlackjackEvents, listener: (...args: any[]) => void): void;
    /**
     * Removes all event listeners.
     *
     * This method is derived from the Node.js EventEmitter class.
     *
     * @param event - The name of the event to which the listener is registered.
     */
    removeAllListeners(event?: string): void;
}
