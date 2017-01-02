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
	var pairs = {
		'(' : ')',
		'[' : ']',
		'(' : ')' 
	} , blocks=[], open,close;
	open = Object.keys(pairs);
	close = open.map(function(elem){
		return pairs[elem];
	});
	if(input.length % 2) {
		return false;
	}
	for (var i=0; i<input.length; i++){
		elem = input[i];
		if (open.indexOf(elem) > -1){
			blocks.push(elem);
		} else if (close.indexOf(elem) > -1){ //console.log (pairs[blocks.pop()])
			if(elem === pairs[blocks.pop()]) { //return elem === pairs[blocks.pop()] ? continue; : false ; 
				continue;
			}else{
			return false;
			}
		}
	}
	return blocks.length === 0;
};


