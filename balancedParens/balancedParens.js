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
 * balancedParens(' var wow  = {yo:thisIsAwesome()}'); // true
 * balancedParens(' var hubble = function() { telescopes.awesome();'); // false
 *
 *	"())"
 */

 var balancedParens = function (input) {
 	var openPar = ['{','(','['];
 	var closePar = ['}',')',']']
 	var newInput = input.replace(/[a-zA-Z0-9]/g, '').replace(/ /g,'');
 	var strArr = newInput.split('');
 	var result = null;
 	if (input.length===1) {
 		return false;
 	}
 	for (var i = 0; i < strArr.length; i++) {
 		var openIndx = openPar.indexOf(strArr[0])
 		var closIndx = closePar[openIndx]
 		if (true) {}
 	}
};
