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
<<<<<<< HEAD
 * balancedParens(' var wow  = {yo:thisIsAwesome()}'); // true
=======
 * balancedParens(' var wow  = { yo: thisIsAwesome() }'); // true
>>>>>>> cba0403161af1b52cd68471d7804b98f26a4bf23
 * balancedParens(' var hubble = function() { telescopes.awesome();'); // false
 *
 *	"())"
 */

<<<<<<< HEAD
 var balancedParens = function (input) {
 	var openPar = ['{','(','['];
 	var closePar = ['}',')',']']
 	var newInput = input.replace(/[a-zA-Z0-9]/g, '').replace(/ /g,'');
 	var strArr = newInput.split('');
 	var result = true;
 	if (newInput.length===1 || newInput.length % 2 !== 0) {
 		return false;
 	}
 	for (var i = 0; i < strArr.length; i++) {
 		var openIndx = openPar.indexOf(strArr[0]);
 		var closIndx = closePar.indexOf(closePar[openIndx]);
 		if (strArr.indexOf(strArr[0])!==strArr.indexOf(closePar[openIndx])-1||strArr.indexOf(strArr[0]) !== strArr.length-(1+strArr.indexOf(closePar[openIndx]))) {	
 			return false	
 		}
 		
 	}
 	return result;
 };
 //strArr.indexOf(strArr[0]) !== strArr.length-(1+strArr.indexOf(closePar[openIndx]))
=======

//  First function to q1 +q2 only;
 var balancedParens = function (input) {
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
>>>>>>> cba0403161af1b52cd68471d7804b98f26a4bf23
