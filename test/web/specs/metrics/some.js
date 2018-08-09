var arr1 = ['b', 'a', 'c', 'd', 'f'];
// var arr1 = ['f', 'd', 'c', 'b', 'a'];
var arr2 = ['f', 'd', 'c', 'b', 'a'];
console.log(arr2.filter(function(item){
  return item != 'c'
}))

let found = !arr1.some(r => !arr2.includes(r))
console.log(JSON.stringify(arr1), '==', JSON.stringify(arr2), JSON.stringify(arr1) == JSON.stringify(arr2))
// console.log(JSON.stringify(arr1) == JSON.stringify(arr2))


const mysort = ['0lD4J', 'DVNK4rA1aIf', 'Lcl', 'Nnly93c', 'arFpzIgD'];
const devsort = ['0lD4J', 'arFpzIgD', 'DVNK4rA1aIf', 'Lcl', 'Nnly93c'];

// function alphabetical(a, b) {
//   // Use localeCompare.
//   return a.localeCompare(b);
// }
const alphabetical = (a, b) => a.toLowerCase().localeCompare(b.toLowerCase());

console.log('my  ', mysort.alphabetical())
console.log('dev ', devsort)