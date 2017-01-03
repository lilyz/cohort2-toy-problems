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
 // recursion solution but fixed with () and with no chars.
 // var balancedParens = function (input) {
 // 	if(input===""){
 // 		return true;
 // 	}
 // 	if(input.split("()").join('')===input){
 // 		return false;
 // 	}
 // 	let result=balancedParens(input.split("()").join(''));
 // 	return result;
 // }

 var balancedParens = function (input, brackets=['()','[]','{}']) {
 	let obj={
 		"(":0,
 		")":0,
 		"[":0,
 		"]":0,
 		"{":0,
 		"}":0
 	}
 	for(let k in brackets){	
 		for(let i in input){
 			if(input[i]===brackets[k][0]){
 				obj[brackets[k][0]]+=1;
 			}
 			if(input[i]===[k][1] && obj[brackets[k][1]]===obj[brackets[k][0]]){
 				return false
 			}
 			if(input[i]===brackets[k][1]){
 				obj[brackets[k][1]]+=1;
 			}
 		}
 	}
 	return (obj[brackets[0][0]]===obj[brackets[0][1]] && obj[brackets[1][0]]===obj[brackets[1][1]] && obj[brackets[2][0]]===obj[brackets[2][1]]) ? true : false;
 }
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
>>>>>>> cba0403161af1b52cd68471d7804b98f26a4bf23
