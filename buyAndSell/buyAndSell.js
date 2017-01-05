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
	if(numArray.length >0)
  return Math.max.apply(null, numArray);
return 0;
}
function getMinOfArray(numArray) {
  return Math.min.apply(null, numArray);
}

var maximumProfit  = function(array) {
	//your code is here
	
	for(var i=0;i<array.length;i++)
	{	
		var x=	array.slice(i+1);
		temp = getMaxOfArray(x) -array[i];
		for(var j=0;j<x.length;j++)
		 if( x < getMaxOfArray(x)-array[j]  )
			temp = getMaxOfArray(x)-array[j];		
	}
	return temp;
}
	// _.each(array, function(value,index){
	// 	//var temp= getMaxOfArray(allitem);
	// 	temp= getMaxOfArray(array.slice(index+1)) - value;
	// 	if(temp > maximumProfit(array.slice(index+1)))
	// 		return temp;		// _.each(allitem, function(valuee, indexx){
	// 		return false
	// 	// 	if(temp1> )

	// 	// })
	// })
	// return temp;