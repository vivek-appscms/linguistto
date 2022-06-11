let script_ = document.currentScript
let fileName_ = script_.dataset.filename
var  gen_count = document.getElementById('gen_count').value;
var  loremoption = document.getElementById('loremoption').value;
function OpenNewParagraph(){
  window.location = window.location.href  + "/" + "result" + '?' + 
  'count' + '=' + gen_count.replace(/ /g, "+") +
  '&option' + '=' + loremoption.replace(/ /g, "+") 
  +'&fileName' + "=" + btoa(fileName_);
}
// copy text to clipboard
function copyToClipboard() {
  let copyText = document.getElementById("lorem-gen-content").textContent;
  navigator.clipboard.writeText(copyText);
}
