var gemini = require('gemini');

gemini.suite('buttons', function(suite) {
    suite.setUrl('/')
        .setCaptureElements('.button')
        .capture('plain')
        .capture('hovered', function(actions) {
            actions.mouseMove('.button');
        }).capture('pressed', function(actions, find) {
            actions.mouseDown(find('.button'));
        });
});
