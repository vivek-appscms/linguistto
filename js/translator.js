const getScript = document.currentScript;
const language = getScript.dataset.language;
function inputHandle(event) {
    let inputString = document.getElementById("input-string")
    if (inputString.value[inputString.value.length - 1] == " " || event == "transliterateButton") {
        fetch(`https://www.google.com/inputtools/request?text=${inputString.value}&ime=transliteration_en_${language}`)
            .then(res => res.json())
            .then(result => {
                inputString.value = result[1][0][1][0]
            })
    }
}

//////
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
	document.getElementById("tbody").innerHTML=""
	document.getElementById("wordCount").innerHTML=0
	document.getElementById("characterCount").innerHTML=0
	document.getElementById("sentenceCount").innerHTML=0
	document.getElementById("paragraphCount").innerHTML=0
	document.getElementById("readtime").innerHTML='0 min'
	document.getElementById("speaktime").innerHTML='0 min'
}); 
 
var input = document.querySelector('#input-string'),
  characterCount = document.querySelector('#characterCount'),
  wordCount = document.querySelector('#wordCount'),
  sentenceCount = document.querySelector('#sentenceCount'),
  paragraphCount = document.querySelector('#paragraphCount')

input.addEventListener('keyup', function() {
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
});

///////
function word_count(){
	document.getElementsByClassName("keyword__placeholder-text")[0].style.display="none"
	document.getElementById("tbody").innerHTML = ''
	let counts = []
	let keys = []
	var wordcount = [];
	var tbody = document.getElementById("tbody");
	var wordcount = document.getElementById("input-string").value;
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


document.getElementById("input-string").onkeyup = function (e) {
	if (e.keyCode == 32) {
	  for (let a = 0; a < document.getElementsByClassName("keyword__placeholder-text").length; a++) {
		document.getElementsByClassName("keyword__placeholder-text")[a].style.display = "none";
	  }
	  document.getElementById("tbody").innerHTML = "";
	  let counts = [];
	  let keys = [];
	  var wordcount = [];
	  var tbody = document.getElementById("tbody");
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
	}
  };