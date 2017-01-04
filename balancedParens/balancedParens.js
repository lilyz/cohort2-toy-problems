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
	var pairs = {
		'(' : ')',
		'[' : ']',
		'(' : ')' 
	} , blocks=[], open,close;
	open = Object.keys(pairs);
	close = open.map(function(elem){
		return pairs[elem];
	});
	if(input.length % 2) {
		return false;
	}
	for (var i=0; i<input.length; i++){
		elem = input[i];
		if (open.indexOf(elem) > -1){
			blocks.push(elem);
		} else if (close.indexOf(elem) > -1){ //console.log (pairs[blocks.pop()])
			if(elem === pairs[blocks.pop()]) { //return elem === pairs[blocks.pop()] ? continue; : false ; 
				continue;
			}else{
			return false;
			}
		}
	}
	return blocks.length === 0;
};


<<<<<<< HEAD
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
>>>>>>> 6568bbd23274e6102779dd33ae75e4ed66b62768
