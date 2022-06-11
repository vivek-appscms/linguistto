const loremGenForm = document.getElementById("loremGenerator-form");
const loremGenBtn = document.getElementById("lorem-gen-btn");
const loremCopyBtn = document.getElementById("copy-btn");
const loremGenContent = document.getElementById("lorem-gen-content");
const param = new URLSearchParams(window.location.search)
let count_ = param.get('count')
let option_ = param.get('option')
console.log(count_,option_)
let count = count_,
  option = option_,
  tempLoremCount = 0,
  tempOption = "";
  document.getElementById("loremoption").onchange = function(){
   if(   document.getElementById("gen_count").value>13){
    if(document.getElementsByName("gen_options")[0].value == "bytes"){
        document.getElementById("gen_count").setAttribute("max",'13')
        document.getElementById("gen_count").value= 13
    }else{
        document.getElementById("gen_count").setAttribute("max",'150')
    }
   }
};
   
function getloremValues() {
  loremGenContent.innerHTML =
    '<div class="loaderarea"><img class="loader" src="/spinner-loading (1).gif" width="200px" height="150px" alt=""></div>';
  count = parseInt(loremGenForm.gen_count.value);
  option = loremGenForm.gen_options.value;
  validateContent();
  let url = `../lorem.json`;
  fetchContent(url);
}
function validateContent() {
  if (option === "words") {
    [tempLoremCount, tempOption] = [count, option];
    [option, count] = ["paras", 150];
    if (tempLoremCount > 2000) {
      invalidLoremInput();
      tempLoremCount = 2000;
      loremGenForm.gen_count.value = "2000";
    } else if (tempLoremCount < 1 || isNaN(tempLoremCount)) {
      invalidLoremInput();
      tempLoremCount = 5;
      loremGenForm.gen_count.value = "5";
    }
  } else {
    tempLoremCount = "";
    if (count > 150) {
      invalidLoremInput();
      count = 150;
      loremGenForm.gen_count.value = "150";
    } else if (count < 1 || isNaN(count)) {
      invalidLoremInput();
      count = 5;
      loremGenForm.gen_count.value = "5";
    }
  }
}
function invalidLoremInput() {
  loremGenForm.gen_count.style.borderColor = "#ff6a67";
  setTimeout(() => {
    loremGenForm.gen_count.style.borderColor = "#d3dbe4";
  }, 1000);
}
async function fetchContent(url) {
  let response = await fetch(url);
  if (response.status === 200) {
    let data = await response.json();
    displayloremGenContent(data);
  } else {
    alert("An error occurred");
  }
}

function displayloremGenContent(data) {
  let n = document.getElementsByName("gen_count")[0].value;
  let randomURLS = new Array(n),
    len = data.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    randomURLS[n] = data[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  let texts = "";
  if (tempOption === "words") {
    tempOption = "";
    texts = randomURLS.join();
    if (tempLoremCount <= texts.length) {
      let textArray = texts.split(" ");
      let selectedText = textArray.splice(0, tempLoremCount).join(" ");
      loremGenContent.innerHTML = selectedText + ".";
      return;
    }
  }else if(option == "bytes"){
    document.getElementById("gen_count").setAttribute("max",'13')
    texts = randomURLS.toString();
    var bytes = texts.split(" ");
    var res  = bytes.filter((item) => item.length == document.getElementsByName("gen_count")[0].value);
    loremGenContent.innerHTML = res[Math.floor(Math.random() * res.length)];
  }else if(option == 'lists'){
    setTimeout(() => {
        loremGenContent.innerHTML = "";
        texts = randomURLS.join("<br>");
        var finaldata = texts.split("<br>");
        for (let i = 0; i < finaldata.length; i++) {
          var p = document.createElement("p");
          p.setAttribute("class", "col-md-12 txt-secondary");
          p.innerText = finaldata[i];
          var list = finaldata[i].split(".");
          var ul = document.createElement("ul");
          for (let a1 = 0; a1 < list.length-1; a1++) {
             var li = document.createElement("li")
             li.innerHTML= list[a1]+'.'
             ul.appendChild(li)
          }
          loremGenContent.appendChild(ul);
        }
      }, 1000);
  } else {
    setTimeout(() => {
      loremGenContent.innerHTML = "";
      texts = randomURLS.join("<br>");
      var finaldata = texts.split("<br>");
      for (let i = 0; i < finaldata.length; i++) {
        var p = document.createElement("p");
        p.setAttribute("class", "col-md-12 txt-secondary");
        p.innerText = finaldata[i];
        loremGenContent.appendChild(p);
      }
    }, 1000);
  }
}
getloremValues()

// event listeners
loremGenBtn.addEventListener("click", getloremValues);
window.addEventListener("DOMContentLoaded", getloremValues);
loremCopyBtn.addEventListener("click", copyToClipboard);
