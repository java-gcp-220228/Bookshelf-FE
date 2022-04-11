import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
//import { title } from 'process';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = Array<{id: number; isbn: number, title: string
  ,publisher: string, publish_date: string, genre: string, status: string, }>();

  constructor() { }

  addToRentQueue(id: number, isbn: number, title: string, author: string, publisher: string, 
    publish_date: string, genre: string, status: string){
      let book = {id: id,  isbn: isbn, title: title ,publisher: publisher,
         publish_date: publish_date, genre: genre, status: status, };
    //console.log(book);
    let matchFound = false;
    this.cart.forEach(function(value){
      if(value.id === book.id){
        
        matchFound = true;
      } else {
        console.log("no match")
      }
    })
    if(matchFound === false){
      this.cart.push(book);
      console.log(this.cart)
      return true;
    } else {
      return false;
      console.log(this.cart)
    }
  }

  removeFromRentQueue(id:number){
    let matchFound = false;
    this.cart.forEach((value,index) =>{
      if(value.id === id){
        matchFound = true;
        this.cart.splice(index,1);
      }
    })
    return matchFound;
  }

  getItemsInCart(){
    return this.cart;
  }
}
