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
