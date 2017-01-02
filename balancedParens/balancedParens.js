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
 *  "())"
 */

function balancedParens(input){
  var  parens
   var index;
  var result = [];
  var oBracet = ['[', '{', '('];
  var cBracet = [']', '}', ')'];
  for (var i = 0; i < input.length; i++) {
    parens = input[i];
    if (oBracet.indexOf(parens) > -1) {
      result.push(parens);
    } else if (cBracet.indexOf(parens) > -1) {
      index = oBracet[cBracet.indexOf(parens)];
      if (result.length === 0 || (result.pop() !== index)) {
        return false;
      }
    } else {
      continue;
    }
  }
  return true;
}
  