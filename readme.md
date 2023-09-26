# Casino 21
This is a robust, TypeScript-based game engine specifically designed to handle the backend logic for Blackjack games. Whether you are building a game, a console application, or even integrating it into chatbots, this library provides the essential functionalities you need.

## Features
- Object-oriented design for easy management of decks, hands, and game states.
- Extensible and event-driven architecture for seamless integration.
- Detailed TypeDoc annotations for better code understanding.
- Handles multiple Blackjack games simultaneously.

## Installation
You can install the library via npm:

```sh
npm install casino21
```

## Quick Start
First, import the library:
```js
import blackjack from 'casino21';
```

Then you can initialize the game and add some hands (keep in mind that the dealer hand will automatically be created)
```js
const game = new blackjack();

game.createNewHand()

//Optionally you can assign a bet to the hand constructor so that you can use double down and split!
game.createNewHand(10);

//On top of that you can assign a string identifier to the hand so that you can know whows hand is currently being used
game.createNewHand(10, 'A string identifier here!');
```
Now we can listen for events happening!

The first event that is good to listen for is the dealer hand busting!
```js
game.dealerHand.on('bust', () => {
    console.log('Dealer hand has busted and everyone else who has not yet busted wins!');
})
```
Now we can listen for 
```js
import { HandStatus } from 'casino21'

game.on('end', (hands) => {
    const {winningHands, losingHands, tiedHands} = hands;
    
    //From this we can determaine what exactly happended to the hands
    if(winningHands[0].status === HandStatus.Stand) {
        console.log(`${winningHands[0].identifier || 'winningHand1'} won the game because the `)
    }
    //If a hand exists on the winningHands 
})
```
