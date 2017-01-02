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
 	var x =input.length/2;
	var y=input.length-x;
	if (input === "(" || input === ")" || input ===")(" || input === "{" || input === "}" || input === "}{" || input === "[" || input === "]" || input === "][")  {
		return false;
	}
	for (var i = 0 ; i<input.length; i++) {
		if (input.length%2!==0) {
			return false;
		}
		for(var j = 0; j<x ; j++) {
			if (input[x]=="("&& input[y]==")" || input[x] === "["&& input[y] === "]" || input[x] === "{" && input[y]=== "}"){
			}
				return true;
		}
		for (var t = 0; t<x ; t++) {
			for (var s = 0; s<x; s++) {
				if (input[x] === "(" && input[y] === ")" || input[x] === "{" && input[y] === "}" || input[x] === "[" && input[y] === "]") {
				}
			}
		return true;
		}
	}
	return false;
};
	