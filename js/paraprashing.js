//get input
const getScripts = document.currentScript;
const initaillanguage = getScripts.dataset.language;
console.log(initaillanguage);
async function getInputValue() {
  let languageList = [
    "sq",
    "am",
    "ar",
    "zh",
    "da",
    "gu",
    "hy",
    "id",
    "it",
    "ja",
    "ko",
    "la",
    "ms",
    "ne",
    "pa",
    "sq",
    "ta",
    "te",
    "zh",
    "ur",
  ];
  let inputString = document.getElementById("input-string").value;

  for (let i = languageList.length - 1; i > 0; i--) {
    const randomNum = Math.floor(Math.random() * i);
    const temp = languageList[i];
    languageList[i] = languageList[randomNum];
    languageList[randomNum] = temp;
  }

  languageList[0] = initaillanguage;
  languageList[5] = initaillanguage;
  languageList[10] = initaillanguage;
  languageList[15] = initaillanguage;
  paraphraseControler(inputString, languageList);
}

//control paraphrase
async function paraphraseControler(string, lang) {
  let paraphrase = string;

  //for 3 output - start position, end position and option number
  showParaphrase(0, 5, 1);
  async function showParaphrase(start, end, option) {
    document.getElementById(`paraphrase-output-${option}`).innerHTML =
      "paraphrasing in progress...";
    try {
      for (let i = start; i < end; i++) {
        const api_url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${
          lang[i]
        }&tl=${lang[i + 1]}&dt=t&q=${paraphrase}`;
        const response = await fetch(api_url);
        let data = await response.json();
        let strOutput = [];
        if (data) {
          data &&
            data[0].map((item) => {
              item[0].length > 0 && strOutput.push(item[0]);
            });
        }
        strOutput = strOutput.toString();
        paraphrase = strOutput.replace(/['",]+/g, "");
        if (i == end - 1) {
          let inputWords = document
            .getElementById("input-string")
            .value.toLowerCase()
            .replace(/ \s*/g, " ")
            .split(" ");
          let differentWordCount = 0;
          paraphrase.split(" ").forEach((word) => {
            if (inputWords.indexOf(word.toLowerCase()) < 0) {
              differentWordCount++;
            }
          });
          document.getElementById(`paraphrase-output-${option}`).innerText =
            paraphrase;
          paraprashstyle();
          word_count();
          // document.getElementById(`tooltip-${option}`).title = `${differentWordCount} out of ${inputWords.length} words are different from input words`;
        }
      }
    } catch (error) {
      try {
        for (let i = start; i < end; i++) {
          const api_url = `/.netlify/functions/paraphrase/?baselocalecode=${
            lang[i]
          }&datalanguagecode=${lang[i + 1]}&value=${paraphrase}`;
          const response = await fetch(api_url);
          let data = await response.json();
          let strOutput = [];
          if (data) {
            data &&
              data[0].map((item) => {
                item[0].length > 0 && strOutput.push(item[0]);
              });
          }
          strOutput = strOutput.toString();
          paraphrase = strOutput.replace(/['",]+/g, "");
          if (i == end - 1) {
            let inputWords = document
              .getElementById("input-string")
              .value.toLowerCase()
              .replace(/ \s*/g, " ")
              .split(" ");
            let differentWordCount = 0;
            paraphrase.split(" ").forEach((word) => {
              if (inputWords.indexOf(word.toLowerCase()) < 0) {
                differentWordCount++;
              }
            });
            document.getElementById(`paraphrase-output-${option}`).innerText =
              paraphrase;
            paraprashstyle();
            word_count();
            //   document.getElementById(`tooltip-${option}`).title = `${differentWordCount} out of ${inputWords.length} words are different from input words`;
          }
        }
      } catch (error) {
        console.log(error);
        document.getElementById(`paraphrase-output-${option}`).innerHTML =
          "We are facing some issues at this time. Please try again after 20 minutes";
      }
    }
  }
}

//.netlify/functions/paraphrase/
//http://127.0.0.1:9000/paraphrase/

function active_buttonkk(active_button) {
  if (document.getElementById(active_button).style.display == "none") {
    document.getElementById(active_button).style.display = "block";
  }
}
function diavtivate_button(active_button) {
  if (document.getElementById(active_button).style.display == "block") {
    document.getElementById(active_button).style.display = "none";
  }
}
function display_flex(active_button) {
  if (document.getElementById(active_button).style.display == "none") {
    document.getElementById(active_button).style.display = "flex";
  } else {
    document.getElementById(active_button).style.display = "none";
  }
}
function display_none(active_button) {
  if (document.getElementById(active_button).style.display == "flex") {
    document.getElementById(active_button).style.display = "nonde";
  }
}
function font_size_fun(size) {
  document.getElementById("input-string").style.fontSize = size;
  document.getElementById("paraphrase-output-1").style.fontSize = size;
}
function font_family_fun(family) {
  document.getElementById("input-string").style.fontFamily = family;
  document.getElementById("paraphrase-output-1").style.fontFamily = family;
}
document.getElementById("active_button").addEventListener("click", () => {
  var value = document.getElementById("active_text");
  if (value.innerHTML == "Autosave is OFF") {
    value.innerHTML = "Autosave is ON";
  } else {
    value.innerHTML = "Autosave is OFF";
  }
});

document.getElementById("clear_button").addEventListener("click", () => {
  document.getElementById("input-string").value = "";
  document.getElementById("paraphrase-output-1").value = "";
  document.getElementById("tbody1").innerHTML = "";
  document.getElementById("tbody2 ").innerHTML = "";
  document.getElementById("wordCount1").innerHTML = 0;
  document.getElementById("wordCount2").innerHTML = 0;
  document.getElementById("characterCount1").innerHTML = 0;
  document.getElementById("characterCount2").innerHTML = 0;
  document.getElementById("sentenceCount1").innerHTML = 0;
  document.getElementById("sentenceCount2").innerHTML = 0;
  document.getElementById("paragraphCount1").innerHTML = 0;
  document.getElementById("paragraphCount2").innerHTML = 0;
  document.getElementById("readtime1").innerHTML = "0 min";
  document.getElementById("readtime1").innerHTML = "0 min";
  document.getElementById("speaktime2").innerHTML = "0 min";
  document.getElementById("speaktime2").innerHTML = "0 min";
});

var input = document.querySelector("#input-string"),
  characterCount1 = document.querySelector("#characterCount1"),
  characterCount2 = document.querySelector("#characterCount2"),
  wordCount1 = document.querySelector("#wordCount1"),
  wordCount2 = document.querySelector("#wordCount2"),
  sentenceCount1 = document.querySelector("#sentenceCount1"),
  sentenceCount2 = document.querySelector("#sentenceCount2"),
  paragraphCount1 = document.querySelector("#paragraphCount1"),
  paragraphCount2 = document.querySelector("#paragraphCount2"),
  input1 = document.querySelector("#paraphrase-output-1");

input.addEventListener("keyup", function () {
  characterCount1.innerHTML = input.value.length;
  var words = input.value.match(/\b[-?(\w+)?]+\b/gi);
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
    var sentences = input.value.split(/[.|!|?]+/g);
    sentenceCount1.innerHTML = sentences.length - 1;
  } else {
    sentenceCount1.innerHTML = 0;
  }
  if (words) {
    var paragraphs = input.value.replace(/\n$/gm, "").split(/\n/);
    paragraphCount1.innerHTML = paragraphs.length;
  } else {
    paragraphCount1.innerHTML = 0;
  }
});
function paraprashstyle() {
  characterCount2.innerHTML = input1.value.length;
  var words = input1.value.match(/\b[-?(\w+)?]+\b/gi);
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
    var sentences = input1.value.split(/[.|!|?]+/g);
    sentenceCount2.innerHTML = sentences.length - 1;
  } else {
    sentenceCount2.innerHTML = 0;
  }
  if (words) {
    var paragraphs = input1.value.replace(/\n$/gm, "").split(/\n/);
    paragraphCount2.innerHTML = paragraphs.length;
  } else {
    paragraphCount2.innerHTML = 0;
  }
}
function word_count() {
  for (let a = 0; a < document.getElementsByClassName("keyword__placeholder-text").length; a++) {
    document.getElementsByClassName("keyword__placeholder-text")[a].style.display = "none";
  }
  document.getElementById("tbody2").innerHTML = "";
  let counts = [];
  let keys = [];
  var wordcount = [];
  var tbody = document.getElementById("tbody2");
  var wordcount = document.getElementById("paraphrase-output-1").value;
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
  if (e.keyCode == 32) {
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
  }
};
document.getElementById("paraphrase-output-1").onkeyup = function (e) {
  if (e.keyCode == 32) {
    for (let a = 0; a < document.getElementsByClassName("keyword__placeholder-text").length; a++) {
      document.getElementsByClassName("keyword__placeholder-text")[a].style.display = "none";
    }
    document.getElementById("tbody2").innerHTML = "";
    let counts = [];
    let keys = [];
    var wordcount = [];
    var tbody = document.getElementById("tbody2");
    var wordcount = document.getElementById("paraphrase-output-1").value;
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
