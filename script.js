$(document).ready(function() {

	//what does this do?
	var convert_value_to_string = function(value) {
		if (value > 10) {
			switch (value) {
				case 11:
				return 'Jack';
				break;
				case 12:
				return 'Queen';
				break;
				case 13:
				return 'King';
				break;
			}
		}
		return value.toString();
	}
//this changes the numerical value to the name of the face card it represents

	//what does this do?
	var deck = [];
	var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
	for (var i = 0; i<suits.length; i++) {
		var suit = suits[i];
		for (var j = 0; j<13; j++) {
			deck.push({number: j+1, suit: suit});
		}
	}
//this sets it up so that there are 13 cards for each suit and only one face value in each suit

	//what does this do?
	var shuffle = function(array) { 
		var copy = [];
		var n = array.length; 
		var i; 
		while (n) { i = Math.floor(Math.random() * array.length);  
			if (i in array) { 
		 		copy.push(array[i]); 
		 		delete array[i]; 
		 		n--; 
		 	} 
		} 
		return copy; 
	}
	
	//Now call the shuffle function and save the result of what shuffle returns into your deck variable
	deck = shuffle(deck);

	var cards_player_1 = [];
	var cards_player_2 = [];

	// write a function called deal that will evently divide the deck up between the two players
	var deal = function(array) {
		for(var i = 0; i < deck.length; i++) {
			if(i % 2 === 0) {
				cards_player_1.push(array[i]);
			} else {
				cards_player_2.push(array[i]);
			};
		};
	};
	
	deal(deck);
	//create a function (algorithm) called "war" that takes two cards as parameters, compares them and returns a winner. A tie should return false.
	var war = function(player1, player2){
		if(player1[0] > player2[0]) {
			return 'p1';
		} else if(player1[0] < player2[0]) {
			return 'p2';
		} else {
			return false;
		};
	};
	
	var advance = function(){
		//take the top two cards and display them
		if (cards_player_1.length) {
			var card_1 = cards_player_1[0];
			var card_2 = cards_player_2[0];
			$("#opp-card").html(convert_value_to_string(card_1.number)+" "+card_1.suit);
			$("#opp-card-count").html(cards_player_1.length);
			$("#my-card").html(convert_value_to_string(card_2.number)+" "+card_2.suit);
			$("#my-card-count").html(cards_player_2.length);	
		};
	};
	
	
	//create a play function
		//compare the cards
		//give the winner both cards (at end of deck)
	var play = function(){
		var winner = war(cards_player_1[0], cards_player_2[0]);
		if(winner === 'p1') {
			cards_player_2.splice(0, 1);
			cards_player_1.splice(0, 1);
			cards_player_1.push(cards_player_1[0], cards_player_2[0]);
		} else if(winner === 'p2') {
			cards_player_1.splice(0, 1);
			cards_player_2.splice(0, 1);
			cards_player_2.push(cards_player_1[0], cards_player_2[0]);
		//} else {
			//blackDiamond
		};
		//this function (defined below) will continue to the next turn
		advance();
	};
	

	advance();
	
	$(".btn").click(function() {
		play();
	});
});
