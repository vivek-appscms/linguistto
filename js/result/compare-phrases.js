var a = document.getElementById('a');
var b = document.getElementById('b');
var result = document.getElementById('result');
const param = new URLSearchParams(window.location.search)
document.getElementById('a').value = localStorage.getItem("firstfile")
document.getElementById('b').value = localStorage.getItem("secondtfile")
let ty = ['diffChars','diffWords','diffLines']
// document.getElementById('updown').addEventListener('click',()=>{
//     let check = 2;
//      if(check%2==0){
//           document.getElementById('down').setAttribute('class','fa fa-chevron-down')
//      }else{
//           document.getElementById('down').setAttribute('class','fa fa-chevron-up')
//      }
// })
function changed() {
     var diff = JsDiff[ty[1]](document.getElementById('a').value, document.getElementById('b').value);
     var fragment = document.createDocumentFragment();
     for (var i = 0; i < diff.length; i++) {

          if (diff[i].added && diff[i + 1] && diff[i + 1].removed) {
               var swap = diff[i];
               diff[i] = diff[i + 1];
               diff[i + 1] = swap;
          }
          var node;
          if (diff[i].removed) {
               node = document.createElement('del');
               node.appendChild(document.createTextNode(diff[i].value));
          } else if (diff[i].added) {
               node = document.createElement('ins');
               node.appendChild(document.createTextNode(diff[i].value));
          } else {
               node = document.createElement('mat');
               node.appendChild(document.createTextNode(diff[i].value));
          }
          fragment.appendChild(node);


         setTimeout(() => {
          let mathched =  document.getElementById('result').getElementsByTagName('mat').length 
          let nonexist =  document.getElementById('result').getElementsByTagName('ins').length 
          let del =  document.getElementById('result').getElementsByTagName('del').length 
          let total = mathched+nonexist+del;
          document.getElementById('foundr').innerHTML = total
          document.getElementById('similar').innerHTML = mathched
          var xValues = [`Identical ${(mathched/total*100).toFixed(2)}`, `Minor changes ${(100 - mathched/total*100).toFixed(2)}`, `Non Matched ${(100 - del/total*100).toFixed(2)}`];
          var yValues = [(mathched/total*100).toFixed(2), (100 - mathched/total*100).toFixed(2), (100 - del/total*100).toFixed(2)];
          document.getElementById('matched_words').innerHTML = (mathched/total*100).toFixed(2)+'%'
          var barColors = [
          "#b91d47",
          "#00aba9",
          "#2b5797",
          ];

          new Chart("myChart", {
          type: "pie",
          data: {
          labels: xValues,
          datasets: [{
               backgroundColor: barColors,
               data: yValues
          }]
          },
          options: {
          responsive: true,
          maintainAspectRatio: false
          }
          });
         }, 100);
     }    
     // let total = right.join('').replace(/\s+/g, '');
     // let persecent = ""
     // // console.log(persecent)
     // debugger
     // if(( total.length- wrong.join('').length)/total.length*100 >0){
     //      persecent =  (total.length- wrong.join('').length)/total.length*100
     // }else{
     //      persecent =  (total.length)/total.length*100
     // }
     // document.getElementById('common').innerHTML = persecent.toFixed(2)
     // document.getElementById('ident').innerHTML = persecent.toFixed(2)+'%'
     // document.getElementById('changes').innerHTML = ((wrong.join('').length)/total.length*100).toFixed(2)+'%'
     result.textContent = '';
     result.appendChild(fragment);
     document.getElementById('results').style.display='block';
     document.querySelector('.loader.container').style.display='none';
}
// function onDiffTypeChange(radio) {
//      window.diffType = radio.value;
//      document.title = "Diff " + radio.value.slice(4);
// }
// var radio = document.getElementsByName('diff_type');
// for (var i = 0; i < radio.length; i++) {
//      radio[i].onchange = function (e) {
//           onDiffTypeChange(e.target);
//           changed();
//      }
// }
window.onload = function () {
     changed();
};
