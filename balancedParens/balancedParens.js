/*
 * write a function that takes a string of text and returns true if
 * the parentheses are balanced and false otherwise.
 *
 * Example:
 *   balancedParens('(');  // false
 *   balancedParens('()'); // true
 *   balancedParens(')(');  // false
 *   balancedParens('(())');  // true
 *
 * Step 2:
 *   make your solution work for all types of brackets
 *
 * Example:
 *  balancedParens('[](){}'); // true
 *  balancedParens('[({})]');   // true
 *  balancedParens('[(]{)}'); // false
 *
 * Step 3:
 * ignore non-bracket characters
 * balancedParens(' var wow  = { yo: thisIsAwesome() }'); // true
 * balancedParens(' var hubble = function() { telescopes.awesome();'); // false
 *
 *	"())"
 */

<<<<<<< HEAD
 var balancedParens = function (input,flag) {
 	var arr=[];
 	var flag=[];
 	inputs=input.split("");
	for (var i = 0; i < inputs.length; i++) {
	 	if (inputs[i]==="["){
	 		for (var x=0 ; x < inputs.length ; x++){
	 			var inputs2=input.split("");
	 			if ("]"===inputs[x] && !flag.includes(x)){
	 				flag.push(x);
	 				arr.push(JSON.parse((inputs2.splice(i,x+1)).join("")));
	 			} 
	 		}
	 	}
	 	if (inputs[i]==="{"){
	 		for (var x=0 ; x < inputs.length ; x++){
	 			var inputs2=input.split("");
	 			if ("}"===inputs[x]&& !flag.includes(x)){
	 				flag.push(x);
	 				arr.push(JSON.parse((inputs2.splice(i,x+1)).join("")));
	 			} 
	 		}
	 	}
	 	if (inputs[i]==="("){
	 		for (var x=0 ; x < inputs.length ; x++){
	 			var inputs2=input.split("");
	 			if (")"===inputs[x]&& !flag.includes(x)){
	 				flag.push(x);
	 				arr.push(JSON.parse((inputs2.splice(i,x+1)).join("")));
	 			} 
	 		}
	 	}
	 } 
	 return arr;
	// if (input.indexOf("["!==-1)&& flag){
	// 	if (input.indexOf("]"===-1))
	// 		return false;
	// }
	// if (input.indexOf("{"!==-1)&& flag){
	// 	if (input.indexOf("}"===-1))
	// 		return false;
	// }
	// if (input.indexOf("("!==-1)&& flag){
	// 	if (input.indexOf(")"===-1))
	// 		return false;
	// }
	// var inputs=input.split("");
	// var arr=[];
	// var result=[];
	// for (var i = 0; i < inputs.length; i++) {
	// 	if (inputs[i]==="["){
	// 		if (inputs.includes("{")){
	// 			for (var a = input.indexOf("{"); a < input.indexOf("}"); a++) {
	// 				arr.push(inputs[a]);
	// 			}
	// 			result.push(balancedParens(arr.join(""),1));
	// 			arr=[];
	// 		}
	// 		if (inputs.includes("(")){
	// 			for (var b = input.indexOf("("); b < input.indexOf(")"); b++) {
	// 				arr.push(inputs[b]);
	// 			}
	// 			result.push(balancedParens(arr.join(""),1));
	// 			arr=[];
	// 		}
	// 	}
	// 	if (inputs[i]==="("){
	// 		if (inputs.includes("[")){
	// 			for (var c = input.indexOf("["); c < input.indexOf("]"); c++) {
	// 				arr.push(inputs[c]);
	// 			}
	// 			result.push(balancedParens(arr.join("")),1);
	// 			arr=[];
	// 		}
	// 		if (inputs.includes("{")){
	// 			for (var d = input.indexOf("{"); d < input.indexOf("}"); d++) {
	// 				arr.push(inputs[d]);
	// 			}
	// 			result.push(balancedParens(arr.join(""),1));
	// 			arr=[];
	// 		}
	// 	}
	// 	if (inputs[i]==="{"){
	// 		if (inputs.includes("[")){
	// 			for (var e = input.indexOf("["); e < input.indexOf("]"); e++) {
	// 				arr.push(inputs[e]);
	// 			}
	// 			result.push(balancedParens(arr.join(""),1));
	// 			arr=[];
	// 		}
	// 		if (inputs.includes("(")){
	// 			for (var f = input.indexOf("("); f < input.indexOf(")"); f++) {
	// 				arr.push(inputs[f]);
	// 			}
	// 			result.push(balancedParens(arr.join(""),1));
	// 			arr=[];
	// 		}
	// 	}
	// }
	// return result.join("");
=======

//  First function to q1 +q2 only;
 var balancedParens = function (input) {
  var c=input.length/2;
  for (var i = 0; i < c; i++) {
    input=input.replace("()",'');
    input=input.replace("[]",'');
    input=input.replace("{}",'');

  }
  console.log(input)
  return input =='' ;

>>>>>>> 6568bbd23274e6102779dd33ae75e4ed66b62768
 };
 //second function for all cases
 function balancedParens(input) {
  var parentheses = "[]{}()",
  array = [];
  var character; 
  var bracePosition;

  for(var i = 0; character = input[i]; i++) {
    bracePosition = parentheses.indexOf(character);

    if(bracePosition === -1) {
      continue;
    }

    if(bracePosition % 2 === 0) {
      array.push(bracePosition + 1); 
    } else {
      if(array.length === 0 || array.pop() !== bracePosition) {
        return false;
      }
    }
  }

  return array.length === 0;
}
