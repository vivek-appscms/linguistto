var strOutput = []
const getScript = document.currentScript
const from = getScript.dataset.from
const to = getScript.dataset.to
// console.log(from, to)
async function getapi(url) {
  document.querySelector('.buttonClass').innerText = 'Please wait..'
  const response = await fetch(url)
  let data = await response.json()

  document.querySelector('.buttonClass').innerText = 'Translate'

  if (data) {
    data &&
      data[0].map((item) => {
        item[0].length > 0 && strOutput.push(item[0])
      })
  }

  strOutput = strOutput.toString()
  return strOutput
}
async function getInputValue() {
  strOutput = []
  var inputString = document.getElementById('input-string').value
  if (inputString) {
    var outputStr = await translateFunction(inputString, from, to)
    document.getElementById('output-string').value = outputStr.replace(
      /['",]+/g,
      ''
    )
  } else {
    console.clear()
  }
  paraprashstyle();
  word_count();
}

// reset input fiels
function resetInputValue() {
  document.getElementById('input-string').value = ''
  document.getElementById('output-string').value = ''
}
async function translateFunction(string, sl, tl) {
  try {
    const api_url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q='${string}'`
    return await getapi(api_url)
  } catch (error) {
    try {
      const api_url = `/.netlify/functions/translation/?baselocalecode=${sl}&datalanguagecode=${tl}&value=${string}`
      return await getapi(api_url)
    } catch (error) {
      console.log(error)
    }
  }
}


//////////////////
// clipboard
function clipboardHandler(id) {
  let copyTextarea = document.getElementById(id);
  copyTextarea.focus();
  copyTextarea.select();
  try {
      document.execCommand('copy');
  } catch (err) {
      console.log('Oops, unable to copy');
  }
};
//.netlify/functions/paraphrase/
//http://127.0.0.1:9000/paraphrase/


function active_buttonkk(active_button){
if(document.getElementById(active_button).style.display == 'none'){
  document.getElementById(active_button).style.display = 'block';
  }
}
function diavtivate_button(active_button){
if(document.getElementById(active_button).style.display == 'block'){
  document.getElementById(active_button).style.display = 'none';
  }
}
function display_flex(active_button){
if(document.getElementById(active_button).style.display == 'none'){
  document.getElementById(active_button).style.display = 'flex';
  }else{
  document.getElementById(active_button).style.display = 'none';
  }
}
function display_none(active_button){
if(document.getElementById(active_button).style.display == 'flex'){
  document.getElementById(active_button).style.display = 'nonde';
  }
}
function font_size_fun(size){
document.getElementById("input-string").style.fontSize = size
document.getElementById("output-string").style.fontSize = size
}
function font_family_fun(family){
document.getElementById("input-string").style.fontFamily = family
document.getElementById("output-string").style.fontFamily = family
}
document.getElementById("active_button").addEventListener("click", ()=>{
var value = document.getElementById("active_text");
 if( value.innerHTML == "Autosave is OFF"){
value.innerHTML = "Autosave is ON"
 }else{
value.innerHTML = "Autosave is OFF"
 }
});

document.getElementById("clear_button").addEventListener("click", ()=>{
document.getElementById("input-string").value = ""
document.getElementById("output-string").value = ""
document.getElementById("tbody1").innerHTML=""
document.getElementById("tbody2").innerHTML=""
document.getElementById("wordCount1").innerHTML=0
document.getElementById("wordCount2").innerHTML=0
document.getElementById("characterCount1").innerHTML=0
document.getElementById("characterCount2").innerHTML=0
document.getElementById("sentenceCount1").innerHTML=0
document.getElementById("sentenceCount2").innerHTML=0
document.getElementById("paragraphCount1").innerHTML=0
document.getElementById("paragraphCount2").innerHTML=0
document.getElementById("readtime1").innerHTML='0 min'
document.getElementById("readtime1").innerHTML='0 min'
document.getElementById("speaktime2").innerHTML='0 min'
document.getElementById("speaktime2").innerHTML='0 min'
}); 

var input = document.querySelector('#input-string'),
characterCount1 = document.querySelector('#characterCount1'),
characterCount2 = document.querySelector('#characterCount2'),
wordCount1 = document.querySelector('#wordCount1'),
wordCount2 = document.querySelector('#wordCount2'),
sentenceCount1 = document.querySelector('#sentenceCount1'),
sentenceCount2 = document.querySelector('#sentenceCount2'),
paragraphCount1 = document.querySelector('#paragraphCount1'),
paragraphCount2 = document.querySelector('#paragraphCount2'),
input1 = document.querySelector('#output-string')

input.addEventListener('keyup', function() {
characterCount1.innerHTML = input.value.length;
var words = input.value.match(/\b[-?(\w+)?]+\b/gi);
if (words) {
  wordCount1.innerHTML = words.length;
const wordsPerMinute = 200; // Average case.
const wordsSpeakMinute = 230; // Average case.
let result,result2;
if(words.length > 0){
  let value = Math.ceil(words.length / wordsPerMinute);
  result = `~${value} min`;
}
if(words.length > 0){
  let value2 = Math.ceil(words.length / wordsSpeakMinute);
  result2 = `~${value2} min`;
}
document.getElementById("readtime1").innerText = `${result}`;
document.getElementById("speaktime1").innerText = `${result2}`;
} else {
  wordCount1.innerHTML = 0;
}
if (words) {
  var sentences = input.value.split(/[.|!|?]+/g);
  sentenceCount1.innerHTML = sentences.length - 1;
} else {
  sentenceCount1.innerHTML = 0;
}
if (words) {
  var paragraphs = input.value.replace(/\n$/gm, '').split(/\n/);
  paragraphCount1.innerHTML = paragraphs.length;
} else {
  paragraphCount1.innerHTML = 0;
}
});


function paraprashstyle(){
  characterCount2.innerHTML = input1.value.length;
  var words = input1.value.match(/\b[-?(\w+)?]+\b/gi);
  if (words) {
    wordCount2.innerHTML = words.length;
  const wordsPerMinute = 200; // Average case.
  const wordsSpeakMinute = 230; // Average case.
  let result,result2;
  if(words.length > 0){
    let value = Math.ceil(words.length / wordsPerMinute);
    result = `~${value} min`;
  }
  if(words.length > 0){
    let value2 = Math.ceil(words.length / wordsSpeakMinute);
    result2 = `~${value2} min`;
  }
  document.getElementById("readtime2").innerText = `${result}`;
  document.getElementById("speaktime2").innerText = `${result2}`;
  } else {
    wordCount2.innerHTML = 0;
  }
  if (words) {
    var sentences = input1.value.split(/[.|!|?]+/g);
    sentenceCount2.innerHTML = sentences.length - 1;
  } else {
    sentenceCount2.innerHTML = 0;
  }
  if (words) {
    var paragraphs = input1.value.replace(/\n$/gm, '').split(/\n/);
    paragraphCount2.innerHTML = paragraphs.length;
  } else {
    paragraphCount2.innerHTML = 0;
  }
}
document.getElementById("output-string").addEventListener("keyup",()=>{
  characterCount2.innerHTML = input1.value.length;
  var words = input1.value.match(/\b[-?(\w+)?]+\b/gi);
  if (words) {
    wordCount2.innerHTML = words.length;
  const wordsPerMinute = 200; // Average case.
  const wordsSpeakMinute = 230; // Average case.
  let result,result2;
  if(words.length > 0){
    let value = Math.ceil(words.length / wordsPerMinute);
    result = `~${value} min`;
  }
  if(words.length > 0){
    let value2 = Math.ceil(words.length / wordsSpeakMinute);
    result2 = `~${value2} min`;
  }
  document.getElementById("readtime2").innerText = `${result}`;
  document.getElementById("speaktime2").innerText = `${result2}`;
  } else {
    wordCount2.innerHTML = 0;
  }
  if (words) {
    var sentences = input1.value.split(/[.|!|?]+/g);
    sentenceCount2.innerHTML = sentences.length - 1;
  } else {
    sentenceCount2.innerHTML = 0;
  }
  if (words) {
    var paragraphs = input1.value.replace(/\n$/gm, '').split(/\n/);
    paragraphCount2.innerHTML = paragraphs.length;
  } else {
    paragraphCount2.innerHTML = 0;
  }
})

function word_count() {
  for (let a = 0; a < document.getElementsByClassName("keyword__placeholder-text").length; a++) {
    document.getElementsByClassName("keyword__placeholder-text")[a].style.display = "none";
  }
  document.getElementById("tbody2").innerHTML = "";
  let counts = [];
  let keys = [];
  var wordcount = [];
  var tbody = document.getElementById("tbody2");
  var wordcount = document.getElementById("output-string").value;
  var token = wordcount.split(" ");
  for (let i = 0; i < token.length; i++) {
    var word = token[i].toLowerCase();
    if (!/\d+/.test(word)) {
      if (counts[word] === undefined) {
        console.log("hello couter");
        counts[word] = 1;
        keys.push(word);
      } else {
        counts[word] = counts[word] + 1;
      }
    }
  }
  console.log(keys);
  keys.sort(compare);
  function compare(a, b) {
    var countA = counts[a];
    var countB = counts[b];
    return countB - countA;
  }
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (!key == "") {
      let tr = document.createElement("tr");
      let td = document.createElement("td");
      let td2 = document.createElement("td");

      td.innerHTML = `${key}`;
      td2.innerHTML = `${counts[key]}`;

      tr.appendChild(td);
      tr.appendChild(td2);
      tbody.appendChild(tr);
      console.log(keys);
    }
  }
}
document.getElementById("input-string").onkeyup = function (e) {
  // if (e.keyCode == 32) {
    for (let a = 0; a < document.getElementsByClassName("keyword__placeholder-text").length; a++) {
      document.getElementsByClassName("keyword__placeholder-text")[a].style.display = "none";
    }
    document.getElementById("tbody1").innerHTML = "";
    let counts = [];
    let keys = [];
    var wordcount = [];
    var tbody = document.getElementById("tbody1");
    var wordcount = document.getElementById("input-string").value;
    var token = wordcount.split(" ");
    for (let i = 0; i < token.length; i++) {
      var word = token[i].toLowerCase();
      if (!/\d+/.test(word)) {
        if (counts[word] === undefined) {
          counts[word] = 1;
          keys.push(word);
        } else {
          counts[word] = counts[word] + 1;
        }
      }
    }
    console.log(keys);
    keys.sort(compare);
    function compare(a, b) {
      var countA = counts[a];
      var countB = counts[b];
      return countB - countA;
    }
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      if (!key == "") {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        let td2 = document.createElement("td");

        td.innerHTML = `${key}`;
        td2.innerHTML = `${counts[key]}`;

        tr.appendChild(td);
        tr.appendChild(td2);
        tbody.appendChild(tr);
        console.log(keys);
      }
    }
  // }
};
document.getElementById("output-string").onkeyup = function (e) {
  // if (e.keyCode == 32) {
    for (let a = 0; a < document.getElementsByClassName("keyword__placeholder-text").length; a++) {
      document.getElementsByClassName("keyword__placeholder-text")[a].style.display = "none";
    }
    document.getElementById("tbody2").innerHTML = "";
    let counts = [];
    let keys = [];
    var wordcount = [];
    var tbody = document.getElementById("tbody2");
    var wordcount = document.getElementById("output-string").value;
    var token = wordcount.split(" ");
    for (let i = 0; i < token.length; i++) {
      var word = token[i].toLowerCase();
      if (!/\d+/.test(word)) {
        if (counts[word] === undefined) {
          counts[word] = 1;
          keys.push(word);
        } else {
          counts[word] = counts[word] + 1;
        }
      }
    }
    console.log(keys);
    keys.sort(compare);
    function compare(a, b) {
      var countA = counts[a];
      var countB = counts[b];
      return countB - countA;
    }
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      if (!key == "") {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        let td2 = document.createElement("td");

        td.innerHTML = `${key}`;
        td2.innerHTML = `${counts[key]}`;

        tr.appendChild(td);
        tr.appendChild(td2);
        tbody.appendChild(tr);
        console.log(keys);
      }
    // }
  }
};