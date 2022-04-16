import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
//import { title } from 'process';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = Array<{id: number; isbn: number, title: string, author : string
  ,publisher: string, publishDate: string, genre: string, status: string, }>();
  ids : number[]= [];
  constructor() { }

  addToRentQueue(id: number, isbn: number, title: string, author: string, publisher: string, 
    publishDate: string, genre: string, status: string){
      let book = {id: id,  isbn: isbn, title: title , author: author, publisher: publisher,
         publishDate: publishDate, genre: genre, status: status, };
    //console.log(book);
    let matchFound = false;
    this.cart.forEach(function(value){
      if(value.id === book.id){
        
        matchFound = true;
      }
    })
    if(matchFound === false){
      this.cart.push(book);
      
      //console.log(this.cart)
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

  
  getItemsInCartID(){
    console.log("does it error here");
    for(let index in this.cart){
      this.ids[index] = this.cart[index].id;
    }
    console.log(this.ids);
    
    return this.ids;
  }

  clearCart(){
    this.cart = [];
    this.ids = [];
  }
}
