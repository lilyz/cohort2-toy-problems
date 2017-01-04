function each(coll, func) {
     if (Array.isArray(coll)) {
         for (var i = 0; i < coll.length; i++) {
                func(coll[i], i);
         }
     } else {
         for (var key in coll) {
                func(coll[key], key);
         }
     }
}

function squall(arr){
	var newArr=[];
	each(arr,function(element,i){
		newArr.push(element*element)
	})
	return newArr;
}


function map(arr,f){
	var acc=[];
	each(arr,function(element,i){
		acc.push(f(element,i))
	})
	return acc;
}
var people = [
               {name: {first: "Grace", middle: "B.", last: "Hopper"}, age: 85},
               {name: {first: "Adele", last: "Goldstine"}, age: 43},
               {name: {first: "Ada", last: "Lovelace"}, age: 36},
               {name: {first: "Hedy", middle: "E.", last: "Lamarr"}, age: 85},
               {name: {first: "Ruchi", last: "Sanghvi"}, age: 34}
             ];


  function ages(people) {
 	return map(people, function(person) {
           return person.age;});
}

  function fullName(people){
	return map(people,function(element,i){
		return element.name.first+' '+element.name.last
	})
}
  function abs(x) {
     if (x >= 0) {
         return x; }
         return -x; }

  function max(numbers) {
	var max=numbers[0];
	each(numbers,function(element,i){
		if (max < element) {
			max=element;
		}
	})
	return max;
	 }




  function maximums(arrays) {
	 	return map(arrays,max)
}

  function exponentials(numbers) {
		return map(numbers,function(element,i){
			return Math.pow(element,element)
		})
		 }

  function reverse(str){
  	var strsplited=str.split("")
  	var newstr="";
  	for(var i=strsplited.length-1;i>=0;i--){
  		newstr+=strsplited[i]
  	}
  	return newstr;
  }


  function reverseWords(str){
  	var strs=str.split(" ");
  	return map(strs,reverse).join(" ");
  }


  function pulck(arr,str){
  	return map(arr,function(element,i){
  		//console.log(element[str])
   			return element[str];
  	});
  }

  function each(coll, f) {
    if (Array.isArray(coll)) {
        for (var i = 0; i < coll.length; i++) {
                f(coll[i], i);
        }
    } else {
        for (var key in coll) {
                f(coll[key], key);
        }
    }
}


  function map(coll,f){
  	var acc=[];
  	if (!Array.isArray(coll)) {
  		acc={}
  	}
  	each(coll,function(element,key){

  		acc[key]=f(element,key)
  	});
  	return acc;
  }

  function incrementValues(obj){
  	return map(obj,function(value,key){
  		console.log(value+' '+key)
  		if (typeof value==='number') {
  			return value+1
  		}
  		return value;
  	})
  } 

  function uppercaseValues(obj){
  	return map(obj,function(value,key){
  		if (typeof value==='string') {
  			return value.toUpperCase();
  		}
  		return value;
  	})
  }

  function countNestedKeys(obj){
  	return map(obj,function(value,key){
  		return Object.keys(value).length
  		  	})
  }

  function filter(arr,predicate){
  	var acc=[];
  	each(arr,function(element,i){
  		if (predicate(element,i)) {
  			acc.push(element);
  		}
  	});
  	return acc;
  }

  function evens(arr){
  	return filter(arr,function(element,i){
  		return element%2===0;
  	})
  }

  function multiplesOfThree(arr){
  	return filter(arr,function(element){
  		return element%3===0;
  	})
  }

   function startsWithChar(arr,chr){
	 return filter(arr,function(element,i){
	 	return element[0]===chr; //return element.charAt(0) === chr;

	 });  	
   }

   function evenIndexedEvenLengths(arr){
   	return filter(arr,function(element,i){
   		return element.length%2===0 && i%2===0;
   	})
   }

   function filter(coll,predicate){
   	var acc=[]

	if (!Array.isArray(coll)) {
  		acc={};
	  	}
	  	each(coll,function(value,key){
	  		if (predicate(value,key)) {
	  			if (Array.isArray(coll)) {
	  			acc.push(value);
	  		}
	  		 else{
	  			acc[key]=value;
	  		}
	  	}
	  	});
	  	return acc;
   }


 function reduce(array, f, start) {
    var acc = start;
    each(array, function(element) {
         acc = f(acc, element);
    });
    return acc;
}
  function sum(numbers) {
	    return reduce(numbers, function(total, number) {
	         return total + number;
	    }, 0);
	}


  function averageAge(obj){
		var ages= map(obj,function(value,key){
			return value.age
		});
		return sum(ages)/people.length
	}

  function max(arr){

  	 return reduce(arr,function(max,element){
  		if (max>element) {
			return max;
			}
			return element


  	},arr[0])
  	}


  	// return string sorted wihtout duplicated letters
function longeset(str1,str2) {
  var str=str1.concat(str2);
  var result = '';
  for(var i = 0; i < str.length; i++) {
    if(result.indexOf(str[i]) < 0) {
      result += str[i];
    }
  }
  result=result.split("");
  result=result.sort();
  return result.join("");
}
   
 function dg5(start,end){
 	var num=[]
 	for(var i=start;i<=end;i++){
 		num.push(i);

 	}
 	//incluedes
 	
 	//num.indexOf(5);
 	// for(var i=0;i<num.length;i++){
 	// 	if (num[i]) {}
 	// }


 
 	}
//check the stringth of password

function checkPass(string){

	if(string.length>=8 && !(/[A-Z]/.test(string)) && !(/[a-z]/.test(string))&&! /\d/.test(string)){
		return 'password is Weak'

	}
	else if(string.length>=8 && (/[A-Z]/.test(string)) && (/[a-z]/.test(string))){
		return 'password is Meduim'
	}
	else if(string.length>=8 && (/[A-Z]/.test(string)) && (/[a-z]/.test(string)) ){
		return 'password is STRONG'

	}
	else if (string.length>=8 && (/[A-Z]/.test(string)) && (/[a-z]/.test(string)) && /\d/.test(string)){
		return' password is VERY STRONG'
	}else{
	return 'The password length should be at least 8 characters'
 }


}

function validate(password) {
  return (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/).test(password);
}


//toy problem  return seconds to human readble HH:MM:SS

function humanReadable(seconds) {

	var hours = Math.floor(seconds / 3600), min = Math.floor(seconds/ 60),sec = seconds - min * 60;
 return seconds<60 ? "00:00:"+seconds : seconds>=60 && seconds<3600 ? "00:"+min+':'+sec : seconds>=3600 ? hours+':'+min+':'+sec : seconds
}
/////////////

 /// toy problem
 // Given an array, find the integer that appears an odd number of times.
// There will always be only one integer that appears an odd number of times.

// function doTest(a, n) {
//   console.log("A = ", a);
//   console.log("n = ", n);
//   Test.assertEquals(findOdd(a), n);
// }

// Test.describe('Example tests', function() {
//   doTest([20,1,-1,2,-2,3,3,5,5,1,2,4,20,4,-1,-2,5], 5);
//   doTest([1,1,2,-2,5,2,4,4,-1,-2,5], -1);
//   doTest([20,1,1,2,2,3,3,5,5,4,20,4,5], 5);
//   doTest([10], 10);
//   doTest([1,1,1,1,1,1,10,1,1,1,1], 10);
//   doTest([5,4,3,2,1,5,4,3,2,10,10], 1);
// });

///


//
function gcd(a,b) {

    if (b > a) {var temp = a; a = b; b = temp;}
    while (true) {
        if (b == 0) return a;
        a %= b;
        if (a == 0) return b;
        b %= a;
    }
}



  function su (start,end){

    if ( start==end) {

      return end;
    }
     
    return end+su(start,end-1);
  }

  function factorial(num){
    if (num=== 1) {
      return num
    }
    return num*factorial(num-1)
  }
 
function RockPaperScissors(num){
  var words=['Rock','Paper','scissors'];
  var ran;
  var arr=[];
  var arr2=[];

  for(var j=num; j>0;j--){

    for (var  i= 0; i < words.length; i++) {
      var ran=words[Math.floor(Math.random()*words.length)]
      arr.push(ran);
    }
    arr2.push(arr);
  }

return arr2;

}


// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:


// recursive reimplementation of JSON.stringify
var stringifyJSON = function(obj) {

  // null
  if (obj === null) {
    return "null";
  }

  // unstringifiable - functions and undefined
  if (obj === undefined || obj.constructor === Function) { return; }

  // strings
  if (obj.constructor === String) {
    return '"' + obj + '"';
  }

  // arrays
  if (obj.constructor === Array) {
    if (obj.length) {
      var partialJSON = [];

      for (var i = 0; i < obj.length; i++) {
        partialJSON.push(stringifyJSON(obj[i])); // recursion
    }

    return '[' + partialJSON.join(",") + ']';
} else {
  return '[]';
}
} 

  // objects
  if (obj.constructor === Object) {
    var keys = Object.keys(obj);
    if (keys.length) {
      var partialJSON = '';


      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        if (!key || obj[key] === undefined || typeof key === 'function' || typeof obj[key] === 'function') {

        } else {
          if (i === keys.length - 1) {
            partialJSON += stringifyJSON(key) + ':' + stringifyJSON(obj[key]); // recursion
        } else {
            partialJSON += stringifyJSON(key) + ':' + stringifyJSON(obj[key]) + ','; // recursion
        }
    }
}
return '{' + partialJSON + '}';
} else {
  return '{}';
}
}

  // everything else (numbers, booleans, etc.)
  return obj.toString();

};



/**
 * Given a single input string, write a function that outputs an array of strings with every possible
 * combination of letters.
 *
 * At first, don't worry about repeated (duplicate) strings.
 *
 * What time complexity is your solution?
 *
 * Extra credit: De-duplicate your return array without using uniq().
 */

/**
  * example usage:
  * var anagrams = allAnagrams('abc');
  * console.log(anagrams); // [ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ]
  */
// ran=words[Math.floor(Math.random()*words.length)]


// var allAnagrams = function(string) {
//   var word='';
//   var str=string.split('');
//   var arr=[],arr2=[];
//   var len=(str.length*str.length-1)+1;
//   for (var i = 0; i <len; i++) {
//      for (var i = 0; i < str.length; i++) {
//          var r=str[Math.floor(Math.random()*str.length)]
//          //word+=r      }
//      arr.push(word);
  
//   }
//   return arr;

// }


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


  ////////////////






  var Queue = function() {
  var someInstance = {};
  var size=0;
  var count=1;
  // Use an object with numeric keys to store values
  var storage = {};

  // Implement the methods below

  someInstance.enqueue = function(value) {
    size++
    storage[size]=value;

    return storage
  };

  someInstance.dequeue = function() {
    if(storage[size]!==undefined){
       var temp=storage[count]
    delete storage[count];
    size-- 
   count++

    return temp
  }
  return 0
  };

  someInstance.size = function() {
    return size
  };

  return someInstance;
};

  
 
  /**
 * Write a function `commonCharacters(str1, str2)` which takes two strings as arguments and returns a
 * string containing the characters found in both strings (without duplication), in the
 * order that they appeared in `str1`. Remember to skip spaces and characters you
 * have already encountered!
 *
 * Example: commonCharacters('acexivou', 'aegihobu')
 * Returns: 'aeiou'
 *
 * Extra credit: Extend your function to handle more than two input strings.
 */

//Works for any number of input strings:
var commonCharacters = function(string1, string2) {
  var str1 = string1.split('');
  var str2 = string2.split('');
  var arr  = [];
  var arr2 = [];
  var args = Array.prototype.slice.call(arguments);
    // args.sort();

    // first caes - two strings
  str1.forEach(function(element){
    str2.forEach(function(element2){
      if (element===element2) {
        arr.push(element)
      }
    })
  })

   var f= arr.join('');


      //second case more than two 
  if (arguments.length>2) {
      args.forEach(function(str){
        str.split('').forEach(function(element){
          arr.join('').forEach(function(element2){
              if (element===element2) {
                 arr2.push(element)
               }
          })
        })
      })
    
      }
  return f,arr2.join('');
  
};



/*
 * Bubble sort is the most basic sorting algorithm in all of Computer
 * Sciencedom. It works by starting at the first element of an array and
 * comparing it to the second element; if the first element is greater than the
 * second element, it swaps the two. It then compares the second to the third,
 * and the third to the fourth, and so on; in this way, the largest values
 * "bubble" to the end of the array. Once it gets to the end of the array, it
 * starts over and repeats the process until the array is sorted numerically.
 *
 * Implement a function that takes an array and sorts it using this technique.
 * Don't use JavaScript's built-in sorting function (Array.prototype.sort).
 *
 * QUERY: What's the time complexity of your algorithm? If you don't already
 * know, try to intuit this without consulting the Googles.
 *
 * Extra credit: Optimization time! During any given pass, if no elements are
 * swapped we can assume the list is sorted and can exit the function early.
 * After this optimization, what is the time complexity of your algorithm?
 *
 * More credits: Do you need to consider every element every time you iterate
 * through the array? Again: Has the time complexity of your algorithm changed?
*/

  var a = [34, 203, 3, 746, 200, 984, 198, 764, 9];
/*
 * Example usage:
 * bubbleSort([2, 1, 3]); // yields [1, 2, 3]
 *
*/

// Feel free to add helper functions if needed

var bubbleSort = function(array) {
  var swapped;
  do{
    swapped=false
    for (var i = 0; i < array.length-1; i++) {
      if (array[i]>array[i+1]) {
        var temp=array[i];
        array[i]=array[i+1];
        array[i+1]=temp
        swapped=true

      }
          }

  }while(swapped)
  return array
  
};

/*

// Remember to look here http://visualgo.net/sorting
*/


/*
*
* Given an array representing prices of the stock on different days, 
* find the maximum profit that can be earned by performing maximum of 
* one transaction. A transaction consists of activity of buying and 
* selling the stock on different or same days.
*
*/

/*
*
* For example in this array - {100, 80, 120, 130, 70, 60, 100, 125} 
* the price of the stock on day-1 is 100, on day-2 is 80 and so on.
* The maximum profit that could be earned in this window is 65 
* (buy at 60 and sell at 125).
* For price array - {100, 80, 70, 65, 60, 55, 50}, maximum profit 
* that could be earned is 0.
*
*/

// Feel free to add helper functions if needed
function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}
function getMinOfArray(numArray) {
  return Math.min.apply(null, numArray);
}
// not correct -yet- .
var maximumProfit  = function(array) {
  var m,result;
  var arr=array
    array.forEach(function(element){
       m=getMaxOfArray(array.splice(1));
       if (m > element) {
         return result=m-element
       }
         result= 0;
  })
    return result
  //your code is here
}