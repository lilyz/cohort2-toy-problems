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
   var flag
   var arr=input
   if (arr.length % 2 ===1){
   	return false
   }
   if(arr.length % 2 ===0){
   for(var i=0;arr.length;i++){
    if(arr[i]==="(" && input.indexOf(")")>0){
    flag=true
    }else{
    flag=false
    }     
   	
   	}
   }
   return flag
}
