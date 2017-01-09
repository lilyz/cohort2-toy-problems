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
<<<<<<< HEAD
	var maxprfit
	var x
	var y
	//your code is her
	for(var i=0 ;i<array.length ;i++){
		 x=Math.min(...array)
	}
		array.splice(0,array.indexof(x)+1)
		for(i=0;i<array.length;i++){
			 y =Math.max(...array)
		}
		if(y>x){
			return	maxprfit=y-x

		}
		return 0 
		
	

=======
	//your code is here
>>>>>>> 38d3baa03ca1511013858e091ad88f337836942c
}