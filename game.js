
var inventory = [];
var hasLockBoxKey = false;
var hasCoffinKey = false;
var hasFeatherDuster = false;
var hasLetterO = false;
var hasPassCode = false;

function createEventListeners()
{
	var cardWall = document.getElementById("cardWall");
	var cardRemoved = document.getElementById("cardRemoved");
	var firstKey = document.getElementById("firstKey");
	var lockbox = document.getElementById("lockbox");
	var fireplace = document.getElementById("fireplace");
	var featherDuster = document.getElementById("featherDuster");
	var cobweb = document.getElementById("cobweb");
	var coffin = document.getElementById("coffin");
	
	if (window.addEventListener) 
	{
      cardWall.addEventListener("click", cardWallFunc, false);
	  cardRemoved.addEventListener("click", cardRemovedFunc, false);
	  firstKey.addEventListener("click", firstKeyFunc, false);
	  lockbox.addEventListener("click", lockboxFunc, false);
	  fireplace.addEventListener("click", fireplaceFunc, false);
	  cobweb.addEventListener("click", cobwebFunc, false);
	  coffin.addEventListener("click", coffinFunc, false);
    } 
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

function setUpPage()
{
	createEventListeners();
}
if (window.addEventListener) {
   window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", setUpPage);
}

function cardRemovedFunc()
{
	if(hasLetterO === false && document.getElementById("cardRemoved").style.opacity === "")
	{
		document.getElementById("cardRemoved").style.opacity = "1.0";
		document.getElementById("description").innerHTML = "You have picked up tile card with the letter O on it";
		inventory.push("Tile O");
		checkInventory();
		hasLetterO = true;
	}
	
}

function cardWallFunc()
{
	if(hasLetterO === true)
	{
		document.getElementById("cardWall").style.opacity = "1";
		document.getElementById("firstKey").style.opacity = "1";
		document.getElementById("description").innerHTML = "After placing the the tile card in its' place something falls to the table below";
		inventory.splice(inventory.indexOf("Tile O"), 1);
		checkInventory();
		hasLetterO = false;
	}
}



function firstKeyFunc()
{
	if(document.getElementById("firstKey").style.opacity === "1")
	{
		document.getElementById("firstKey").style.opacity = "";
		document.getElementById("description").innerHTML = "You pick up the key from off the table.";
		inventory.push("Key from table");
		checkInventory();
		hasLockBoxKey = true;
	}
}

function lockboxFunc()
{
	if(document.getElementById("lockbox").style.opacity === "" && document.getElementById("featherDuster").style.opacity === ""  && hasFeatherDuster === false)
	{
		document.getElementById("lockbox").style.opacity = "1";
		document.getElementById("description").innerHTML = "After moving the pillow on the chair you uncover a locked box.";
	}
	else if(document.getElementById("lockbox").style.opacity === "1" && hasLockBoxKey === false )
	{
		document.getElementById("description").innerHTML = "You do not have the key to the lock box.";
	}
	else if(document.getElementById("lockbox").style.opacity === "1" && hasLockBoxKey === true )
	{
		document.getElementById("lockbox").style.opacity = "";

		document.getElementById("featherDuster").style.opacity = "1";

		document.getElementById("description").innerHTML = "You unlock the locked box and find a Feather Duster inside.";
		hasLockBoxKey = false;
		inventory.splice(inventory.indexOf("Key from table"), 1);
		checkInventory();
	}
	else if(document.getElementById("featherDuster").style.opacity === "1")
	{
		document.getElementById("featherDuster").style.opacity = "";
		document.getElementById("description").innerHTML = "You pick up the Feather Duster.";
		inventory.push("Feather Duster");
		checkInventory();
		hasFeatherDuster = true;
	}
}

function fireplaceFunc()
{
	if(hasPassCode == false)
	{
		document.getElementById("description").innerHTML = "You search inside the fireplace and find a piece of paper.  A code is written on it: 1234";
		inventory.push("Passcode: 1234");
		checkInventory();
		hasPassCode = true;
	}
}



function cobwebFunc()
{
	if(hasFeatherDuster === true)
	{
		document.getElementById("cobweb").style.opacity = "1.0";
		document.getElementById("description").innerHTML = "While brushing away the cobwebs from the broken light a key falls from above.  You catch it before it can hit the floor.";
		inventory.push("Key from light");
		hasCoffinKey = true;
		inventory.splice(inventory.indexOf("Feather Duster"), 1);
		checkInventory();
	}
}

function coffinFunc()
{
	if(hasCoffinKey === false)
	{
		document.getElementById("description").innerHTML = "Looking inside the coffin you find a locked keypad but you dont have the key.";
	}
	else
	{
		document.getElementById("description").innerHTML = "You unlock the keypad and can now enter the passcode.";
		document.write("adkgahnfbgjafpibfujdpi");
	}
}

function checkInventory()
{
	document.getElementById("inventory").innerHTML = "";
	for(var i = 0; i < inventory.length; i++)
	{
		document.getElementById("inventory").innerHTML += inventory[i] + "\n";
	}
}