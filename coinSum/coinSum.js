/*
In England the currency is made up of pound, £, and pence, p.
There are eight coins in general circulation:

   1p, 2p, 5p, 10p, 20p, 50p, £1 (100p) and £2 (200p).

It is possible to make £2 in the following way:

   1×£1 + 1×50p + 2×20p + 1×5p + 1×2p + 3×1p

Given that total amount of pences, calculate the number of ways to create that amount.
Example:
coinCombination(200p) //-> 73682
<<<<<<< HEAD
*/
var calculate=function(){//this function to calculate that way 1×50p + 2×20p + 1×5p + 1×2p + 3×1p
	// £1 =100p && 1p=100pence
var obj={"50":1,"5":1,"2":1,"20":2,"1":3},result=0;
 for(var k in obj){
	  result+=(k*1)*obj[k];	
	  }
return result;
}
var coinCombination=function(n){
	n+="";
	var l=n.length-1,res=0;
	if(n[0]==="£"){
	  n=n.slice(1);
	  n*=1;
      res=calculate()*n;
	  res=res+"p";	
	}
   else if(n[l]==="p"){
	n=n.slice(0,-1);
	n*=1;//convert to number...
	res=calculate()*n;
     }
  return res;
}
=======
*/
>>>>>>> 343fd57b9115bfa98f2276bd71d7649a0b7f81b4
