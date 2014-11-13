var gemini = require('gemini');

gemini.suite('buttons', function(suite) {
  suite.setUrl('/')
    .setCaptureElements('.button')
    .before(function(actions, find) {
      this.button = find('.button');
    })
    .capture('plain')
    .capture('hovered', function(actions, find) {
        actions.mouseMove(this.button);
    }).capture('pressed', function(actions, find) {
        actions.mouseDown(this.button);
    });
});
