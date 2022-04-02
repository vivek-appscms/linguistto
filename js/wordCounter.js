
/* ** - Shows number of characters, words, sentences, paragraphs - Done */

"use strict";
var textarea1 = document.getElementById("input-string");
var input_editor;
input_editor = CodeMirror.fromTextArea(textarea1,{
  lineNumbers: true,
  mode: "text/x-csrc"
});

var  characterCount = document.querySelector('#characterCount'),
  wordCount = document.querySelector('#wordCount'),
  sentenceCount = document.querySelector('#sentenceCount'),
  paragraphCount = document.querySelector('#paragraphCount')

// updating the displayed stats after every keypress
input_editor.on("keyup",  function() {

  //keeping the console clean to make only the latest data visible
  console.clear();

  // character count
  // just displaying the input length as everything is a character
  characterCount.innerHTML = input_editor.getValue().length;

  // word count using \w metacharacter - replacing this with .* to match anything between word boundaries since it was not taking 'a' as a word.
  // this is a masterstroke - to count words with any number of hyphens as one word
  // [-?(\w+)?]+ looks for hyphen and a word (we make both optional with ?). + at the end makes it a repeated pattern
  // \b is word boundary metacharacter
  var words = input_editor.getValue().match(/\b[-?(\w+)?]+\b/gi);
  // console.log(words);
  if (words) {
    wordCount.innerHTML = words.length;
  } else {
    wordCount.innerHTML = 0;
  }

  // sentence count	using ./!/? as sentense separators
  if (words) {
    var sentences = input_editor.getValue().split(/[.|!|?]+/g);
    console.log(sentences);
    sentenceCount.innerHTML = sentences.length - 1;
  } else {
    sentenceCount.innerHTML = 0;
  }

  // paragraph count from http://stackoverflow.com/a/3336537
  if (words) {
    // \n$ takes care of empty lines: lines with no characters, and only \n are not paragraphs
    // and need to be replaced with empty string
    var paragraphs = input_editor.getValue().replace(/\n$/gm, '').split(/\n/);
    paragraphCount.innerHTML = paragraphs.length;
  } else {
    paragraphCount.innerHTML = 0;
  }
  // console.log(paragraphs);

});
