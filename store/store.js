import { makeAutoObservable } from 'mobx';

class Store {
  totalAmount = 0;

  constructor() {
    makeAutoObservable(this);
  }

  calculateTotal(items) {
    // Calculation logic
    this.totalAmount = 100;/* calculated total */
  }
}

export default new Store();
