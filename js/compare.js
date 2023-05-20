let script_ = document.getElementById("getvalue")
let fileName_ = script_.dataset.filename;
function OpenNewParagraph(){
     if(localStorage.getItem("firstfile") != null && localStorage.getItem("secondtfile") != null){
          document.querySelector('.error').style.display='none';
          window.location = window.location.href + "/" + "result" + '?' +"&"+'fileName' + "=" + btoa(fileName_);
}else{
     document.querySelector('.error').style.display='block';
}
}
let type1 = 'file1';
let type2 = 'file2';
let chose = document.querySelectorAll('.chose');
for (let i = 0; i < chose.length; i++) {
     chose[i].addEventListener("click",(e)=>{
     chose[0].setAttribute("class","chose");
     chose[1].setAttribute("class","chose");
     e.target.setAttribute("class","active")
       if(e.target.dataset.set == 'url1'){
          document.getElementById('a').style.display = "block"
          document.getElementById('filearea').style.display = "none"
          type1 = 'url1';
       }else{
          type1 = 'file1';
          document.getElementById('a').style.display = "none"
          document.getElementById('filearea').style.display = "block"
          letting()
       }
     })
}
let chose1 = document.querySelectorAll('.chose1');
for (let i = 0; i < chose.length; i++) {
     chose1[i].addEventListener("click",(e)=>{
          chose1[0].setAttribute("class","chose1");
          chose1[1].setAttribute("class","chose1");
     e.target.setAttribute("class","active")
       if(e.target.dataset.set == 'url2'){
          type2 = 'url'
        document.getElementById('b').style.display = "block"
        document.getElementById('filearea1').style.display = "none"
       }else{
          type2 = 'file2'
          document.getElementById('b').style.display = "none"
          document.getElementById('filearea1').style.display = "block"
          letting()
       }
     })
}
function letting (){
     if(type1=='url1'){
          let url = document.getElementById('urlfirst').value;
          const xhttp = new XMLHttpRequest();
          xhttp.onload = function() {
               console.log(this.responseText)
               localStorage.setItem('firstfile',this.responseText)
          }
          xhttp.open("GET", url);
          xhttp.send();
     }else if(type1=='file1'){
     $(document).ready(function(){
          $("#firstfile").on('change',function(e){
               document.querySelectorAll(".btn_div")[0].innerHTML = "";
               var fr = new FileReader();
                    fr.onload = function() {
                         localStorage.setItem('firstfile',fr.result)
                    }
               fr.readAsText(this.files[0]);
               document.querySelectorAll(".btn_div")[0].innerHTML = e.target.files[0].name;
          });
      });
     }
     if(type2 == 'url2'){
          let url = document.getElementById('urlsecond').value;
          const xhttp = new XMLHttpRequest();
          xhttp.onload = function() {
               console.log(xhttp.responseText)
               localStorage.setItem('secondtfile',xhttp.responseText)
          }
          xhttp.open("GET", url);
          xhttp.send();
     }else if(type2 == 'file2'){
     $(document).ready(function(){
          $("#secondtfile").on('change',function(e){
               document.querySelectorAll(".btn_div")[1].innerHTML = "";
               var fr = new FileReader();
                    fr.onload = function() {
                         localStorage.setItem('secondtfile',fr.result)
                    }
               fr.readAsText(this.files[0]);
               document.querySelectorAll(".btn_div")[1].innerHTML = e.target.files[0].name;
          });
      });
     }
}
letting();
$(document).ready(function(){
     $("#firstfile").on('change',function(e){
          document.querySelectorAll(".btn_div")[0].innerHTML = "";
          var fr = new FileReader();
               fr.onload = function() {
                    localStorage.setItem('firstfile',fr.result)
               }
          fr.readAsText(this.files[0]);
          document.querySelectorAll(".btn_div")[0].innerHTML = e.target.files[0].name;
     });
 });
$(document).ready(function(){
     $("#secondtfile").on('change',function(e){
          document.querySelectorAll(".btn_div")[1].innerHTML = "";
          var fr = new FileReader();
               fr.onload = function() {
                    localStorage.setItem('secondtfile',fr.result)
               }
          fr.readAsText(this.files[0]);
          document.querySelectorAll(".btn_div")[1].innerHTML = e.target.files[0].name;
     });
 });
