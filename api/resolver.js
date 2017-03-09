var request = require('request');
var _ = require('underscore');
var emoji = require('emojilib')

// The API that returns the in-email representation.
module.exports = function(req, res) {
  var term = req.query.text.trim();
  if (!term) {
    res.json([{
      title: '<i>(enter a search term)</i>',
      text: ''
    }]);
    return;
  }

  // See if any emoji's match the term query
  var results = [];
  for (var i = 0; i < emoji.ordered.length; i++) {
    if (emoji.ordered[i].indexOf(term) == 0) {
      results.push(emoji.ordered[i]);
    }
  }

  // Send back results
  if (results.length === 0) {
    res.json([{
      title: '<i>(no results)</i>',
      text: ''
    }]);
  } else {
    results.map(function(result) {
      res.json({
        body: '<span class="emoji">' + emoji.lib[result].char + '</span>'
      });
    })
  }
}