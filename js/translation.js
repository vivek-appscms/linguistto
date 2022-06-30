
let script_ = document.currentScript
let fileName_ = script_.dataset.filename
const params_ = new URLSearchParams(window.location.search)


document.querySelector("#scrollToTop").addEventListener("click", () => {
  const scrollingElement = (document.scrollingElement || document.body);
  scrollingElement.scroll({ top: 0, behavior: 'smooth' });
})


document.querySelector(".input-string").focus()

function translatecontentNext() {
  if (document.getElementById("input-string").value == '') {
    console.error("failed")
  } else {
    localStorage.setItem('translation_content', document.getElementById("input-string").value);
    window.location = window.location.href + "result" + '?' + '&fileName' + "=" + btoa(fileName_);
  }
}




function active_buttonkk(active_button) {
  if (document.getElementById(active_button).style.display == 'none') {
    document.getElementById(active_button).style.display = 'block';
  }
}
function diavtivate_button(active_button) {
  if (document.getElementById(active_button).style.display == 'block') {
    document.getElementById(active_button).style.display = 'none';
  }
}
function display_flex(active_button) {
  if (document.getElementById(active_button).style.display == 'none') {
    document.getElementById(active_button).style.display = 'flex';
  } else {
    document.getElementById(active_button).style.display = 'none';
  }
}
function display_none(active_button) {
  if (document.getElementById(active_button).style.display == 'flex') {
    document.getElementById(active_button).style.display = 'nonde';
  }
}
function font_size_fun(size) {
  document.getElementById("input-string").style.fontSize = size
  document.getElementById("output-string").style.fontSize = size
}
function font_family_fun(family) {
  document.getElementById("input-string").style.fontFamily = family
  document.getElementById("output-string").style.fontFamily = family
}

document.getElementById("clear_button").addEventListener("click", () => {
  document.getElementById("input-string").value = '';
  document.getElementById("output-string").value = '';
  document.getElementById("tbody1").innerHTML = ""
  document.getElementById("tbody2").innerHTML = ""
  document.getElementById("wordCount1").innerHTML = 0
  document.getElementById("wordCount2").innerHTML = 0
  document.getElementById("characterCount1").innerHTML = 0
  document.getElementById("characterCount2").innerHTML = 0
  document.getElementById("sentenceCount1").innerHTML = 0
  document.getElementById("sentenceCount2").innerHTML = 0
  document.getElementById("paragraphCount1").innerHTML = 0
  document.getElementById("paragraphCount2").innerHTML = 0
  document.getElementById("readtime1").innerHTML = '0 min'
  document.getElementById("readtime2").innerHTML = '0 min'
  document.getElementById("speaktime2").innerHTML = '0 min'
  document.getElementById("speaktime1").innerHTML = '0 min'
});

var input = document.getElementById("input-string").value,
  characterCount1 = document.querySelector('#characterCount1'),
  characterCount2 = document.querySelector('#characterCount2'),
  wordCount1 = document.querySelector('#wordCount1'),
  wordCount2 = document.querySelector('#wordCount2'),
  sentenceCount1 = document.querySelector('#sentenceCount1'),
  sentenceCount2 = document.querySelector('#sentenceCount2'),
  paragraphCount1 = document.querySelector('#paragraphCount1'),
  paragraphCount2 = document.querySelector('#paragraphCount2'),
  input1 = document.getElementById("output-string").value

document.getElementById("input-string").addEventListener("keyup", function () {
  characterCount1.innerHTML = document.getElementById("input-string").value.length;
  var words = document.getElementById("input-string").value.match(/\b[-?(\w+)?]+\b/gi);
  if (words) {
    wordCount1.innerHTML = words.length;
    const wordsPerMinute = 200; // Average case.
    const wordsSpeakMinute = 230; // Average case.
    let result, result2;
    if (words.length > 0) {
      let value = Math.ceil(words.length / wordsPerMinute);
      result = `~${value} min`;
    }
    if (words.length > 0) {
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

document.getElementById("input-string").addEventListener("keyup", () => {
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
  // }
})
function paraprashstyle() {
  characterCount2.innerHTML = document.getElementById("output-string").value.length;
  var words = document.getElementById("output-string").value.match(/\b[-?(\w+)?]+\b/gi);
  if (words) {
    wordCount2.innerHTML = words.length;
    const wordsPerMinute = 200; // Average case.
    const wordsSpeakMinute = 230; // Average case.
    let result, result2;
    if (words.length > 0) {
      let value = Math.ceil(words.length / wordsPerMinute);
      result = `~${value} min`;
    }
    if (words.length > 0) {
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
  characterCount1.innerHTML = document.getElementById("input-string").value.length;
  var words = document.getElementById("input-string").value.match(/\b[-?(\w+)?]+\b/gi);
  if (words) {
    wordCount1.innerHTML = words.length;
    const wordsPerMinute = 200; // Average case.
    const wordsSpeakMinute = 230; // Average case.
    let result, result2;
    if (words.length > 0) {
      let value = Math.ceil(words.length / wordsPerMinute);
      result = `~${value} min`;
    }
    if (words.length > 0) {
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
  for (let a = 0; a < document.getElementsByClassName("keyword__placeholder-text").length; a++) {
    document.getElementsByClassName("keyword__placeholder-text")[a].style.display = "none";
  }
  document.getElementById("tbody2").innerHTML = "";
  let counts = [];
  let keys = [];
  var wordcount = [];
  var tbody = document.getElementById("tbody2");
  var wordcount = document.getElementById("output-string").value
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
    // }
  }
}