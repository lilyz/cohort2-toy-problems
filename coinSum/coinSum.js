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
	var p=0;
	var d=0;
	var arr=[];
	if (argument.indexOf("p")!==-1){
		argument.slice(0,-1)*1;
		var p=argument;
		while(p>99){
			p=p-100;
			d++;
		}
		for (var i = 0; i < 100; i++) {
			var r=Math.floor((Math.random() * 10));
			var str=("d"+d*r+"p"+p*r)

			if(!arr.includes(str)){
				arr.push(str);
			}else{
				i--;
			}
		}		
	}
	return arr;
}