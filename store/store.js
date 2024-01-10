import { makeAutoObservable,autorun } from 'mobx';
import storeConfig  from '../src/app/storeConfig.json'

class MyStore {
  items = [];
  total = 0;
  vatRate = 1 + (storeConfig.vatPercent / 100); 
  constructor() {
    makeAutoObservable(this);
    autorun(() => this.calculateTotal());
  }

  addItem(item) {
    this.items.push(item);
    this.calculateTotal();
  }
  removeItem() {
    this.items.pop(); 
    this.calculateTotal();
  }


  calculateTotal() {
    const subtotal = this.items.reduce((sum, item) => sum + item.price, 0);
    this.total = subtotal * this.vatRate;
    console.log('autorun')
  }
}
//add here a autorun
const store = new MyStore();
export default store;
