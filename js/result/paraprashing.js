var input_editor_contnet = localStorage.getItem('paraprash_content');
// //get input
const getScripts_ = document.currentScript;
const initaillanguage = getScripts_.dataset.language;
document.getElementById("input-string").value = input_editor_contnet;
//  paraprashstyle();
//     word_count();
// document.getElementsByClassName("typing-main-div")[0].style.display="none";

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
  let inputString = input_editor_contnet

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

function handleparaprashing(){
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
  let inputString = document.getElementById("input-string").value

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
    document.getElementById("paraphrase-output-1").value= "paraphrasing in progress...";
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
          let inputWords = document.getElementById("input-string").value
            .toLowerCase()
            .replace(/ \s*/g, " ")
            .split(" ");
          let differentWordCount = 0;
          paraphrase.split(" ").forEach((word) => {
            if (inputWords.indexOf(word.toLowerCase()) < 0) {
              differentWordCount++;
            }
          });
          document.getElementById("paraphrase-output-1").value=paraphrase;
          }
      }
    } catch (error) {
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
            let inputWords = document.getElementById("input-string").value
              .toLowerCase()
              .replace(/ \s*/g, " ")
              .split(" ");
            let differentWordCount = 0;
            paraphrase.split(" ").forEach((word) => {
              if (inputWords.indexOf(word.toLowerCase()) < 0) {
                differentWordCount++;
              }
            });
            document.getElementById("paraphrase-output-1").value = paraphrase;
          }
        }
      } catch (error) {
        document.getElementById("paraphrase-output-1").value= "We are facing some issues at this time. Please try again after 20 minutes";
        console.log(error);
      }
    }
    paraprashstyle();
    word_count();
    gtag('event', 'page_view', {
      page_location: window.location.pathname + location.search,
    })
  }
}
getInputValue();
function clipboardHandler() {
  const el = document.createElement("textarea");
  el.value = document.getElementById("paraphrase-output-1").value;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.getElementById("copy").title="copid !"
};

// // .netlify/functions/paraphrase/
// // http://127.0.0.1:9000/paraphrase/

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
  document.getElementById("tbody1").innerHTML = "";
  let counts1 = [];
  let keys1 = [];
  var wordcount1 = [];
  var tbody1 = document.getElementById("tbody1");
  var wordcount1 = document.getElementById("input-string").value;
  var token1 = wordcount1.split(" ");
  for (let i = 0; i < token1.length; i++) {
    var word1 = token1[i].toLowerCase();
    if (!/\d+/.test(word1)) {
      if (counts1[word1] === undefined) {
        counts1[word1] = 1;
        keys1.push(word1);
      } else {
        counts1[word1] = counts1[word] + 1;
      }
    }
  }
  keys1.sort(compare1);
  function compare1(a, b) {
    var countA1 = counts1[a];
    var countB1 = counts1[b];
    return countB1 - countA1;
  }
  for (let i = 0; i < keys1.length; i++) {
    let key1 = keys1[i];
    if (!key1 == "") {
      let tr = document.createElement("tr");
      let td = document.createElement("td");
      let td2 = document.createElement("td");

      td.innerHTML = `${key1}`;
      td2.innerHTML = `${counts1[key1]}`;

      tr.appendChild(td);
      tr.appendChild(td2);
      tbody1.appendChild(tr);
    }
  }
}