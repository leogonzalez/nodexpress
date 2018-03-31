var t0 = process.hrtime();

var tmp =0;

var someN = [0,1,2,3,4,5,6,7,8,9];

// for (var p = 0; p < 10000; p++) {
//   for (var i = 0; i < someN.length; i++) {
//     ++tmp;
//   }
// }
//
for (var p = 0; p < 10000; p++) {
  for (var i = someN.length; i > 0 ; i--) {
    ++tmp;
  }
}

console.log(tmp);
var t1 = process.hrtime(t0);
console.log(`Elapsed time: ${t1[0]}s ${t1[1]/1000000}ms`);
