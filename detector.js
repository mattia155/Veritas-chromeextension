// Hanlder of detector html page (pop-up)

// Update Div display due to div visibility local variables change
let div1 = document.getElementById("news");
let div2 = document.getElementById("nonews");
if(localStorage['divvis'] == 1){
    div1.style.display = 'block';
    div2.style.display = 'none';
} else {
    div1.style.display = 'none';
    div2.style.display = 'block';
}

// Get request to obtain the reliability score of the news and the number of report about it
if(localStorage['getreq']){
    chrome.tabs.getSelected(null, function(tab) {
        // Set score as "computing" (...)
        document.getElementById("score").innerHTML = `...`;
        // POST request of the title of the news to compute and obtin the score
        title = localStorage['title'];
        (async () => {
            const rawResponse = await fetch('https://veritas-news.herokuapp.com/prediction/', {
                method: 'POST',
                body: JSON.stringify({data: title})
            })
            .catch(err => {
                document.getElementById("score").innerHTML = `ERORR`;
                alert('Connection to the API failed.');
            });
            const content = await rawResponse.json();
            res_prob = content['result']['probability']
            res_class = content['result']['class']
            res_status = content['statusCode']
            if (res_status == 200) {
                score = parseInt(res_prob);
                document.getElementById("score").innerHTML = `${score}%`;
                try {
                    if (score > 65){
                        document.getElementById("thumb").style.color = '#238823';
                        document.getElementById("thumb").innerHTML = "thumb_up";
                    } else if (score > 35) {
                        document.getElementById("thumb").style.color = '#FFBF00';
                        document.getElementById("thumb").innerHTML = "thumbs_up_down";//"pan_tool";
                    } else {
                        document.getElementById("thumb").style.color = '#D2222D';
                        document.getElementById("thumb").innerHTML = "thumb_down";
                    }   
                } catch (error) {
                    alert(error)
                }
            }
            else {
                document.getElementById("score").innerHTML = `ERROR`;
            }
        })();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var reportFake = document.getElementById('reportFake');
    reportFake.addEventListener('click', function() {
        chrome.tabs.getSelected(null, function(tab) {
            // Add the report in the database (POST request)
            // ...
            // Change the visualized number (ONLY FOR THE DEMO - has to be completely re-writed when DB it will be available)
            document.getElementById("fakereports").innerHTML = " Reported as fake news: 1 times "
        })
    })
})