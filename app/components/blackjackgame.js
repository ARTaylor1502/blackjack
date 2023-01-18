import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class BlackjackgameComponent extends Component {
  suits = ['club', 'heart', 'spade', 'diamond'];
  dealersTurn = false;

  @tracked dealerCards = [];
  @tracked playerCards = [];

  @action
  dealCard() {
    const cardClub = this.suits[Math.floor(Math.random() * this.suits.length)];
    const cardValue = Math.floor(Math.random() * 13) + 1;
    const imgUri = `assets/images/cards/${cardClub}${cardValue}.svg`;

    return {
      club: cardClub,
      value: cardValue,
      img_uri: imgUri,
    };
  }

  @action
  resetGame() {
    this.dealersTurn = false;
    this.dealerCards = [];
    this.playerCards = [];
  }

  @action
  startGame() {
    this.resetGame();

    for (let i = 0; i <= 1; i++) {
      this.playerCards.push(this.dealCard());
    }

    for (let i = 0; i <= 1; i++) {
      this.dealerCards.push(this.dealCard());
    }
  }
}
