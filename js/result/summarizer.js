const value = localStorage.getItem('summary_content')
const title = localStorage.getItem('summary_title_content')
$('#input').val(value);
$('#title').val(title)
    $(window).ready(
        function () {
                $(".teasers").html("");
                var summarizer = new JsSummarize(
                    {
                        returnCount: 3
                    });
                var summary = summarizer.summarize(title, value);
                summary.forEach(function (sentence) {
                    $(".teasers").append("<li>" + sentence + "</li>");
                });
                $(".title").text(title);
        });
    // clipboard
    let copy_btn = document.querySelector('.tooltiptext')
    function CopyContent() {
        var Copy_value = document.getElementById("result");
        navigator.clipboard.writeText(Copy_value.textContent);
        copy_btn.innerHTML = "copied!";
    };
    setInterval(() => {
        copy_btn.innerHTML = "copy";
    }, 10000);