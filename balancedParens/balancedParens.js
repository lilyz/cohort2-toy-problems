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
  var arrnum=[];
  var arrpar=[];
  var arrstr=input.split("");
  for (var i=0;i<arrstr.length;i++){
    if (arrstr[i]==="("||arrstr[i]===")"||arrstr[i]==="{"||arrstr[i]==="}"||
      arrstr[i]==="["||arrstr[i]==="]"){
      arrpar.push(arrstr[i])
    }
  }
    //arrpar.join();
    for (var i=0;i<arrpar.length;i++){
      if (arrpar[i]==="("||arrpar[i]==="["||arrpar[i]==="{"){
        arrnum.push(1)
      }
      if (arrpar[i]===")"||arrpar[i]==="]"||arrpar[i]==="}"){
        arrnum.push(2)
      }
      //the search for equality
      for
    }

    
  
  return arrnum
  
 };

"aa)".replace(/[")"]/g, "1")
"aa1"
	