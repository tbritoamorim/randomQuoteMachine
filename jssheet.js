var num = 1;
function tweet() {
  var quote = $(".quote").text();
  if (quote.length > 140) {
    quote = quote.slice(0, 140 - 3).concat("...");
  }
  window.open("https://twitter.com/intent/tweet?text=" + quote);
}
var apiQuote = 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies';
var headers = { 'X-Mashape-Key': 'nDegI0wJR6mshIjYx6LMEfYdXB3Lp1oa3FRjsnfnpNhjfD2Xjb',
 			   'Content-Type': 'application/x-www-form-urlencoded',
 			   'Accept': 'application/json'
 			};
var getQuote = function() {
  $.ajax({
    type: 'GET',
    url: apiQuote,
    headers: headers,
    success: function(response) {
      response = JSON.parse(response);
      processQuotes(response);
      num++;
    },
    error: function(err){
			console.log("An error occured", err);
		}
  });
};
var processQuotes = function(param) {
  var quote = "<img src='imgs/q1.png' class='quotation-1' /><p class='text-center quote animated'>" + param.quote + "</p><p class='author animated'>- " + param.author + "</p><img src='imgs/q2.png' class='quotation-2' />";
  var seen;
  if (num === 1) {
    seen = "<p id='numQuotes' class='text-center'>I have seen<br />" + num + " quote.</p>";
  } else {
  seen = "<p id='numQuotes' class='text-center'>I have seen<br />" + num + " quotes.</p>";
  }
  $(".quote-box").html(quote);
  $("#numQuotes").html(seen);
}
function getBg() {
   var bgs = ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg", "image6.jpg", "image7.jpg", "image8.jpg", "image0.jpg"];
   $(".quote-box").delay(4000).css({"background-image": "url(imgs/bgs/" + bgs[Math.floor(Math.random() * bgs.length)] + ")"});
}
$(document).ready(function(){
  getQuote();
  getBg();
  $("#submit").on("click", function() {
    $.when($(".quote, .author").animate({left: "1000px"}, {duration: 1000})).then(getQuote());
    getBg();
  });
  $("#twitter").on("click", function(){
    tweet();
  })
});
