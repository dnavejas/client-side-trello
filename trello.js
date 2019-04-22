'use strict'

let addlaneID = 1;

function addLane(){

    let newDiv = document.createElement("div");
    newDiv.setAttribute("id", "addlane" + addlaneID);
    newDiv.setAttribute("class", "newlane");
    document.querySelector(".container").appendChild(newDiv);
}
