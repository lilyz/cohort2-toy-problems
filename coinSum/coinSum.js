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

function coinCombination(argument) {
  	var comb = 0;
  	for(var i1 = argument;i1 > -1; i1=i1-200){
    for(var i2 = i1 ; i2 > -1; i2=i2-100){
     	for(var i3 = i2; i3 > -1; i3=i3-50){
        for(var i4 = i3; i4 > -1; i4=i4-20){
        	//Dear RBK: complexity are getting ridiculous 
         	for(var i5 = i4; i5 > -1; i5=i5-10){
           for(var i6 = i5; i6 > -1; i6=i6-5){
             for(var i7 = i6; i7 > -1; i7=i7-2){
               	for(var i8 = i7; i8 > -1; i8=i8-1){
                	if(i8 === 0){
                    	comb++;
            }
           }
          }
         }
        }
       }
     }
   }
  }
  return comb;
}