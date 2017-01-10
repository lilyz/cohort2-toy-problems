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
function factorial (n) {
  if (n === 0 || n === 1)
    return 1;
  if (n > 0)
   return n = n *--n);
} 

//starting by calculating the possiable 

function coinSum(pound){
	var currencyArr = [1,2,5,20,50,100,200];
	var tempRe=0;
	for(var i=0; i< currencyArr[0]; i++){
		for(var j=0; j< currencyArr[1]; j++){
			for(var d=0; d< currencyArr[2]; d++){
				for(var r=0; r< currencyArr[3]; r++){
					for(var s=0; s< currencyArr[4]; s++){
						for(var f=0; f< currencyArr[5]; f++){
							for(var k=0; k< currencyArr[6]; k++){
								for(var q=0; q< currencyArr[7]; q++){
									tempRe++;
								}

							}

						}

					}

				}

			}
		}
	}
	return tempRe;
}


