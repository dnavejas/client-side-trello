'use strict'
let swimlaneID = 0; 
let cardID = 0;

function addList() {
	swimlaneID++;

	var id = "swimlane" + swimlaneID;
	var br = document.createElement("br");

	var container = document.querySelector(".container");
	var swimlane = document.createElement("DIV");
	swimlane.setAttribute("id", id);
	swimlane.setAttribute("data-swimlane-id", swimlaneID);
	swimlane.setAttribute("class", "swimlane");

	container.appendChild(swimlane);

	var listTitle = document.createElement("input");
	listTitle.setAttribute("id", "title-value" + swimlaneID);
	listTitle.setAttribute("placeholder", "Enter Title Here");
	swimlane.appendChild(listTitle);

	var submitbtn = document.createElement("input"); 
	submitbtn.setAttribute("type", "button");
	submitbtn.setAttribute("id", "title-btn" + id);
	submitbtn.setAttribute("value", "submit");
	submitbtn.addEventListener("click", setListTitle)
	submitbtn.innerHTML = "<br>";
	swimlane.appendChild(submitbtn);
	swimlane.appendChild(br);
	
	var btnMoveSwimlaneLeft = document.createElement("INPUT");
	btnMoveSwimlaneLeft.setAttribute("type", "button");
	btnMoveSwimlaneLeft.setAttribute("value", "⇐");
	btnMoveSwimlaneLeft.setAttribute("data-swimlane-id", swimlaneID);
	btnMoveSwimlaneLeft.setAttribute("data-direction", "left");
	btnMoveSwimlaneLeft.addEventListener("click", moveSwimlane);
	swimlane.appendChild(btnMoveSwimlaneLeft);

	var btnAddCard = document.createElement("INPUT");
	btnAddCard.setAttribute("type", "button");
	btnAddCard.setAttribute("value", "Add Card");
	btnAddCard.setAttribute("id", "btnAddCard" + swimlaneID);
	btnAddCard.setAttribute("data-swimlane-id", swimlaneID);
	btnAddCard.addEventListener("click", addCard);
	swimlane.appendChild(btnAddCard);

	var btnDelSwimlane = document.createElement("INPUT");
	btnDelSwimlane.setAttribute("type", "button");
	btnDelSwimlane.setAttribute("value", "Delete Lane");
	btnDelSwimlane.setAttribute("id", "btnDel" + swimlaneID);
	btnDelSwimlane.setAttribute("data-swimlane-id", swimlaneID);
	btnDelSwimlane.addEventListener("click", deleteSwimlane);
	swimlane.appendChild(btnDelSwimlane);

	var btnMoveSwimlaneRight = document.createElement("INPUT");
	btnMoveSwimlaneRight.setAttribute("type", "button");
	btnMoveSwimlaneRight.setAttribute("value", "⇒");
	btnMoveSwimlaneRight.setAttribute("data-swimlane-id", swimlaneID);
	btnMoveSwimlaneRight.setAttribute("data-direction", "right");
	btnMoveSwimlaneRight.addEventListener("click", moveSwimlane);
	swimlane.appendChild(btnMoveSwimlaneRight);
}
function deleteSwimlane() {
	let slid = this.dataset.swimlaneId;

	let container = document.querySelector(".container");
	let swimlane = document.getElementById("swimlane" + slid);

	let leftSlid;
	let rightSlid;
	let left;
	let right;

	let cards = swimlane.getElementsByClassName("card");
	console.log(cards);
	let cardsArray = Array.from(cards);
	console.log(cardsArray);
	function checkForSL(){
		//try to get left swimlane data, may not exist
		try {
			left = document.querySelector("#swimlane" + slid).previousElementSibling;
			leftSlid = left.dataset.swimlaneId;
		}
		catch (e) {
		}

		//try to get right swimlane data, may not exist
		try {
			right = document.querySelector("#swimlane" + slid).nextElementSibling;
			rightSlid = right.dataset.swimlaneId;
		}
		catch (e) {
		
		}
	}
	
	let remove = confirm("If you want to delete this lane click ok. Otherwise click cancel.")

	if (remove == true) {
		checkForSL();
		let moveCards = confirm("To move all cards to another lane, click ok.");
		if (moveCards == true){
			if(left != null && cards.length != 0) {
				
				left.appendChild(...cardsArray);
			}
			else if(right != null && cards.length != 0) {
				right.appendChild(...cardsArray);
			}
			
		}
		container.removeChild(swimlane);
	} else {
		return false;
	}
}
function addCard() {
	cardID++;
	let cID = "card" + cardID;
	let slid = this.dataset.swimlaneId; 
	var card = document.createElement("DIV");
	card.setAttribute("id", "card" + cardID); 
	card.setAttribute("class", "card");
	card.setAttribute("data-swimlane-id", slid);

	var cardTitle = document.createElement("input");
	cardTitle.setAttribute("id", "card-title" + cardID)
	cardTitle.setAttribute("type", "text");
	cardTitle.setAttribute("placeholder", "Enter Card Title here")
	card.appendChild(cardTitle);

	var cardTitleBtn = document.createElement("input");
	cardTitleBtn.setAttribute("type", "button");
	cardTitleBtn.setAttribute("id", "card-title" + cID);
	cardTitleBtn.setAttribute("value", "submit");
	cardTitleBtn.addEventListener("click", setCardTitle);
	cardTitleBtn.innerHTML = "<br>";
	card.appendChild(cardTitleBtn);

	var cardButtons = document.createElement("div");
	cardButtons.setAttribute("class", "card-buttons");

	var btnMoveLeft = document.createElement("input");
	btnMoveLeft.setAttribute("id", "btnMoveLeft" + cardID);
	btnMoveLeft.setAttribute("type", "button");
	btnMoveLeft.setAttribute("value", "⇐");
	btnMoveLeft.setAttribute("data-move-direction","left");
	btnMoveLeft.setAttribute("data-card-id", cardID);
	btnMoveLeft.addEventListener("click", moveCard);
	cardButtons.appendChild(btnMoveLeft);

	var btnMoveUp = document.createElement("input");
	btnMoveUp.setAttribute("id", "btnMoveUp" + cardID);
	btnMoveUp.setAttribute("type", "button");
	btnMoveUp.setAttribute("value", "⇑");
	btnMoveUp.setAttribute("data-move-direction","up");
	btnMoveUp.setAttribute("data-card-id", cardID);
	btnMoveUp.addEventListener("click", moveCard);
	cardButtons.appendChild(btnMoveUp);

	var btnDelete = document.createElement("input");
	btnDelete.setAttribute("id", "btnDel" + cardID);
	btnDelete.setAttribute("type", "button");
	btnDelete.setAttribute("value", "Remove");
	btnDelete.setAttribute("data-card-id", cardID);
	btnDelete.addEventListener("click", deleteCard);
	cardButtons.appendChild(btnDelete);

	var btnMoveDown = document.createElement("input");
	btnMoveDown.setAttribute("id", "btnMoveDown" + cardID);
	btnMoveDown.setAttribute("type", "button");
	btnMoveDown.setAttribute("value", "⇓");
	btnMoveDown.setAttribute("data-move-direction","down");
	btnMoveDown.setAttribute("data-card-id", cardID);
	btnMoveDown.addEventListener("click", moveCard);
	cardButtons.appendChild(btnMoveDown);

	var btnMoveRight = document.createElement("input");
	btnMoveRight.setAttribute("id", "btnMoveRight" + cardID);
	btnMoveRight.setAttribute("type", "button");
	btnMoveRight.setAttribute("value", "⇒");
	btnMoveRight.setAttribute("data-move-direction","right");
	btnMoveRight.setAttribute("data-card-id", cardID);
	btnMoveRight.addEventListener("click", moveCard);
	cardButtons.appendChild(btnMoveRight);

	card.appendChild(cardButtons);

	var cardDesc = document.createElement("textarea");
	cardDesc.setAttribute("id", "card-desc" + cardID);
	cardDesc.setAttribute("placeholder", "Enter description here");
	card.appendChild(cardDesc);

	var descSubmitBtn = document.createElement("input");
	descSubmitBtn.setAttribute("id", "desc-submit-btn" + cardID);
	descSubmitBtn.setAttribute("value", "submit");
	descSubmitBtn.setAttribute("type", "button");
	descSubmitBtn.addEventListener("click", setDescription);
	card.appendChild(descSubmitBtn);


	let swimlane = document.querySelector("#swimlane" + slid);
	swimlane.appendChild(card);
}
function deleteCard() {
	let slid = this.parentNode.parentNode.dataset.swimlaneId; 
	let cid = this.dataset.cardId;

	let swimlane = document.querySelector("#swimlane" + slid);
	let card = document.querySelector("#card" + cid);

	swimlane.removeChild(card);
};
function moveSwimlane() {
	let slid = this.dataset.swimlaneId;
	let swimlane = document.querySelector("#swimlane" + slid);
	let container = document.querySelector(".container");

	if(this.dataset.direction == "left") {
		container.insertAdjacentElement("afterbegin", swimlane);
	}
	else if (this.dataset.direction == "right") {
		container.insertAdjacentElement("beforeend", swimlane);
	}
};
function moveCard(e) {
	let swimlane = this.parentNode.parentNode.parentNode;
	let slid = this.parentNode.parentNode.dataset.swimlaneId;
	let cid = this.dataset.cardId;

	let card = document.querySelector("#card" + cid);

	let leftSlid;
	let rightSlid;
	let left;
	let right;
	let up;
	let down;

	try {
		left = document.querySelector("#swimlane" + slid).previousSibling;
		leftSlid = left.dataset.swimlaneId;
	}
	catch (e) {}

	try {
		right = document.querySelector("#swimlane" + slid).nextSibling;
		rightSlid = right.dataset.swimlaneId;
	}
	catch (e) {}

	let direction = this.dataset.moveDirection;

	if(left != null && direction == "left") {
		left.appendChild(card);
		card.dataset.swimlaneId = leftSlid;
	}
	else if(right != null && direction == "right") {
		right.appendChild(card);
		card.dataset.swimlaneId = rightSlid;
	}
	else if(direction == "up") {
		up = this.parentElement.parentElement.previousElementSibling;
		swimlane.insertBefore(card, up);
	}
	else if(direction == "down") {
		down = this.parentElement.parentElement.nextElementSibling.nextElementSibling;
		swimlane.insertBefore(card, down);
		
	}
};
function setCardTitle(){
	let cTitleBtn = this;
	let card = this.parentElement;
	let cTitle = card.firstChild;
	let cTitleTxt = cTitle.value;
	let setCTitle = document.createElement("h3");
	setCTitle.setAttribute("class", "c-title");
	setCTitle.innerHTML = cTitleTxt;

	let cardEditBtn = document.createElement("input");
	cardEditBtn.setAttribute("type", "button");
	cardEditBtn.setAttribute("value", "Edit Card Title");
	cardEditBtn.setAttribute("onclick", "editCardTitle(event)");

	cTitleBtn.innerHTML = "<br";

	card.insertBefore(setCTitle, cTitleBtn);
	card.replaceChild(cardEditBtn, cTitleBtn);

	cTitle.parentNode.removeChild(cTitle);	
};
function editCardTitle(e){
	const cardEditBtn = e.target;
	const card = cardEditBtn.parentNode;
	const cardTitle = card.firstChild;

	let newCardTitle = document.createElement("input");
	newCardTitle.setAttribute("class", "list-title");
	newCardTitle.setAttribute("id", "title-value");
	newCardTitle.setAttribute("value", cardTitle.innerText);
	card.insertBefore(newCardTitle, cardEditBtn);	
	cardEditBtn.setAttribute("value", "submit");
	card.removeChild(cardTitle);	
	cardEditBtn.onclick = setListTitle;
};
function setListTitle(){
	let slTitleBtn = this;
	let swimlane = this.parentElement;
	var slTitle = swimlane.firstChild;
	var slTitleTxt = slTitle.value;
	var setSlTitle = document.createElement("h2");
	setSlTitle.setAttribute("class", "sl-title");
	setSlTitle.innerHTML = slTitleTxt;

	var slEditBtn = document.createElement("input");
	slEditBtn.setAttribute("type", "button");
	slEditBtn.setAttribute("value", "Edit This Title");
	slEditBtn.setAttribute("onclick", "editSlTitle(event)");

	swimlane.insertBefore(setSlTitle, slTitleBtn);
	swimlane.replaceChild(slEditBtn, slTitleBtn);

	slTitle.parentNode.removeChild(slTitle);
};
function editSlTitle(e){
	const editButton = e.target;
	const swimlane = editButton.parentNode;
	const swimlaneTitle = swimlane.firstChild;

	var listTitle = document.createElement("input");
	listTitle.setAttribute("class", "list-title");
	listTitle.setAttribute("id", "title-value");
	listTitle.setAttribute("value", swimlaneTitle.innerText);
	swimlane.insertBefore(listTitle, editButton);	
	editButton.setAttribute("value", "submit");
	swimlane.removeChild(swimlaneTitle);	
	editButton.onclick = setListTitle;
};
function setDescription(){
	let cardDescBtn = this;
	let card = this.parentElement;
	var cardDesc = card.children[3];
	var cardDescTxt = cardDesc.value;
	var cardDescription = document.createElement("p");
	cardDescription.setAttribute("class", "card-desc");
	cardDescription.innerHTML = cardDescTxt;

	var cDescBtn = document.createElement("input");
	cDescBtn.setAttribute("type", "button");
	cDescBtn.setAttribute("value", "Edit This Description");
	cDescBtn.setAttribute("onclick", "editCDesc(event)");

	card.insertBefore(cardDescription, cardDescBtn);
	card.replaceChild(cDescBtn, cardDescBtn);

	cardDesc.parentNode.removeChild(cardDesc);
};
function editCDesc(e){

	const editButton = e.target;
	const card = editButton.parentNode;
	const cardDesc = card.children[3];

	var cardDescription = document.createElement("textarea");
	cardDescription.setAttribute("class", "card-desc");
	cardDescription.setAttribute("id", "c-desc-value");
	cardDescription.innerHTML = card.innerText;
	card.insertBefore(cardDescription, editButton);	
	editButton.setAttribute("value", "submit");
	card.removeChild(cardDesc);	
	editButton.onclick = setDescription;
}