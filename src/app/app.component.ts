/* Name: Gia Mien Le
   Date: November 21, 2022
   Project: Chat App
   Professor: Victor Norman
*/

import { Time } from '@angular/common';
import { NONE_TYPE } from '@angular/compiler';
import { Component } from '@angular/core';
import { addDoc, collection, collectionData, Firestore, Timestamp } from '@angular/fire/firestore';
import { orderBy, query } from '@firebase/firestore';
import { Observable } from 'rxjs';

// Defining the interface with relevant data variables
interface Item {
  userName: string,
  message: string,
  timestamp: Timestamp,
  color: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'HW10';

  // initializing variables to be used
  public message$: Observable<Item[]>;
  userName: string = " ";
  color: string = " ";
  message: string=" ";
  v_userName: string = " ";

  // class constructor
  // parameter: database db from Google firebase
  constructor(public db: Firestore) {
    const chatList = query(collection(db, 'cs336-chat' ), orderBy("timestamp", "asc"));     // importing data from the database in an ascending timely order
    this.message$ = collectionData(chatList) as Observable<Item[]>; // getting a list of variables from the database

    const l_userName = localStorage.getItem("userName");  // getting the variable userName from the local storage
    this.userName = l_userName ? l_userName: " "; // condition for this.userName to get l_userName from the local storage

    const l_color = localStorage.getItem("color"); // getting "color" from the local storage
    this.color = l_color ? l_color: "#000000"; // condition for this.color to get l_color from the local storage
  }

  // this function adds user input into the database
  async add() {
    const newDoc = await addDoc(collection(this.db, 'cs336-chat'), {
      userName: this.userName,
      message: this.message,
      timestamp: new Date(),
      color: this.color
    })
    this.message = " "; // this.message is an empty string to empty out the user input for the message box as they hit "Enter"
  }

  // this function adds the userName to the local storage
  setUserName() {
    localStorage.setItem('userName', this.userName);
  }

  // this function adds the color to the local storage
  setColor() {
    localStorage.setItem('color', this.color);
  }

}
