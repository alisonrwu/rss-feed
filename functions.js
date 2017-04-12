// RSS feed
var feed = "http://bulletins.it.ubc.ca/archives/category/security/feed";

// ----------------------------------------------------------------------------------------------
// PHP version output is exactly the same as below
function outputRSS(){
  var xhr,
    method = "GET",
    url = "http://localhost/rss-feed/"+"getrss.php?feed="+feed;
  if (window.XMLHttpRequest){
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHTTP"); // for older browsers
  }
  xhr.onreadystatechange = function(){
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
      document.getElementById("output").innerHTML = xhr.responseText;
    }
  }
  xhr.open(method, url, true);
  xhr.send();
}
// ----------------------------------------------------------------------------------------------

$(document).ready(function(){
  outputRSS();
  // ----------------------------------------------------------------------------------------------
  // Use Yahoo Query Language (YQL) https://developer.yahoo.com/yql/
  // Take the provided feed, and add it to a YQL query.
  var yql = 'http://query.yahooapis.com/v1/public/yql?q='
    + encodeURIComponent('select * from rss where url="' + feed + '"')
    + '&format=xml&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
  // console.log(yql);

  $.ajax({
    url: yql,
    dataType: "XML",
    success: function(data) {
      // console.log(data);

      var limit = 10, // set feed limit here
      temp = limit+1;
      count = 0;
      $(data).find("item").each(function() {
        if (limit==0) return;
        count = temp-limit;
        var item = $(this);
        var title = item.find('title').text();
        var link = item.find('link').text();
        var date = item.find('pubDate').text().substr(0, 11);

        // console.log("--- article #" + count + "---");
        // console.log("title      : " + title);
        // console.log("link       : " + link);
        // console.log("pubDate    : " + date);
        // console.log("description: " + item.find("description").text());

        var rssRow = "<tr>"+
        "<td id='rssItem'><p><span id='rssDate'>"+date+" | </span>"+
        "<a href='"+link+"' id='rssTitle'>"+title+"</a></p></td>"+
        "</tr>";
        $("#rssFeed").append(rssRow);
        limit--;
      });
    },
    error: function(error) {
      $('#rssFeed').append("<p id='rssError'>RSS Feed cannot load</p>");
    }
  });
  // ----------------------------------------------------------------------------------------------
});





// Refactor to use Promises
// TODO: need to integrate/remove old stuff above
/*
var loadRSS = function(callback, url){
    return new Promise(function(resolve, reject){
        var xhr;
        if (window.XMLHttpRequest){
            xhr = new XMLHttpRequest();
        } else { // for older browsers
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function(){
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
                // console.log('Done!!!');
                resolve(callback(xhr.responseText));
            }
        }
        xhr.onerror = function(){
            console.log('Error!!!');
            reject('Rejecting ...');
        }
        xhr.open('GET', url);
        xhr.send();
    });
}
var parseCustomXML = function(data){
    var limit = 5, // set feed limit here
        temp = limit+1;
        count = 0;
    var prevTitle;
    var arr = [];
    $(data).find("entry").each(function() {
        if (limit<=0) return;
        count = temp-limit;
        var entry = $(this);
        var date = entry.find('updated').text();//.substr(5, 5);
        var link = entry.find('link').attr('href');
        var title = entry.find('title').text();
        if(title.includes(prevTitle)) {
            return; //break
        }
        // var rssRow = "<tr>"+
        //              "<td id='rssItem'>" +
        //              "<a href='"+link+"' id='rssTitle'><p>"+title+"</p></a></td>"+
        //              "</tr>";
        // $("#rssFeed").append(rssRow);
        arr.push([title, link, date]);
        limit--;
        prevTitle = title;
    });
    return arr;
}
var promises = [];
promises.push(loadRSS($.parseJSON, "getrss.php?feed=http://bulletins.it.ubc.ca/archives/category/security/feed"));
promises.push(loadRSS(parseCustomXML, "https://hub.bcchr.ca/createrssfeed.action?types=blogpost&blogpostSubTypes=comment&blogpostSubTypes=attachment&spaces=it&title=Confluence+RSS+Feed&labelString%3D&excludedSpaceKeys%3D&sort=modified&maxResults=10&timeSpan=1000&showContent=true&confirm=Create+RSS+Feed&"));
Promise.all(promises).then(function(res){
    console.log(res);
}).catch(function(err){
    console.log(err);
});
*/