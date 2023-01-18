import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class BlackjackgameComponent extends Component {
  suits = ['club', 'heart', 'spade', 'diamond'];

  @tracked dealerCards = [];
  @tracked playerCards = [];
  @tracked dealersTurn = false;
  @tracked dealersTurnInterval;
  @tracked playersTurn = false;
  @tracked gameOver = false;
  @tracked gameResultMessage = '';

  @action
  dealCard() {
    const cardClub = this.suits[Math.floor(Math.random() * this.suits.length)];
    const cardNumber = Math.floor(Math.random() * 13) + 1;
    const imgUri = `assets/images/cards/${cardClub}${cardNumber}.svg`;
    const cardValue = cardNumber > 10 ? 10 : cardNumber;

    return {
      club: cardClub,
      number: cardNumber,
      img_uri: imgUri,
      value: cardValue,
    };
  }

  @action
  resetGame() {
    this.playersTurn = true;
    this.dealersTurn = false;
    this.dealerCards = [];
    this.playerCards = [];
    this.gameOver = false;
  }

  @action
  startGame() {
    this.resetGame();

    for (let i = 0; i <= 1; i++) {
      this.playerCards.push(this.dealCard());
    }

    for (let i = 0; i <= 1; i++) {
      this.dealerCards.push(this.dealCard());

      if (this.calculateTotalHandValue(this.playerCards) === 21) {
        this.gameOver = true;
        this.gameResultMessage = 'Black jack!, Player Wins!';
      }
    }
  }

  @action
  calculateTotalHandValue(cards) {
    let total = 0;

    for (let i = 0; i < cards.length; i++) {
      total += cards[i].value;
    }
    return total;
  }

  @action
  drawPlayerCard() {
    this.playerCards = [...this.playerCards, this.dealCard()];
    const playersHandTotal = this.calculateTotalHandValue(this.playerCards);

    if (playersHandTotal > 21) {
      this.endGame();
      this.calculateWinner();
    }
  }

  @action
  endPlayersTurn() {
    this.playersTurn = false;
    this.dealersTurn = true;
    this.startDealersTurn();
  }

  startDealersTurn() {
    this.dealersTurnInterval = setInterval(() => {
      this.drawDealerCard();
    }, 1000);
  }

  drawDealerCard() {
    this.dealerCards = [...this.dealerCards, this.dealCard()];
    const dealersHandTotal = this.calculateTotalHandValue(this.dealerCards);

    if (dealersHandTotal >= 17) {
      this.playersTurn = false;
      this.endGame();
      this.calculateWinner();
    }
  }

  @action
  calculateWinner() {
    let playersHandSum = this.calculateTotalHandValue(this.playerCards);
    let dealersHandSum = this.calculateTotalHandValue(this.dealerCards);

    switch (true) {
      case playersHandSum <= 21 && playersHandSum > dealersHandSum:
        this.gameResultMessage = 'Player Wins!';
        break;
      case dealersHandSum <= 21 && dealersHandSum > playersHandSum:
        this.gameResultMessage = 'Dealer Wins!';
        break;
      case dealersHandSum > 21:
        this.gameResultMessage = 'Dealer Bust, Player Wins!';
        break;
      case playersHandSum > 21:
        this.gameResultMessage = 'Player Bust, Dealer Wins!';
        break;
      default:
        this.gameResultMessage = 'Push';
        break;
    }
  }

  @action
  endGame() {
    clearInterval(this.dealersTurnInterval);
    this.gameOver = true;
  }
}
