import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add orignal object to object array, from init', () => {
    let ret = service.addToRentQueue(1,1, 'two', 'three', 'four', 'five', 'six', 'seven');

    expect(ret).toEqual(true);
  })

  it('should reject duplicate object to object array', () => {
    let ret = service.addToRentQueue(1,1, 'two', 'three', 'four', 'five', 'six', 'seven');
    ret = service.addToRentQueue(1,1, 'two', 'three', 'four', 'five', 'six', 'seven');

    expect(ret).toEqual(false);
  })

  it('should accept two adds', () => {
    let ret1 = service.addToRentQueue(1,1, 'two', 'three', 'four', 'five', 'six', 'seven');
    let ret2 = service.addToRentQueue(0,2, 'three', 'four', 'five', 'six', 'seven', 'eight');

    expect(ret1 && ret2).toEqual(true);
  })

  it('should remove item', () => {
    service.addToRentQueue(1,1, 'two', 'three', 'four', 'five', 'six', 'seven');
    service.addToRentQueue(0,2, 'three', 'four', 'five', 'six', 'seven', 'eight');

    expect(service.removeFromRentQueue(1)).toEqual(true);
  })

  it('should not remove item', () => {
    service.addToRentQueue(1,1, 'two', 'three', 'four', 'five', 'six', 'seven');
    service.addToRentQueue(0,2, 'three', 'four', 'five', 'six', 'seven', 'eight');

    expect(service.removeFromRentQueue(2)).toEqual(false);
  })

  it('should try remove item from empty, failure', () => {

    expect(service.removeFromRentQueue(2)).toEqual(false);
  })

  it('should return an object with length 2',()=>{
    service.addToRentQueue(1,1, 'two', 'three', 'four', 'five', 'six', 'seven');
    service.addToRentQueue(0,2, 'three', 'four', 'five', 'six', 'seven', 'eight');
    //should make array now lenth 2

    let ret = service.getItemsInCart();

    expect(ret.length).toEqual(2);
  })

  it('should return a number array, check for index 0, expect 1', () =>{
    service.addToRentQueue(1,1, 'two', 'three', 'four', 'five', 'six', 'seven');
    service.addToRentQueue(0,2, 'three', 'four', 'five', 'six', 'seven', 'eight');

    let ret = service.getItemsInCartID();

    expect(ret[0]).toEqual(1);
  })

  it('add to cart, clear cart',()=>{
    service.addToRentQueue(1,1, 'two', 'three', 'four', 'five', 'six', 'seven');
    service.addToRentQueue(0,2, 'three', 'four', 'five', 'six', 'seven', 'eight');
    //should make array now lenth 2

    service.clearCart();

    let ret = service.getItemsInCart();

    expect(ret.length).toEqual(0);
  })
});
