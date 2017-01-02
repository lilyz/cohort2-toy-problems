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

  var allAnagrams = function(string) {
  //	var arr=string.split("")
  var ciriar=[]
  for(var i = 0 ; i<string.length;i++){
  	for(var j=0;j<string.length;j++){
  		for(var k=0;k<string.length;k++){
  			ciriar.push(string[i]+string[j]+string[k])
  			if(ciriar[i])
  		}

  }
}
return ciriar
};



  //////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                      //  A2
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
function allang(str){
	if(str.length<2){
		return [str]
	}
	var arr=[]
	var world;
	var selc;
	var aft;
	for(var i=0;i<str.length;i++){
		 world=str[i]
		 // selc=str.slice(0,i)
		 // aft=str[i+1]
		 // arr=allang(world,aft,selc)
		 woo=str.substr(0,i)+str.supstr(i+1,str.length-1)
		myin=allang(woo)
		for(var j=0;j<myin.length;i++){
			arr.push(world+myin[j])
		}
	}

	return arr
}
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     //   from internet
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  function allAnagrams (word) {
  	if (word.length < 2) {
  		return [word];
  	} else {
  		var allAnswers = [];
  		for (var i = 0; i < word.length; i++) {
  			var letter = word[i];
  			var shorterWord = word.substr(0, i) + word.substr(i + 1, word.length - 1);
  			var shortwordArray = allAnagrams(shorterWord);
  			for (var j = 0; j < shortwordArray.length; j++) {
  				allAnswers.push(letter + shortwordArray[j]);
  			}
  		}
  		return a
  		+llAnswers;
  	}
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                     //   ANOTHER TRAY 
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  function all(str){
  	var arr=[]
  	for(var i=0;i<str.length;i++){
  		var first=str[i]
  		var  last=str[str.length-1]
  		var midill=str[str.length/2+1]
  		var ong=all(last+midill)
  		for(var k=0;k<ong.length;k++){
  			arr.push(first+ong[k])
  		}
  	}
  	return arr
  }

function allavg(str){
  var string=stringv
  var arr=[]
  for(var i=0<str.length;i++){
    for(var k=0;k<string.length;k++){
    str=str.split("")
    str[i]=string[k]
    arr.push(str[i])
    }
  }
  return arr
}



