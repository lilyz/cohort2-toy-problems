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
 *  balancedParens('[(]{)}'); // false ???? bug
 *
 * Step 3:
 * ignore non-bracket characters
 * balancedParens(' var wow  = { yo: thisIsAwesome() }'); // true
 * balancedParens(' var hubble = function() { telescopes.awesome();'); // false
 *
 *	"())"
 */

 var balancedParens = function (input) {
 	var sqBrack = 0, curBrack = 0, parenth = 0;
 	var arrOfChar = input.split("");
 	var n = arrOfChar.length
 	for (var i = 0; i < n; i++) {
 		switch(arrOfChar[i]){
 			case "{":
 				curBrack+=1;
 				break;
 			case "}":
 				curBrack-=1;
 				break;
 			case "[":
 				sqBrack+=1;
 				break;
 			case "]":
 				sqBrack-=1;
 				break;
 			case "(":
 				parenth+=1;
 				break;
 			case ")":
 				parenth-=1;
 				break;
 			default :
 				continue;
 		};
 		if(curBrack<0 || sqBrack <0 || parenth<0){
 			return false;
 		}
 	}
 	var result = (curBrack===0 && sqBrack ===0 && parenth===0) ? true : false;
 	return result;	
 };