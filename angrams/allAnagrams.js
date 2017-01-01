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
//______________________________________________________
var allAnagrams = function(string) {
	var t="",arr=[],l=string.length,a=string.split("");
	for(var i=0;i<l*2;i++){
		if(i%2===0){
           t=a[0];
           a[0]=a[1];
           a[1]=t;
			arr.push(a.join(""))
		}
		else{
			t=a[l-1];
			a[l-1]=a[l-2];
			a[l-2]=t;
			arr.push(a.join(""));
		}
	}
	return arr.sort();
};
//_____________________________________________________
function convert(arr){
	var t="",result=arr.join(""),l=arr.length;
	for(var i=1;i<l-1;i++){
		t=arr[i];
		arr[i]=arr[l-1];
		arr[l-1]=t;
        result+=arr.join("")+" ";
	}
	return result.slice(0,-1);
};
function allAnagrams2(string){
	var arr=string.split(""),result=[],s="",a=[];
	var l=arr.length;
	s=convert(arr);
	a=s.split(" ");
    for(var i=0;i<a.length;i++){
         	result.push(a[i]);
         }
	for(var j=1;j<l;j++){
         t=arr[j];
         arr.splice(j,1);
         arr.unshift(t);
         s=convert(arr);
         a=s.split(" ");
         for(var i=0;i<a.length;i++){
         	result.push(a[i]);
         }
         
	}
	return result.sort();

}
//_________________________________________