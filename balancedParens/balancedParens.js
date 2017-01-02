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


 var balancedParens = function (input) {
 	var parens = "[]{}()"
 	var arr = []
 	var character
 	var x;
 	for(var i = 0; character = input[i]; i++) {
 		x = parens.indexOf(character);
 		if(x % 2 === 0) {
 			arr.push(x + 1);
 		} else if(arr.length === 0 || arr.pop() !== x) {
 				return false;
 			}	
 	}
 	return arr.length === 0;
 }
 
 