console.log('testing');

var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var targetURL = "http://www.arstechnica.com";
console.log("visiting page " + targetURL);
request(targetURL, function(error, response, body) {
  if (error) {
    console.log("Error: " + error);
  }
  // check status code
  console.log("Status code: " + response.statusCode);
  if(response.statusCode === 200) {
    // parse the document
    var $ = cheerio.load(body);
    console.log("Page title: " + $('title').text());

    if (searchForWord($,"android")) {
      console.log('found your word sucka');
    }
  }

  collectInternalLinks($);


});

function searchForWord($, word) {
  var bodyText = $('html > body').text();
  if(bodyText.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
    return true;
  }
  return false;
}

function collectInternalLinks($) {
  var allRelativeLinks = [];
  var allAbsoluteLinks = [];

  var relativeLinks = $("a[href^='/']");
  relativeLinks.each(function() {
      allRelativeLinks.push($(this).attr('href'));

  });

  var absoluteLinks = $("a[href^='http']");
  absoluteLinks.each(function() {
      allAbsoluteLinks.push($(this).attr('href'));
  });

  console.log("Found " + allRelativeLinks.length + " relative links");
  console.log("Found " + allAbsoluteLinks.length + " absolute links");
}
