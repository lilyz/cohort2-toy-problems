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
function find_unique_characters( string ){
    var unique='';
    for(var i=0; i<string.length; i++){
        if(unique.indexOf(string[i])==-1){
            unique += string[i];
        }
    }
    return unique;
}

var commonCharacters = function(string1, string2) {
	var stack, string1Obj, string1ValsTemp;
	var args = Array.prototype.slice.call(arguments, 1);
	// I tried to use arguments, it failed me, I used so many for loops that
	// I went crazy. I will try again later to use a different method.

	stack = {}; string1Obj = {}; string1ValsTemp = "";

	for( var i = 0; i < string1.length; i++){
		string1Obj[ i ] = string1[ i ];
	}
	for (var j = 0; j < args.length; j++){
		for ( var k = 0; k < args[ j ].length; k++){
		for ( var key in string1Obj){
			if( args[ j ] [ k ] === string1Obj [ key ] && args [ j ] [ k ] !== string1ValsTemp [ k ]){
				string1ValsTemp += args [ j ] [ k ]
			}
		}
	}
	}
	return find_unique_characters(string1ValsTemp);
};


