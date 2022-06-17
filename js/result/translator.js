const getScript_ = document.getElementById("get-value");
const lang_ = getScript_.dataset.language;
var input_value = localStorage.getItem("translitration_content");
var characterCount = document.querySelector("#characterCount"),
  wordCount = document.querySelector("#wordCount"),
  sentenceCount = document.querySelector("#sentenceCount"),
  paragraphCount = document.querySelector("#paragraphCount");
function getapi() {
  let inputString = input_value;
  fetch(
    `https://www.google.com/inputtools/request?text=${inputString}&ime=transliteration_en_${lang_}`
  )
    .then((res) => res.json())
    .then((result) => {
      var relt = result[1][0][1][0];
      document.getElementById("input-string").value= relt;
    });
}
getapi();
function handleInput() {
  characterCount.innerHTML = document.getElementById("input-string").value.length;
  var words = document.getElementById("input-string").value.split(" ")
  if (words) {
    wordCount.innerHTML = words.length;
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
    document.getElementById("readtime").innerText = `${result}`;
    document.getElementById("speaktime").innerText = `${result2}`;
  } else {
    wordCount.innerHTML = 0;
  }
  if (words) {
    var sentences = document.getElementById("input-string").value.split(/[.|!|?]+/g);
    sentenceCount.innerHTML = sentences.length - 1;
  } else {
    sentenceCount.innerHTML = 0;
  }
  if (words) {
    var paragraphs = document.getElementById("input-string").value.replace(/\n$/gm, "").split(/\n/);
    paragraphCount.innerHTML = paragraphs.length;
  } else {
    paragraphCount.innerHTML = 0;
  }
  for (
    let a = 0;
    a < document.getElementsByClassName("keyword__placeholder-text").length;
    a++
  ) {
    document.getElementsByClassName("keyword__placeholder-text")[
      a
    ].style.display = "none";
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
}
function transliterate_content(){
  let inputString = document.getElementById("input-string").value;
  fetch(
    `https://www.google.com/inputtools/request?text=${inputString}&ime=transliteration_en_${lang_}`
  )
    .then((res) => res.json())
    .then((result) => {
      var relt = result[1][0][1][0];
      input_editor.setValue(relt);
      document.getElementById("input-string").value= relt;
    });
    gtag('event', 'page_view', {
      page_location: window.location.pathname + location.search,
    })
  setTimeout(() => {
    handleInput();
  }, 1000);
}
setTimeout(() => {
  handleInput();
}, 1000);
