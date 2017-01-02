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
    input=input.split("");
      var arr=[];
      var openParanth=["(","[","{"];
      var closeParanth=[")","]","}"];
      for(var i =0; i<input.length; i++){
        if(openParanth.includes(input[i])){
          arr.push(input[i]);
        } else if(closeParanth.includes(input[i])){
            if(arr.length <1 || openParanth.indexOf(arr.pop()) !== closeParanth.indexOf(input[i])){
              return false;
            }
        }
      }
      if(arr.length > 0)
        return false;
      return true;
  };