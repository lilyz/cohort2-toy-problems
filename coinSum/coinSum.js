/*
In England the currency is made up of pound, £, and pence, p.
There are eight coins in general circulation:

   1p, 2p, 5p, 10p, 20p, 50p, £1 (100p) and £2 (200p).

It is possible to make £2 in the following way:

   1×£1 + ×150p + 2×20p + 1×5p + 1×2p + 3×1p

Given that total amount of pences, calculate the number of ways to create that amount.
Example:
coinCombination(200p) //-> 73682
*/


function coinCombination(num){
	var arr=[1,2,5,10,20,50,100,200]
var sum=0
for (var i =0; i<arr.length; i++){
for (var p =0; i<arr[i]; i++){

		for(var j=0;j<2;j++){
			for(var k=0;k<3;k++){
				for(var l=0;l<3;l++){
					for(var d=0;d<3;d++){
						for(var t=0;t<3;t++){
							for(var o=0;o<3;o++){
								for(var a=0;a<3;a++){
									for(var d=0;d<2;d++){
										if(d===0){
											sum ++

										}

									}
								}
							}
						}
					}
				}
			}
		}
	}
}
	return sum	

}