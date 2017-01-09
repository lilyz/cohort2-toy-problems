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
<<<<<<< HEAD
* For example in this array - [100, 80, 120, 130, 70, 60, 100, 125] 
=======
* For example in this array - {100, 80, 120, 130, 70, 60, 100, 125} 
>>>>>>> 22de3ef23269d55c15ab791aec99456e3006e5d7
* the price of the stock on day-1 is 100, on day-2 is 80 and so on.
* The maximum profit that could be earned in this window is 65 
* (buy at 60 and sell at 125).
* For price array - {100, 80, 70, 65, 60, 55, 50}, maximum profit 
* that could be earned is 0.
*
*/
<<<<<<< HEAD
var buyAndsellStockLoss = [100, 80, 70, 65, 60, 55, 50];
var buyAndsellStockProfit = [100, 80, 120, 130, 70, 60, 100, 125];
=======

>>>>>>> 22de3ef23269d55c15ab791aec99456e3006e5d7
// Feel free to add helper functions if needed
function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}
function getMinOfArray(numArray) {
  return Math.min.apply(null, numArray);
}

var maximumProfit  = function(array) {
<<<<<<< HEAD
	for (var i = 0; i < array.length; i++ ){
		if ( array [ i ] === getMinOfArray ( array )){
			var tempArr = array.slice( i );
			return getMaxOfArray ( tempArr ) - getMinOfArray ( array );
		}
	}
=======
	//your code is here
>>>>>>> 22de3ef23269d55c15ab791aec99456e3006e5d7
}