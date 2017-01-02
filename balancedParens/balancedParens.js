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

 
 //step1

  var balancedParens = function (input) {
     var inp=input.split('');
     if (inp[0]==='(' && inp.length%2===0) {
       for (var i = 0; i < inp.length; i++) {
          if (inp[i]==='(' && inp[inp.length-(i+1)]===')') {
            return true
          }else 
          return false
        }
        
     }else 
     return false

  }