/*
*
* Given an array representing prices of the stock on different days, 
* find the maximum profit that can be earned by performing maximum of 
* one transaction. A transaction consists of activity of buying and 
* selling the stock on different or same days.
*
*/

/*
*
* For example in this array - {100, 80, 120, 130, 70, 60, 100, 125} 
* the price of the stock on day-1 is 100, on day-2 is 80 and so on.
* The maximum profit that could be earned in this window is 65 
* (buy at 60 and sell at 125).
* For price array - {100, 80, 70, 65, 60, 55, 50}, maximum profit 
* that could be earned is 0.
*
*/

// Feel free to add helper functions if needed
function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}
function getMinOfArray(numArray) {
  return Math.min.apply(null, numArray);
}

var maximumProfit  = function(array) {
	// going to save the lower price in variable 
	var lowerPrice = array[0]
	// also for the best day to sell the ticket
	var bestDayTosell = array[0]
	// for loop to go ober every elements in the array 
	for (var i = 0; i < array.length; i++) {
		// checking for the lowest price to but the ticket
		if(array[i] < lowerPrice){
			//replaceing the element 
			lowerPrice = array[i]
			// also checking for the best day to sell the ticket
		}else if(array[i]> bestDayTosell && array.indexOf(lowerPrice)>array.indexOf(bestDayTosell)){
			// and here we also replaceing the value 
			bestDayTosell = array[i]
		}
	}
	// the last thing we do is to return the value that we are going to subtraction between the best day to sell and the lower price to buy, and that's it :D 
	return bestDayTosell - lowerPrice  
}