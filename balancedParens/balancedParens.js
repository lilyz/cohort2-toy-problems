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


//  First function to q1 +q2 only;
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
  
=======
  var c=input.length/2;
  for (var i = 0; i < c; i++) {
    input=input.replace("()",'');
    input=input.replace("[]",'');
    input=input.replace("{}",'');

  }
  console.log(input)
  return input =='' ;

 };
 //second function for all cases
 function balancedParens(input) {
  var parentheses = "[]{}()",
  array = [];
  var character; 
  var bracePosition;

  for(var i = 0; character = input[i]; i++) {
    bracePosition = parentheses.indexOf(character);

    if(bracePosition === -1) {
      continue;
    }

    if(bracePosition % 2 === 0) {
      array.push(bracePosition + 1); 
    } else {
      if(array.length === 0 || array.pop() !== bracePosition) {
        return false;
      }
    }
  }

  return array.length === 0;
}

