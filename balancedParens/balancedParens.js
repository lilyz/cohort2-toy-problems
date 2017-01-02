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
	var x=input.split("")
	var y=[]
	var count=0
	var temp=0
	var va =0
	_.each(x,function(ele,i){
		if (ele==='{' ){
			//y.push(ele)
			count+=1
		}
		else if(ele==='}' ){
			//y.push(ele)
		count-=1
		}
		else if(ele==='['){
			temp+=1
		}
		else if (ele ===']'){
			temp-=1
		}
		else if(ele==='('){
			va+=1
		}
		else if(ele===")"){
			va-=1
		}
      
	})
if (count=0 && temp=0 && va=0){
	return true
}
return false
 };
	


	var balancedParens = function(str) {
  var arr = [];
  var open = { '{': '}', '[': ']', '(': ')' };
  var closed = { '}': true, ']': true, ')': true };
  
  for (var i = 0; i < str.length; i ++) {
    var chr = str[i];
    if (open[chr]) {
      arr.push(chr);
    } else if (closed[chr]) {
      if (open[arr.pop()] !== chr) return false;
    }
  }
  
  return arr.length === 0;
}
