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
                if(summary.length !=0){
                summary.forEach(function (sentence) {
                    $(".teasers").append("<li>" + sentence + "</li>");    
                });
            }else{
                $(".teasers").append("<p style='color:#ffc107;text-align: start;'>please add at least one sentence here</p>");
            }
                $(".title").text(title);
        });
        function split(){
            $(".teasers").html("");
            var summarizer = new JsSummarize();
            var summary = summarizer.summarize(title, $('#input').val());
            if(summary.length !=0){
            summary.forEach(function (sentence) {
                $(".teasers").append("<li>" + sentence + "</li>");    
            });
        }else{
            $(".teasers").append("<p style='color:#ffc107;text-align: start;'>please add at least one sentence here</p>");
        }
        gtag('event', 'page_view', {
            page_location: window.location.pathname + location.search,
          })
            $(".title").text(title);
        }
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