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
	
 	var para = "()";
 	var char;
 	var brackets = input.split("");
 	var ordered = [];


 	for (var i = 0; i < input.length; i++){
 		char = input[i];


 		if(para.indexOf(char)<0){
 			brackets.splice(i,1);
 			continue;
 		}

 		if(para.indexOf(char)%2 !== 0){
 			ordered.push("closed");
 		}
 		else{
 			ordered.push("open")
 		}


 	}

 	for (var i = 0; i < ordered.length; i++) {
 		ordered[i]
 	}
 
	if (input.indexOf(")") > input.indexOf("("))
		return true;
	return false;
 };




	