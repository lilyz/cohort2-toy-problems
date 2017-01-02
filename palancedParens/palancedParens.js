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



 var balancedParens = function(input){
 	if(input.indexOf('(')>=0 && input.indexOf(')') >=0){
     
     var c=0
     for(var i=0; i<input.length;i++){
     	if(input[i]==='('){
     		c++
     	}
     	else if(input[i]===')'){
     		c--
     	}
     	if(c<0 || c>0){
     		return false
     	}
     	

return true
     }

}
}









	