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

      let totalHandValue = this.calculateTotalHandValue(this.playerCards);

      if (
        totalHandValue.lowestPossibleTotal === 21 ||
        totalHandValue.highestPossibleTotal === 21
      ) {
        this.endGame();
        this.calculateWinner();
      }
    }
  }

  @action
  calculateTotalHandValue(cards) {
    let total = {
      lowestPossibleTotal: 0,
      highestPossibleTotal: 0,
    };

    for (let i = 0; i < cards.length; i++) {
      const cardValue = cards[i].value;

      if (cardValue === 1) {
        total.lowestPossibleTotal += cardValue;
        total.highestPossibleTotal += 11;
      } else {
        total.lowestPossibleTotal += cardValue;
        total.highestPossibleTotal += cardValue;
      }
    }

    return total;
  }

  @action
  drawPlayerCard() {
    this.playerCards = [...this.playerCards, this.dealCard()];
    const playersHandTotal = this.calculateTotalHandValue(this.playerCards);

    if (playersHandTotal.lowestPossibleTotal > 21) {
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
    const handValue = this.calculateTotalHandValue(this.dealerCards);

    if (handValue.highestPossibleTotal < 17) {
      this.dealersTurnInterval = setInterval(() => {
        this.drawDealerCard();
      }, 1000);
    } else {
      this.endGame();
      this.calculateWinner();
    }
  }

  drawDealerCard() {
    this.dealerCards = [...this.dealerCards, this.dealCard()];
    const dealersHandTotal = this.calculateTotalHandValue(this.dealerCards);

    if (dealersHandTotal.lowestPossibleTotal >= 17) {
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
      case playersHandSum.lowestPossibleTotal === 21 ||
        playersHandSum.highestPossibleTotal === 21:
        this.gameResultMessage = 'Black jack!, Player Wins!';
        break;
      case playersHandSum.highestPossibleTotal ===
        dealersHandSum.highestPossibleTotal:
        this.gameResultMessage = 'Push';
        break;
      case playersHandSum.highestPossibleTotal <= 21 &&
        playersHandSum.highestPossibleTotal >
          dealersHandSum.highestPossibleTotal:
        this.gameResultMessage = 'Player Wins!';
        break;
      case dealersHandSum.highestPossibleTotal <= 21 &&
        dealersHandSum.highestPossibleTotal >
          playersHandSum.highestPossibleTotal:
        this.gameResultMessage = 'Dealer Wins!';
        break;
      case dealersHandSum.lowestPossibleTotal > 21:
        this.gameResultMessage = 'Dealer Bust, Player Wins!';
        break;
      case playersHandSum.lowestPossibleTotal > 21:
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
