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

 var balancedParens = function (input) {
    var open=0;
    var close=0;
    if (input.indexOf(")")===0 ||input.indexOf("}")===0 ||input.indexOf("]")===0){
      return false;
    }

    for (var i=0; i<input.length;i++){

      if (input[i]==="(" && input[i+1]==="}" || input[i]==="(" && input[i+1]==="]"){
        return false;
      }
      else if(input[i]==="{" && input[i+1]===")" || input[i]==="(" && input[i+1]==="]"){
        return false;
      }
      else if (input[i]==="[" && input[i+1]===")" || input[i]==="(" && input[i+1]==="}"){
        return false;
      }
      else if (input[i]==="(" || input[i]==="{" || input[i]==="["){
        open+=1;
      }
      else if (input[i]===")" || input[i]==="}" || input[i]==="]"){
        close+=1;
      }
    }
      if (close===open){
      return true;
      }
      else{return false}

 };
  