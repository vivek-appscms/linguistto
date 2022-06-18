var strOutput = []
var input_editor_contnet = localStorage.getItem('translation_content');
const getScript = document.getElementById("get-value")
const from = getScript.dataset.from
const to = getScript.dataset.to

async function getapi(url) {
  const response = await fetch(url)
  let data = await response.json()
  if (data) {
    data &&
      data[0].map((item) => {
        item[0].length > 0 && strOutput.push(item[0])
      })
  }

  strOutput = strOutput.toString()
  return strOutput
}
document.getElementById("input-string").value = input_editor_contnet;
async function translatecontent(){
  strOutput = []
  var inputString = document.getElementById("input-string").value
  if (inputString) {
    var outputStr = await translateFunction(inputString, from, to)
    var filnal_cotnent = outputStr.replace(
      /['",]+/g,
      ''
    )
    document.getElementById("output-string").value = filnal_cotnent;
    paraprashstyle();
    word_count();
  } else {
    console.clear()
  }
  gtag('event', 'page_view', {
    page_location: window.location.pathname + location.search,
  })
}
async function getInputValue() {
  strOutput = []
  var inputString = input_editor_contnet;
  if (inputString) {
    var outputStr = await translateFunction(inputString, from, to)
    var filnal_cotnent = outputStr.replace(
      /['",]+/g,
      ''
    )
    document.getElementById("output-string").value = filnal_cotnent;
    paraprashstyle();
    word_count();
  } else {
    console.clear()
  }

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

getInputValue();

//////////////////
// clipboard
function clipboardHandler() {
  const el = document.createElement("textarea");
  el.value = document.getElementById("output-string")
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.getElementById("copy").title="copid !"
};
setTimeout(() => {
  document.getElementById("copy").title="copy !"
}, 5000);
function word_count() {
  for (let a = 0; a < document.getElementsByClassName("keyword__placeholder-text").length; a++) {
    document.getElementsByClassName("keyword__placeholder-text")[a].style.display = "none";
  }
  document.getElementById("tbody2").innerHTML = "";
  let counts = [];
  let keys = [];
  var wordcount = [];
  var tbody = document.getElementById("tbody2");
  var wordcount =  document.getElementById("output-string").value
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
  for (let a = 0; a < document.getElementsByClassName("keyword__placeholder-text").length; a++) {
    document.getElementsByClassName("keyword__placeholder-text")[a].style.display = "none";
  }
  document.getElementById("tbody1").innerHTML = "";
  let counts1 = [];
  let keys1 = [];
  var wordcount1 = [];
  var tbody1 = document.getElementById("tbody1");
  var wordcount1 = document.getElementById("input-string").value
  var token1 = wordcount1.split(" ");
  for (let i = 0; i < token1.length; i++) {
    var word1 = token1[i].toLowerCase();
    if (!/\d+/.test(word1)) {
      if (counts1[word1] === undefined) {
        counts1[word1] = 1;
        keys1.push(word1);
      } else {
        counts1[word1] = counts1[word1] + 1;
      }
    }
  }
  keys1.sort(compare1);
  function compare1(a, b) {
    var countA1 = counts1[a];
    var countB1 = counts1[b];
    return countB1 - countA1;
  }
  for (let y = 0; y < keys1.length; y++) {
    let key1 = keys1[y];
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