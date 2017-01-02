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


 function compare(open,close) {
 	var result = true
 	if(open.length !== close.length){
 		return false
 	}else{
 		for (var i = 0; i < open.length; i++) {
 			if(open[i] === "(" && close[i] === ")"){
 				result = true
 			}else if (open[i] === "{" && close[i] === "}")
		}
 	}  
}
 	var balancedParens = function (input) {
 	// var result = true
 	// var arr = [] 
 	// var parens = {
 	// 	"{": "}",
 	// 	"[": "]",
 	// 	"(": ")"
 	// }
 	// var close = {
 	// 	"}":1,
 	// 	"]":1,
 	// 	"}":1
 	// }
 	// for (var i = 0; i < input.length; i++) {
 	// 	for(var key in close){
 	// 		var temp = input[i]
 	// 		if(parens[temp]){
 	// 			arr.push(parens[temp])
 	// 		}else if(temp === key){

 	// 		}
 	// 	}
 	// }
 	var close = []
 	var open = []
 	for (var i = 0; i < input.length; i++) {
 		if(input[i] === "(" ||input[i] === "{"||input[i] === "{" ){
 			open.push(input[i])
 		}else if (input[i] === "}"||input[i] === ")"||input[i] === "]"){
 			close.push(input[i])
 		}else{
 			continue
 		}
 	}
 	return compare(open,close)

 };
