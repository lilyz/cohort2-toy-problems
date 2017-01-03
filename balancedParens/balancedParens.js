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

 // var balancedParens = function (input) {
	// if (input.length % 2 !== 0){
	// 	return false;
	// }else {
	// 	if( input === "()"){
	// 		return true;
	// 	}else if ( input === ")("){
	// 		return false;
	// 	}
	// }
 // };
	
 // var middleSec = (input.length / 2) - 1;
	// if (input.charAt(middleSec) === input.charAt(middleSec + 1))
//
 var balancedParens = function (input) {
 	var stack, openMap, closeMap;
  stack = [];
  openMap = {
    '[':']',
    '{':'}',
    '(':')'
  };
  closeMap = {
    ')': true,
    ']': true,
    '}': true
  };
  for(var i = 0; i < input.length; i++){
    var char = input[i];
    if(openMap[char]){
      stack.push(openMap[char]);
    } else if(closeMap[char]){
      if(stack[stack.length -1] !== char){
        return false;
      } else{
        stack.pop();
      }
    }
  }
  return (stack.length === 0);
}