import { coinConstants } from "./constants";

export default class City {
  constructor(
    coinTypes,
    countryName,
    initCoinsCount = coinConstants.INIT_COINS,
    reprPortion = coinConstants.REPR_PORTION
  ) {
    this.coinTypes = coinTypes;
    this.countryName = countryName;
    this.neighbors = [];
    this.coins = new Array(coinTypes.length).fill(0);
    this.cache = new Array(coinTypes.length).fill(0);

    const countryIndex = this.coinTypes.indexOf(this.countryName);

    this.coins[countryIndex] = initCoinsCount;
    this.reprPortion = reprPortion;
  }

  shareCoins() {
    this.coins.forEach((coinAmount, index) => {
      const share = Math.floor(coinAmount * this.reprPortion);
      this.neighbors.forEach((city) => {
        city.cache[index] += share;
        this.coins[index] -= share;
      });
    });
  }

  isCompleted() {
    return this.coins.every((coin) => coin > 0);
  }

  updateCoinBalance() {
    this.coinTypes.forEach((type, typeIndex) => {
      this.coins[typeIndex] += this.cache[typeIndex];
      this.cache[typeIndex] = 0;
    });
  }
}
