'use strict'

let addlaneID = 1;
let cardID = 1;

function addSection(){
    addlaneID++;
    let id = "addlane" + addlaneID;
    let newDiv = document.createElement("div");
    newDiv.setAttribute("id", id);
    newDiv.setAttribute("class", "newlane");
    document.querySelector(".container").appendChild(newDiv);

    
        var cardBtn = document.createElement("input");
        cardBtn.setAttribute("type", "button");
        cardBtn.setAttribute("value", "Add Card");
        cardBtn.setAttribute("id", "btnAddCard" + addlaneID)
        cardBtn.setAttribute("data-addlane-id", addlaneID);
        let newlane = document.querySelector("#" + id);
        newlane.appendChild(cardBtn);
        cardBtn.addEventListener("click", addCard);
  
}
