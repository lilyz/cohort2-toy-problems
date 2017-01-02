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
 	let p="[](){}"
 	ar= [],
    char, position;
	for(let i = 0 ;char=input[i]; i++){
		position=p.indexOf(char);
		if(position===-1){
			continue
		}
		if(position%2===0){
			ar.push(position+1)
		}
		else{
			if(ar.length===0||ar.pop()!==position){
				return false
		}
	}
}
}