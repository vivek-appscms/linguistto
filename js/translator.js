const _getScript = document.getElementById("get-value");
const language_ = _getScript.dataset.language;
const button_ = document.getElementById('btn')
let script_ = document.currentScript
let fileName_ = script_.dataset.filename
const params_ = new URLSearchParams(window.location.search)

button_.addEventListener("click", (e) => {
  e.preventDefault()
  if (document.getElementById("input-string").value == '') {
    console.error("failed")
  } else {
    localStorage.setItem('translitration_content', document.getElementById("input-string").value);
    window.location = window.location.href  + "/" + "result" + '?' + '&fileName' + "=" + btoa(fileName_);
  }
})


////
//clipboard

function clipboardHandler() {
    const el = document.createElement("textarea");
    el.value = document.getElementById("input-string").value
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
	document.getElementById("input-string").style.fontSize = size
	}
	function font_family_fun(family){
	document.getElementById("input-string").style.fontFamily = family
	}
   
document.getElementById("clear_button").addEventListener("click", ()=>{
	document.getElementById("input-string").value=''
	document.getElementById("tbody").innerHTML=""
	document.getElementById("wordCount").innerHTML=0
	document.getElementById("characterCount").innerHTML=0
	document.getElementById("sentenceCount").innerHTML=0
	document.getElementById("paragraphCount").innerHTML=0
	document.getElementById("readtime").innerHTML='0 min'
	document.getElementById("speaktime").innerHTML='0 min'
}); 
 
var input = document.getElementById("input-string"),
  characterCount = document.querySelector('#characterCount'),
  wordCount = document.querySelector('#wordCount'),
  sentenceCount = document.querySelector('#sentenceCount'),
  paragraphCount = document.querySelector('#paragraphCount')

  document.getElementById("input-string").addEventListener("keyup",  function() {
    let inputString = document.getElementById("input-string").value

    if (inputString[inputString.length - 1] == " " || event == "transliterateButton") {
        fetch(`https://www.google.com/inputtools/request?text=${inputString}&ime=transliteration_en_${language_}`)
            .then(res => res.json())
            .then(result => {
                  var relt = result[1][0][1][0]
			 document.getElementById("input-string").value = relt;
            })
    }
  characterCount.innerHTML = input.value.length;
  var words = input.value.match(/\b[-?(\w+)?]+\b/gi);
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
    var sentences = input.value.split(/[.|!|?]+/g);
    sentenceCount.innerHTML = sentences.length - 1;
  } else {
    sentenceCount.innerHTML = 0;
  }
  if (words) {
    var paragraphs = input.value.replace(/\n$/gm, '').split(/\n/);
    paragraphCount.innerHTML = paragraphs.length;
  } else {
    paragraphCount.innerHTML = 0;
  }
	for (let a = 0; a < document.getElementsByClassName("keyword__placeholder-text").length; a++) {
	  document.getElementsByClassName("keyword__placeholder-text")[a].style.display = "none";
	}
	document.getElementById("tbody").innerHTML = "";
	let counts = [];
	let keys = [];
	var wordcount = [];
	var tbody = document.getElementById("tbody");
	var wordcount = document.getElementById("input-string").value
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
	  }
	}
});

///////
function word_count(){
	document.getElementsByClassName("keyword__placeholder-text")[0].style.display="none"
	document.getElementById("tbody").innerHTML = ''
	let counts = []
	let keys = []
	var wordcount = [];
	var tbody = document.getElementById("tbody");
	var wordcount = document.getElementById("input-string").value
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
	  }
	}
}
