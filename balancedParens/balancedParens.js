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
 	var l=0,arr=[];
 	for(var i=0;i<input.length;i++){
 		if(input[i]==="(" || input[i]===")" || input[i]==="{" ||input[i]==="}"||input[i]==="[" || input[i]==="]"){
 			arr.push(input[i]);
 		}
 	}
 	input=arr.join("");
 	l=input.length;
 	while(l/2){
 		input=input.replace(/\(\)|\{\}|\[\]/g,'');
 			--l;
 	}
 	
 	if(input==="")return true;
  return false;
 };
	