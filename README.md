# BlackJack

This is a game of blackjack built using the ember js framework. All the steps for setting and running the app are found below, alongside the rules for playing blackjack.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://cli.emberjs.com/release/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd blackjack`
* `npm install`

## Running the game

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

* * *

## Playing Blackjack

### Oveview

The aim as a player is to beat the dealer. 

You achieve this by drawing cards as close to the value of 21 as possible. If you exceed the value of 21 you automatically 'bust'. This applies to the dealer also. If the player's cards or 'hand' total more than the dealer's they are declared the winner and vice versa.


### Starting the game

At the start of the game the player is dealt two face up cards and the dealer is dealt two face down cards to obscure their value from the player.

Once the cards are dealt it is now the player's turn.

### Player's turn

The player can hearby choose to draw another card by requesting to 'hit' or they can stick with the cards they have and choose to 'stand'.

The player can continue requesting more cards to get as close to the value of 21 as possible. If the player's hand total value exceeds 21 they are declared 'bust' and the game ends with the dealer declared the winner. 

Choosing to stand ends the players turn and begins the dealer's turn. 

### Dealer's turn

The aim of the dealer during their turn is to reach the value of above 17 but also below 22. Like the player if the value of the dealer's hand exceeds 21 then they will bust and the player will be declared the winner.

At the start of the dealer's turn, their two cards dealt at the start of the game will be revealed. If the value of these cards is 17 or above the game will automatically end and a winner will be calculated. If the dealer's hand is greater than the player's, the dealer wins else the player is declared the winner. 

However if the dealer's hand is less than 17 the dealer will continue drawing cards until they have reached the value of at least 17. If this doesn't result in the dealer busting, the hand's of the dealer and the player will be compared to decide a winner.

### Important things to note

- The value of an ace can take the value of 1 or 11. This value is at the discretion of the player unless classing an ace in a player's hand causes the total hand value to exceed the value of 21. 


    e.g.

    A hand consisting of an ace and a 5 could take the value of 6 or 16.
    A hand consisting of ace, a king and a 7 however would only take the value of 18 as classing the ace in this hand as 11 would result in a hand total of 28 which would be a bust.

- If the initial two cards a player is dealt total 21 then they have hit 'Blackjack' and are automatically declared the winner and the game ends

• • •

## Acknowledgments

Vector Playing Cards 3.2
https://totalnonsense.com/open-source-vector-playing-cards/
Copyright 2011,2021 – Chris Aguilar – conjurenation@gmail.com
Licensed under: LGPL 3.0 - https://www.gnu.org/licenses/lgpl-3.0.html