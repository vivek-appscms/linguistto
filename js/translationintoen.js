const getScript = document.currentScript;
const language = getScript.dataset.language;
function inputHandle(event) {
    let inputString = document.getElementById("input-string")
    if (inputString.value[inputString.value.length - 1] == " " || event == "transliterateButton") {
        fetch(`https://www.google.com/inputtools/request?text=${inputString.value}&ime=transliteration_${language}_en`)
            .then(res => res.json())
            .then(result => {
                inputString.value = result[1][0][1][0]
            })
    }
}