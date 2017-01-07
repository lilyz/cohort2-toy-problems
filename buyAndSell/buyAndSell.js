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

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}
function getMinOfArray(numArray) {
  return Math.min.apply(null, numArray);
}

var maximumProfit  = function(array) {
  var min = getMinOfArray(array);
  var max = getMaxOfArray(array);
  //checking if last day is the minmum
  if(array.indexOf(min) === array.length-1 || max === min){
    return "Maximum Profit : " + 0;
  } else {  
    //while there is max after min search for it, it will be the best day to sell 
    while(array.indexOf(max) < array.indexOf(min)){
    	// delete that max so it's out of the array
      array.splice(array.indexOf(max), 1);
      max = getMaxOfArray(array);
    }
  }
  return "Buy at " + min +" and sell at " + max + " maximum Profit : " + (max - min) ;
}