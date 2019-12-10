/*Orihah Sage Lillian Smith Joshua Brown
Date 12/10/2019
Filename: game.js
This javascript program runs an escape room game in a web page enviornment.
This file contains the javascript to run program
*/

var inventory = [];  //Variable to use for holding messages ouput to the inventory list  
var hasLockBoxKey = false; //Lines 8-12 booleans used to check if inventory items have been collected
var hasCoffinKey = false;  
var hasFeatherDuster = false;
var hasLetterO = false;
var hasPassCode = false;
var code = Math.floor(Math.random() * 10000);  //Generate random key upto 4 digits

//adds event listeners to all puzzle pieces of game
function createEventListeners()  
{	//Give document elements variable names for easier reference
	var cardWall = document.getElementById("cardWall");
	var cardRemoved = document.getElementById("cardRemoved");
	var firstKey = document.getElementById("firstKey");
	var lockbox = document.getElementById("lockbox");
	var fireplace = document.getElementById("fireplace");
	var featherDuster = document.getElementById("featherDuster");
	var cobweb = document.getElementById("cobweb");
	var coffin = document.getElementById("coffin");
	var codeBox = document.getElementById("codeBox");
	
	
	//add event listeners to webpage
	if (window.addEventListener) 
	{
      cardWall.addEventListener("click", cardWallFunc, false);
	  cardRemoved.addEventListener("click", cardRemovedFunc, false);
	  firstKey.addEventListener("click", firstKeyFunc, false);
	  lockbox.addEventListener("click", lockboxFunc, false);
	  fireplace.addEventListener("click", fireplaceFunc, false);
	  cobweb.addEventListener("click", cobwebFunc, false);
	  coffin.addEventListener("click", coffinFunc, false);
    } //Backward compatable event listners
	else if (window.attachEvent) 
	{
      cardWall.attachEvent("onclick", cardWallFunc);
	  cardRemoved.attachEvent("onclick", cardRemovedFunc);
	  firstKey.attachEvent("onclick", fireplaceFunc);
	  lockbox.attachEvent("onclick", lockboxFunc);
	  fireplace.attachEvent("onclick", fireplaceFunc);
	  cobweb.attachEvent("onclick", cobwebFunc);
	  coffin.attachEvent("onclick", coffinFunc);
    }
}

//Function run at page load to add event listeners
function setupPage()
{
	createEventListeners();//Run createEventListeners function
}
if (window.addEventListener) {  //Run setupPage if modern browser
   window.addEventListener("load", setupPage, false);
} else if (window.attachEvent) { //run setupPage if antiquated browser
   window.attachEvent("onload", setupPage);
}

//Function run when the card on floor is clicked
function cardRemovedFunc()
{
	if(hasLetterO === false && document.getElementById("cardRemoved").style.opacity === "")//Checks to see if card is visible
	{
		document.getElementById("cardRemoved").style.opacity = "1.0"; //Sets item missing image to visible
		document.getElementById("description").innerHTML = "You have picked up tile card with the letter 'O' on it";  //Sets description message 
		inventory.push("Tile O"); //Pushes new variable to inventory array
		checkInventory();  //Runs checkInventory function
		hasLetterO = true;  //Updates boolean to true, item collected
	}
	
}
//Function run when the missing space in "Boo" is clicked
function cardWallFunc()
{
	if(hasLetterO === true)//Checks to see that player has collected letter O tile
	{
		document.getElementById("cardWall").style.opacity = "1";  //Sets placed tile image to visible
		document.getElementById("firstKey").style.opacity = "1";  //Set new key image to visible
		document.getElementById("description").innerHTML = "After placing the the tile card in its' place something falls to the table below";  //Sets description message
		inventory.splice(inventory.indexOf("Tile O"), 1);  //Remove Tile O from inventory array
		checkInventory(); //Runs checkInventory function
		hasLetterO = false;  //Changes boolean to false, item no longer in inventory
	}
}


//Function run when the key is clicked
function firstKeyFunc()
{
	if(document.getElementById("firstKey").style.opacity === "1")  //Checks to see if key is visible
	{
		document.getElementById("firstKey").style.opacity = "";  //Sets key to invisisble
		document.getElementById("description").innerHTML = "You pick up the key from off the table.";  //Sets description message
		inventory.push("Key from table");  //Add variable to item array
		checkInventory();   //Changes boolean to false, item no longer in inventory
		hasLockBoxKey = true;  //Change boolean to true, has key
	}
}

//Function run when the cushion on chair is clicked
function lockboxFunc()
{	//Checks to see that the box is not visible, and that the player has not already collected the feather duster
	if(document.getElementById("lockbox").style.opacity === "" && document.getElementById("featherDuster").style.opacity === ""  && hasFeatherDuster === false)
	{
		document.getElementById("lockbox").style.opacity = "1";  //Set lockbox to visible
		document.getElementById("description").innerHTML = "After moving the pillow on the chair you uncover a locked box."; //Sets description message
	}
	else if(document.getElementById("lockbox").style.opacity === "1" && hasLockBoxKey === false ) //Checks that the box is visible and if the key has been collected
	{
		document.getElementById("description").innerHTML = "You do not have the key to the lock box."; //Sets description message when key is not collected
	}
	else if(document.getElementById("lockbox").style.opacity === "1" && hasLockBoxKey === true ) //Checks that the box is visible and if the key has been collected
	{  //Runs when the key has been collected
		document.getElementById("lockbox").style.opacity = "";  //Make box invisisble

		document.getElementById("featherDuster").style.opacity = "1"; //Make feather duster visible

		document.getElementById("description").innerHTML = "You unlock the locked box and find a Feather Duster inside."; //Sets description message
		hasLockBoxKey = false;  //Sets boolean to false, key removed
		inventory.splice(inventory.indexOf("Key from table"), 1);  //Removes key from inventory array
		checkInventory();  //Runs checkInventory function
	}
	else if(document.getElementById("featherDuster").style.opacity === "1")  //Checks to see if feather duster is visible
	{
		document.getElementById("featherDuster").style.opacity = "";  //Sets feather duster to invisisble
		document.getElementById("description").innerHTML = "You pick up the Feather Duster."; //Sets description message 
		inventory.push("Feather Duster");  //Adds feathe duster to inventory array
		checkInventory();  //Runs checkInventory function
		hasFeatherDuster = true;  //Sets boolean to true, item collected
	}
}
//Function run when the fireplace is clicked
function fireplaceFunc()
{
	if(hasPassCode == false) //Checks to see if the player has already collected to passcode
	{	//Window alert when fireplace is clicked, including the randomly generated passcode
		window.alert("Something leaps from the fireplace and grabs for you.  Screaming you stagger backwards and fall to the floor, squeezing your eyes shut against your inevitable death.  After an akward moment of cowering you open your eyes to see nothing but a piece of paper on the floor.");
		document.getElementById("description").innerHTML = "You pick up the peice of paper, on it is written a passcode: " + code;
		inventory.push("Passcode: " + code);  //Adds passcode to inventory array
		checkInventory(); //Runs checkInventory function
		hasPassCode = true; //Sets boolean to true, item collected
	}
}



//Function run when the cushion on chair is clicked
function cobwebFunc()
{
	if(hasFeatherDuster === true)  //Checks to see if player has collected feather duster
	{
		document.getElementById("cobweb").style.opacity = "1.0";  //Sets web cleared image to visible
		document.getElementById("description").innerHTML = "While brushing away the cobwebs from the broken light a key falls from above.  You catch it before it can hit the floor."; //Sets description message
		inventory.push("Key from light");  //Adds item to inventory array
		hasCoffinKey = true;  //Sets boolean to true, item collected
		inventory.splice(inventory.indexOf("Feather Duster"), 1);  //Remove feather duster from inventory array
		checkInventory(); //Sets description message
	}
}
//Function run when the coffin is clicked
function coffinFunc()
{
	if(hasCoffinKey === false)  //Checks to see if player has the coffin key
	{	//Sets description message if key has not been collected
		document.getElementById("description").innerHTML = "Looking inside the coffin you find a locked keypad but you dont have the key."; //Sets description message
	}
	else  //Code run when coffin key has been collected
	{
		document.getElementById("description").innerHTML = "You unlock the keypad and can now enter the passcode."; //Sets description message 
		document.getElementById("codeBox").style.opacity = "1.0"; //Sets code entry box to visible
		inventory.splice(inventory.indexOf("Key from light"), 1);  //Removes coffin key from inventory array
	}
}

function codeEnter(e)  //function when the passcode box has key pressed
{
	if(e.keyCode == 13) //If key is the enter key 
	{
	try
	{
		if(/[a-zA-Z]/.test(codeBox.value) === true)  //Regular expression to check for erronous entries
		{
			throw "Passcode only contains numbers";  //Informs player that only numbers are entered
		}
		else if(codeBox.value.localeCompare(code) !== 0) //If code does not match
		{
			throw "Passwords do not match";  //Informs player that code is incorrect
		}
	
	}
	
	catch(msg)  //Catches error message
	{
		document.getElementById("description").innerHTML = msg;  //Displays error message to player
	}
	
	if(codeBox.value.localeCompare(code) === 0)  //If code matches
	{
		document.write('<link href="https://fonts.googleapis.com/css?family=Butcherman&display=swap" rel="stylesheet"><div class="container"><img src="images/citySunset.jpg" style="width:100%;"><div class="centered">You have escaped!<br>This game was brought to you by:<br> Orihah Sage<br>Lillian Smith<br>Joshua Brown<br>12/10/2019</div></div><a href="http://www.freepik.com">Designed by Inbevel13 / Freepik</a><link href="game.css" rel="stylesheet">');  //Writes over html displaying escape image and creator names
	}
	}
}
//Function run to display current inventory
function checkInventory()
{
	document.getElementById("inventory").innerHTML = "";  //Clears inventory display to prevent duplicate entries
	for(var i = 0; i < inventory.length; i++)  //Run through each element of the array
	{
		document.getElementById("inventory").innerHTML += inventory[i] + "\n";  //Concatenate each element to the inventory display
	}
}