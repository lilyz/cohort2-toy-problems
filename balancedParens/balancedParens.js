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
 	var open1 = 0 ,closed1 =0 , open2=0, open3=0, closed2=0 , closed3=0
 	if(input.length%2!==0){
 		return false
 	}

 	for (var i = 0; i < input.length; i++) {
 		if(input[i] === "("){
 			++open1 ;
 		}
 		if(input[i] === ")"){
 			++closed1 ;
 		}
 		if(input[i] === "{"){
 			++open2 ;
 		}
 		if(input[i] === "}"){
 			++closed2 ;
 		}
 		if(input[i] === "["){
 			++open3 ;
 		}
 		if(input[i] === "]"){
 			++closed3 ;
 		}

 	}
 	return open1 === closed1 && open2 === closed2 && open3 === closed3 

 };

// function balancedParens(string){  
//   var stack = [];
//   var pairs = {
//     '[':']',
//     '{':'}',
//     '(':')'
//   };
//   var closers = {
//     ')': 1,
//     ']': 1,
//     '}': 1
//   };
//   for(var i = 0; i < string.length; i++){
//     if(pairs[string[i]]){
//       stack.push(pairs[string[i]]);
//     } else if(string[i] in closers){
//       if(stack[stack.length -1] === string[i]){
//         stack.pop();
//       } else{
//         return false;
//       }
//     }
//   }
//   return !stack.length;
// }