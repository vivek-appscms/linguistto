const button_ = document.getElementById('split')
let script_ = document.currentScript
let fileName_ = script_.dataset.filename
const params_ = new URLSearchParams(window.location.search)

button_.addEventListener("click", (e) => {
  e.preventDefault()
  if (document.getElementById("input").value == '') {
    console.error("failed")
  } else {
    localStorage.setItem('summary_content', document.getElementById("input").value);
    localStorage.setItem('summary_title_content', document.getElementById("title").value);
    window.location = window.location.href  +"/"+ "result" + '?' + '&fileName' + "=" + btoa(fileName_);
  }
})
