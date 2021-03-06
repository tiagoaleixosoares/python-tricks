$(document).ready(function(){

    loadTheData();

    function loadTheData() {

        // Read the data

        var baseURL = "https://akashp1712.github.io/python-tricks";
        var dataDir = "data";
        var metaFileName = "0_metadata.json";

        var countURL = baseURL + "/" + dataDir + "/" + metaFileName;

           fetch(countURL)
                .then(res => res.json())
                .then(json => {
                    //json vaiable contains object with data
                    files = json['files'];
                    var fileName = files[randomNumber(1, files.length)];
                    fetchData(fileName);
                })

        function fetchData(fileName) {

            var fileURL = baseURL + "/" + dataDir + "/" + fileName;

            fetch(fileURL)
                .then(res => res.json())
                .then(json => {
                    //json vaiable contains object with data
                    codeData = json['data']
                    displayData(codeData);
                })

            function displayData(codeData) {
                // Display the data

                codeLines = codeData['code'];

                var codeElem = "";

                codeLines.forEach(function(value) {
                    codeElem = codeElem + value + "<br>";
                });

                $("#code").html(codeElem);

                highlightCode();
                updateDocumentation();

                function updateDocumentation() {
                    var elem = [];
                    elem[0] = "<h2 id='doc-title'>" + codeData['name'] + '</h2>';
                    elem[1] = '<div>' + codeData['desc'] + '</div>';

                    var text = elem.join('');

                    $('#documentation').html(text);
                }

                function highlightCode() {
                    $('pre code').each(function(i, e) {hljs.highlightBlock(e);});
                }
            }
        }
    }
    function randomNumber(min, max) {
        // generating number between min and max with rounding
        return (Math.random() * (max - min) + min) << 0;
    }

    // Copy the code functionality
    document.getElementById ("clickMe").addEventListener ("click", copyText, false);

    function copyText() {
      /* Get the text field */
      var copyText = document.getElementById("codeblock");

      var copytext = selectText('codeblock');
      document.execCommand("copy");

    }

    function selectText(element){

        var doc = document,
        text = doc.getElementById(element)
        var range, selection;

        if(doc.body.createTextRange){
         range = document.body.createTextRange();
         range.moveToElementText(text);
         range.select();
        }
        else if(window.getSelection){
          selection = window.getSelection();
          range = document.createRange();
          range.selectNodeContents(text);
          selection.removeAllRanges();
          selection.addRange(range);
        }
        return range;
    }

});

