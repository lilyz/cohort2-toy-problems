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
	var x;
	var str=""
	for (var i = 0; i <input.length; i++) {
		x=input[i]
		if (x==="["||x==="]"||x==="{"||x==="}"||x==="("||x===")"||x==="'"||x==='"'){
			str+=x;
		}
	}
	var j=str.length;
	for (var i = 0; i < str.length/2; i++){
		x=str[i].charCodeAt() + str[j-1].charCodeAt()
		if(x!==81&&x!==248&&x!==68&&x!==78&&x!==184)
			return false;
	j--;
	}
	return true;
};
	