import { coinConstants } from "./constants";

export default class City {
  constructor(
    coinTypes,
    countryName,
    initCoinsCount = coinConstants.INIT_COINS
  ) {
    this.countryName = countryName;
    this.coinTypes = coinTypes;
    this.coins = new Array(coinTypes.length).fill(0);
    this.income = new Array(coinTypes.length).fill(0);
    this.neighbors = [];
    this.coins[this.coinTypes.indexOf(this.countryName)] = initCoinsCount;
  }

  isCompleted() {
    return this.coins.every((coin) => coin > 0);
  }

  shareCoins() {
    this.coins.forEach((coinAmount, index) => {
      const share = Math.floor(coinAmount * coinConstants.REPR_PORTION);
      this.neighbors.forEach((city) => {
        city.income[index] += share;
        this.coins[index] -= share;
      });
    });
  }

  updateCoinBalance() {
    for (let typeIdx = 0; typeIdx < this.coinTypes.length; typeIdx++) {
      this.coins[typeIdx] += this.income[typeIdx];
      this.income[typeIdx] = 0;
    }
  }
}
