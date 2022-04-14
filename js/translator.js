const _getScript = document.getElementById("get-value");
const language_ = _getScript.dataset.language;
const button_ = document.getElementById('btn')
let script_ = document.currentScript
let fileName_ = script_.dataset.filename
const params_ = new URLSearchParams(window.location.search)

button_.addEventListener("click", (e) => {
  e.preventDefault()
  if (input_editor.getValue() == '') {
    console.error("failed")
  } else {
    localStorage.setItem('translitration_content', input_editor.getValue());
    window.location = window.location.href  + "result" + '?' + '&fileName' + "=" + btoa(fileName_);
  }
})



////
//clipboard

function clipboardHandler() {
    const el = document.createElement("textarea");
    el.value = input_editor.getValue();
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.getElementById("copy").title="copid !"
  };

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
	input_editor.setValue('')
	document.getElementById("tbody1").innerHTML=""
	document.getElementById("wordCount").innerHTML=0
	document.getElementById("characterCount").innerHTML=0
	document.getElementById("sentenceCount").innerHTML=0
	document.getElementById("paragraphCount").innerHTML=0
	document.getElementById("readtime").innerHTML='0 min'
	document.getElementById("speaktime").innerHTML='0 min'
}); 
 
var input = input_editor,
  characterCount = document.querySelector('#characterCount'),
  wordCount = document.querySelector('#wordCount'),
  sentenceCount = document.querySelector('#sentenceCount'),
  paragraphCount = document.querySelector('#paragraphCount')

  input_editor.on("keyup",  function() {
    let inputString = input_editor.getValue();

    if (inputString[inputString.length - 1] == " " || event == "transliterateButton") {
        fetch(`https://www.google.com/inputtools/request?text=${inputString}&ime=transliteration_en_${language_}`)
            .then(res => res.json())
            .then(result => {
                  var relt = result[1][0][1][0]
                input_editor.setValue(relt)
            })
    }
  characterCount.innerHTML = input.getValue().length;
  var words = input.getValue().match(/\b[-?(\w+)?]+\b/gi);
  if (words) {
    wordCount.innerHTML = words.length;
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
	document.getElementById("readtime").innerText = `${result}`;
	document.getElementById("speaktime").innerText = `${result2}`;
  } else {
    wordCount.innerHTML = 0;
  }
  if (words) {
    var sentences = input.getValue().split(/[.|!|?]+/g);
    sentenceCount.innerHTML = sentences.length - 1;
  } else {
    sentenceCount.innerHTML = 0;
  }
  if (words) {
    var paragraphs = input.getValue().replace(/\n$/gm, '').split(/\n/);
    paragraphCount.innerHTML = paragraphs.length;
  } else {
    paragraphCount.innerHTML = 0;
  }
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
});

///////
function word_count(){
	document.getElementsByClassName("keyword__placeholder-text")[0].style.display="none"
	document.getElementById("tbody1").innerHTML = ''
	let counts = []
	let keys = []
	var wordcount = [];
	var tbody = document.getElementById("tbody1");
	var wordcount = input_editor.getValue();
	var token = wordcount.split(' ');
	for (let i = 0; i < token.length; i++) {
	 var word = token[i].toLowerCase();
	if (!/\d+/.test(word)) {
	  if (counts[word] === undefined) {
		counts[word] = 1
		keys.push(word)
	  } else {
		counts[word] = counts[word] + 1
	  }
	}
	  
	}
	console.log(keys)
	keys.sort(compare);
	function compare(a,b){
	  var countA = counts[a];
	  var countB = counts[b];
	  return countB - countA;
	}
	 for (let i = 0; i < keys.length; i++) {
	  let key = keys[i]
	  if (!key == '') {
		let tr = document.createElement('tr')
		let td = document.createElement('td')
		let td2 = document.createElement('td')
	
		td.innerHTML = `${key}`
		td2.innerHTML = `${counts[key]}`
	
		tr.appendChild(td)
		tr.appendChild(td2)
		tbody.appendChild(tr)
		console.log(keys)
	  }
	}
}
