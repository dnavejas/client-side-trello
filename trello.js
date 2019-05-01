'use strict'
let swimlaneID = 0; 
let cardID = 0; 

function addList() {
	swimlaneID++;

	var id = "swimlane" + swimlaneID;

	var container = document.querySelector(".container");
	//create a swimlane
	var swimlane = document.createElement("DIV");
	//set id attribute
	swimlane.setAttribute("id", id);
	swimlane.setAttribute("data-swimlane-id", swimlaneID);
	//set the class
	swimlane.setAttribute("class", "swimlane");

	//add to the container
	container.appendChild(swimlane);

	//create title for each list
	var listTitle = document.createElement("input");
	listTitle.setAttribute("id", "title-value" + swimlaneID);
	listTitle.setAttribute("placeholder", "Enter Title Here");
	swimlane.appendChild(listTitle);
	
	//create "submit" button
	var submitbtn = document.createElement("input");
	var br = document.createElement("br"); 
	submitbtn.setAttribute("type", "button");
	submitbtn.setAttribute("id", "title-btn" + id);
	submitbtn.setAttribute("value", "submit");
	submitbtn.addEventListener("click", setListTitle)
	// submitbtn.setAttribute("onclick", "setListTitle()");
	swimlane.appendChild(submitbtn);
	swimlane.appendChild(br);
	
	
	//create a "move swimlane left" button
	var btnMoveSwimlaneLeft = document.createElement("INPUT");
	btnMoveSwimlaneLeft.setAttribute("type", "button");
	btnMoveSwimlaneLeft.setAttribute("value", "◀️");
	btnMoveSwimlaneLeft.setAttribute("data-swimlane-id", swimlaneID);
	btnMoveSwimlaneLeft.setAttribute("data-direction", "left");
	btnMoveSwimlaneLeft.addEventListener("click", moveSwimlane);
	swimlane.appendChild(btnMoveSwimlaneLeft);

	//create a "add card" button
	var btnAddCard = document.createElement("INPUT");
	btnAddCard.setAttribute("type", "button");
	btnAddCard.setAttribute("value", "Add Card");
	btnAddCard.setAttribute("id", "btnAddCard" + swimlaneID);
	btnAddCard.setAttribute("data-swimlane-id", swimlaneID);
	btnAddCard.addEventListener("click", addCard);
	swimlane.appendChild(btnAddCard);

	//create a "delete swimlane" button
	var btnDelSwimlane = document.createElement("INPUT");
	btnDelSwimlane.setAttribute("type", "button");
	btnDelSwimlane.setAttribute("value", "Delete Lane");
	btnDelSwimlane.setAttribute("id", "btnDel" + swimlaneID);
	btnDelSwimlane.setAttribute("data-swimlane-id", swimlaneID);
	btnDelSwimlane.addEventListener("click", deleteSwimlane);
	swimlane.appendChild(btnDelSwimlane);

	//create a "move swimlane right" button
	var btnMoveSwimlaneRight = document.createElement("INPUT");
	btnMoveSwimlaneRight.setAttribute("type", "button");
	btnMoveSwimlaneRight.setAttribute("value", "▶️");
	btnMoveSwimlaneRight.setAttribute("data-swimlane-id", swimlaneID);
	btnMoveSwimlaneRight.setAttribute("data-direction", "right");
	btnMoveSwimlaneRight.addEventListener("click", moveSwimlane);
	swimlane.appendChild(btnMoveSwimlaneRight);
}
function deleteSwimlane() {
	let slid = this.dataset.swimlaneId;

	let container = document.querySelector(".container");
	let swimlane = document.getElementById("swimlane" + slid);

	container.removeChild(swimlane);
}
function addCard() {
	cardID++;

	//get the swimlane id from the button that was clicked
	let slid = this.dataset.swimlaneId; 

	var txtTitle = prompt("Name your card:");
	var txtDescription = prompt("Description of your task:");

	//	add a name to the card
	//	add a description to the card

	var card = document.createElement("DIV");
	card.setAttribute("id", "card" + cardID); 
	card.setAttribute("class", "card");
	card.setAttribute("data-swimlane-id", slid);

	var cardButtons = document.createElement("div");
	cardButtons.setAttribute("class", "card-buttons");

	var btnMoveLeft = document.createElement("input");
	btnMoveLeft.setAttribute("id", "btnMoveLeft" + cardID);
	btnMoveLeft.setAttribute("type", "button");
	btnMoveLeft.setAttribute("value", "◀️");
	btnMoveLeft.setAttribute("data-move-direction","left");
	btnMoveLeft.setAttribute("data-card-id", cardID);
	btnMoveLeft.addEventListener("click", moveCard);
	cardButtons.appendChild(btnMoveLeft);

	var btnDelete = document.createElement("input");
	btnDelete.setAttribute("id", "btnDel" + cardID);
	btnDelete.setAttribute("type", "button");
	btnDelete.setAttribute("value", "Remove");
	btnDelete.setAttribute("data-card-id", cardID);
	btnDelete.addEventListener("click", deleteCard);
	cardButtons.appendChild(btnDelete);

	var btnMoveRight = document.createElement("input");
	btnMoveRight.setAttribute("id", "btnMoveRight" + cardID);
	btnMoveRight.setAttribute("type", "button");
	btnMoveRight.setAttribute("value", "▶️");
	btnMoveRight.setAttribute("data-move-direction","right");
	btnMoveRight.setAttribute("data-card-id", cardID);
	btnMoveRight.addEventListener("click", moveCard);
	cardButtons.appendChild(btnMoveRight);

	card.appendChild(cardButtons);

	var title = document.createElement("h3");
	title.innerHTML = txtTitle;
	card.appendChild(title);

	var desc = document.createElement("p");
	desc.innerHTML = txtDescription;
	card.appendChild(desc);

	let swimlane = document.querySelector("#swimlane" + slid);
	swimlane.appendChild(card);
}
function deleteCard() {
	let slid = this.parentNode.parentNode.dataset.swimlaneId; 
	let cid = this.dataset.cardId;

	let swimlane = document.querySelector("#swimlane" + slid);
	let card = document.querySelector("#card" + cid);

	swimlane.removeChild(card);
}
function moveSwimlane() {
	let slid = this.dataset.swimlaneId;
	let swimlane = document.querySelector("#swimlane" + slid);
	let container = document.querySelector(".container");
	let previous = document.querySelector("#swimlane" + slid).previousSibling;
	let next = document.querySelector("#swimlane" + slid).nextSibling;

	let pidx = Array.prototype.indexOf.call(container.children, previous);
	let nidx = Array.prototype.indexOf.call(container.children, next);
	let cidx = Array.prototype.indexOf.call(container.children, swimlane);

	console.log(this.dataset.direction);
	console.log(swimlane);

	if(this.dataset.direction == "left") {
		// list.insertBefore(newItem, list.childNodes[0]);
		container.insertBefore(swimlane, container.childNodes[pidx]);
	}
	else if (this.dataset.direction == "right") {
		container.insertBefore(swimlane, container.childNodes[++nidx]);
	}
}
function moveCard() {
	let slid = this.parentNode.parentNode.dataset.swimlaneId;
	let cid = this.dataset.cardId;

	let card = document.querySelector("#card" + cid);

	let leftSlid;
	let rightSlid;
	let left;
	let right;

	//try to get left swimlane data, may not exist
	try {
		left = document.querySelector("#swimlane" + slid).previousSibling;
		leftSlid = left.dataset.swimlaneId;
	}
	catch (e) {
		console.error(e);
	}

	//try to get right swimlane data, may not exist
	try {
		right = document.querySelector("#swimlane" + slid).nextSibling;
		rightSlid = right.dataset.swimlaneId;
	}
	catch (e) {
		console.error(e);
	}

	let direction = this.dataset.moveDirection;

	if(left != null && direction == "left") {
		left.appendChild(card);
		card.dataset.swimlaneId = leftSlid;
	}
	else if(right != null && direction == "right") {
		right.appendChild(card);
		card.dataset.swimlaneId = rightSlid;
	}
}
function setListTitle(){
	let titleBtn = this;
	let swimlane = this.parentElement; // get the first parent

	var title = swimlane.firstChild;
	var titleTxt = title.value;
	var setTitle = document.createElement("h2");
	setTitle.setAttribute("class", "list-title");
	setTitle.innerHTML = titleTxt;

	var editBtn = document.createElement("input");
	editBtn.setAttribute("type", "button");
	editBtn.setAttribute("value", "Edit This Title");
	editBtn.setAttribute("onclick", "editTitle(event)");	

	titleBtn.innerHTML = "<br>";

	swimlane.insertBefore(setTitle, titleBtn);
	swimlane.replaceChild(editBtn, titleBtn);

	title.parentNode.removeChild(title);
}
function editTitle(e){
	const editButton = e.target;
	const swimlane = editButton.parentNode

	const swimlaneTitle = swimlane.firstChild;

	//create title for each list
	var listTitle = document.createElement("input");
	listTitle.setAttribute("class", "list-title");
	listTitle.setAttribute("id", "title-value");
	listTitle.setAttribute("value", swimlaneTitle.innerText);
	swimlane.insertBefore(listTitle, editButton);	
	//set button value back to submit
	editButton.setAttribute("value", "submit");
	swimlane.removeChild(swimlaneTitle);	
	editButton.onclick = setListTitle;
}