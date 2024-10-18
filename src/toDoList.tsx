
import React, { ChangeEventHandler } from "react";
import "./App.css";
import { useState } from "react";
import { GroceryItem } from "./types";
import { dummyGroceryList } from "./constant";
import { useParams } from "react-router-dom";

export function ToDoList() {
 const { name } = useParams();
 const [numRemainingItems, setNumRemainingItems] = useState(0);
 const [items, setItems] = useState(dummyGroceryList);

 //let [items, setItems] = useState(dummyGroceryList); //possible error

 function handleCheckboxClick(e: React.ChangeEvent<HTMLInputElement>) {
   const checkbox: HTMLInputElement = e.target as HTMLInputElement;

   const itemName = checkbox.name;

   const itemIndex = items.findIndex((item) => item.name === itemName);
   const updatedItems = [...items];

   updatedItems[itemIndex] = {
    ...updatedItems[itemIndex],
    isPurchased: checkbox.checked,
  };

  setItems(updatedItems);




   //items[itemIndex] = { name: itemName, isPurchased: checkbox.checked }; //possible error
  //  updatedItems[itemIndex] = { ...updatedItems[itemIndex], isPurchased: checkbox.checked };

  const uncheckedItems = items.filter((item) => !item.isPurchased);
  //const checkedItems = items.filter((item) => item.isPurchased);
  const checkedItemsCount = updatedItems.filter((item) => item.isPurchased).length;

  //const newItems = uncheckedItems.concat(checkedItemsCount);
  setNumRemainingItems(checkedItemsCount);


  //setItems(newItems);

   const diff = checkbox.checked ? 1 : -1;

   setNumRemainingItems(numRemainingItems + diff);
 }


 return (
   <div className="App">
     <div className="App-body">
       Items bought: {numRemainingItems}
        <h1>{name}'s To Do List</h1>
       <form action=".">
         {items.map((item) => ListItem(item, handleCheckboxClick))}
       </form>
     </div>
   </div>
 );
}

function ListItem(item: GroceryItem, changeHandler: ChangeEventHandler) {
 return (
   <div>
    
     <input
       type="checkbox"
       onChange={changeHandler}
       checked={item.isPurchased}
       name={item.name}
       
     />
     {item.name}
   </div>
 );
}
