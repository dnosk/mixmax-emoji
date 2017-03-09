var request = require('request');
var _ = require('underscore');
var emoji = require('emojilib')

// The Type Ahead API
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
    var response = _.chain(results)
      .map(function(result) {
        return {
          title: emoji.lib[result].char + '  ' + result,
          text: result
        };
      })
      .value();
    res.json(response);
  }
};