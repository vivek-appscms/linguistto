
let script_ = document.currentScript
let fileName_ = script_.dataset.filename
const params_ = new URLSearchParams(window.location.search)

function translatecontentNext(){
  if (input_editor.getValue() == '') {
    console.error("failed")
  } else {
    localStorage.setItem('translation_content', input_editor.getValue());
    window.location = window.location.href + "/" + "result" + '?' + '&fileName' + "=" + btoa(fileName_);
  }
}




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
    for (let i_six = 0; i_six < document.querySelectorAll(".CodeMirror-line span").length; i_six++) {
      document.querySelectorAll(".CodeMirror-line span")[i_six].style.fontSize = size;
    } 
  }
  function font_family_fun(family){
    for (let i_fam = 0; i_fam < document.querySelectorAll(".CodeMirror-line span").length; i_fam++) {
      document.querySelectorAll(".CodeMirror-line span")[i_fam].style.fontFamily = family;
    } 
  }
  
  document.getElementById("clear_button").addEventListener("click", ()=>{
    input_editor.setValue(' ') 
    output_editor.setValue(' ')
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
  document.getElementById("readtime2").innerHTML='0 min'
  document.getElementById("speaktime2").innerHTML='0 min'
  document.getElementById("speaktime1").innerHTML='0 min'
  }); 
  
  var input = input_editor.getValue(),
  characterCount1 = document.querySelector('#characterCount1'),
  characterCount2 = document.querySelector('#characterCount2'),
  wordCount1 = document.querySelector('#wordCount1'),
  wordCount2 = document.querySelector('#wordCount2'),
  sentenceCount1 = document.querySelector('#sentenceCount1'),
  sentenceCount2 = document.querySelector('#sentenceCount2'),
  paragraphCount1 = document.querySelector('#paragraphCount1'),
  paragraphCount2 = document.querySelector('#paragraphCount2'),
  input1 = output_editor.getValue();
  
  input_editor.on("keyup", function() {
  characterCount1.innerHTML = input_editor.getValue().length;
  var words = input_editor.getValue().match(/\b[-?(\w+)?]+\b/gi);
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
    var sentences = input.split(/[.|!|?]+/g);
    sentenceCount1.innerHTML = sentences.length - 1;
  } else {
    sentenceCount1.innerHTML = 0;
  }
  if (words) {
    var paragraphs = input.replace(/\n$/gm, '').split(/\n/);
    paragraphCount1.innerHTML = paragraphs.length;
  } else {
    paragraphCount1.innerHTML = 0;
  }
  });
  

  output_editor.on("keyup",()=>{
    characterCount2.innerHTML = input1.length;
    var words = input1.match(/\b[-?(\w+)?]+\b/gi);
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
      var sentences = input1.split(/[.|!|?]+/g);
      sentenceCount2.innerHTML = sentences.length - 1;
    } else {
      sentenceCount2.innerHTML = 0;
    }
    if (words) {
      var paragraphs = input1.replace(/\n$/gm, '').split(/\n/);
      paragraphCount2.innerHTML = paragraphs.length;
    } else {
      paragraphCount2.innerHTML = 0;
    }
  })
  
  input_editor.on("keyup", ()=>{
    // if (e.keyCode == 32) {
      for (let a = 0; a < document.getElementsByClassName("keyword__placeholder-text").length; a++) {
        document.getElementsByClassName("keyword__placeholder-text")[a].style.display = "none";
      }
      document.getElementById("tbody1").innerHTML = "";
      let counts = [];
      let keys = [];
      var wordcount = [];
      var tbody = document.getElementById("tbody1");
      var wordcount = input_editor.getValue();
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
  })
  output_editor.on("keyup", ()=>{
    // if (e.keyCode == 32) {
      for (let a = 0; a < document.getElementsByClassName("keyword__placeholder-text").length; a++) {
        document.getElementsByClassName("keyword__placeholder-text")[a].style.display = "none";
      }
      document.getElementById("tbody2").innerHTML = "";
      let counts = [];
      let keys = [];
      var wordcount = [];
      var tbody = document.getElementById("tbody2");
      var wordcount = output_editor.getValue();
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
  })
