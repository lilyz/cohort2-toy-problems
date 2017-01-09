/*
In England the currency is made up of pound, £, and pence, p.
There are eight coins in general circulation:

   1p, 2p, 5p, 10p, 20p, 50p, £1 (100p) and £2 (200p).

It is possible to make £2 in the following way:

   1×£1 + 1×50p + 2×20p + 1×5p + 1×2p + 3×1p

Given that total amount of pences, calculate the number of ways to create that amount.
Example:
coinCombination(200p) //-> 73682
*/
/*For 200p we have 73682 ways or posipilities, this represent the max # of possipilities
 becuase it is the highest value of currencey
 Our input value is pences
Output values for both pounds and pences.
possipilities consist of one pairs which is ammount of pence multibly 
by factor a positive number.
Now the mathmatical combination posipilities is calclauted by following eqation:
from the smallest one: 
1p has  1 possible(s)
2p  =   2    =
3p  =   2    =
5p  =   2    =
10p =   4    =
etc..

then we multibly these possibilies to find combinations according to one entery


*/

function coinCombination(pence){
//Decalre accunaltor 
var acc = Number("");
//declare required value
var value = pound;
// declare counter as factor multibly
var counter; 
// code of combination by recursion



return acc;
}