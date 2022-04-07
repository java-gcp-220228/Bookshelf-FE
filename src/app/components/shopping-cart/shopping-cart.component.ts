import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  template: '<div #myDiv>Some text</div>'
})
export class ShoppingCartComponent implements OnInit {

  constructor() { }
  texts : string[] = ['place', 'holder']
  el : any = window.document.getElementById('insert-books');
  seperator : any = document.createAttribute('div');

  makePurchase() {
    //send books to be added to a new rent table object
  }
  //@ViewChild('myDiv') myDiv: ElementRef;

  ngOnInit(): void {
    if(this.el != null){
      this.texts.forEach(function(text){
      })
        console.log("not null")
        this.seperator.innerText = this.texts[0];
        this.el.innerText.appendChild(this.seperator);
      
      
    } else {
      console.log('maybe null');
    }
    
  }

}
