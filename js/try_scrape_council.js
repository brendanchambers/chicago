
var request = require('request');
var URL = require('url-parse');
var cheerio = require('cheerio');
targetURL = "https://chicago.legistar.com/LegislationDetail.aspx?ID=3481446&GUID=27CD2952-7417-45DD-82F5-02FFA9E03DA7&Options=Advanced&Search=";

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
    console.log("Page body list items: " + $('body').find('li'));

    // get the votes contained on this page
    scrapeLinks($); // get the address (todo)

  }
});

voteURL = "https://chicago.legistar.com/HistoryDetail.aspx?ID=15140828&GUID=8EA223C9-BA3D-41F3-A087-62B835565C43";
request(voteURL, function(error, response, body) {
  if (error) {
    console.log("Error: " + error);
  }
  // check status code
  console.log("Status code: " + response.statusCode);
  if(response.statusCode === 200) {
    // parse the document
    var $ = cheerio.load(body);
    console.log("Page title: " + $('title').text());
    console.log("Page body list items: " + $('body').find('li'));

    if (searchForWord($,"Yes"") {  // todo get vote tallies
      console.log('found your word sucka');
    }

  }
  });


// helper functions

function searchForWord($, word) {
  var bodyText = $('html > body').text();
  if(bodyText.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
    return true;
  }
  return false;
}

function scrapeLinks($) {
  let allLinks = [];
  let allIDs = [];
  let allEvents = [];

  theLinks = [];

  let links = $("a[href]");
  links.each(function() {

    myLink = $(this).attr('href');
    myID = $(this).attr('id');
    myEvent = $(this).attr('onclick');

    theLinks.push( {"link":myLink,
                    "id":myID,
                    "event":myEvent});
  });

  console.log("Found " + allLinks.length + " links");
  console.log(theLinks);


}
