var gemini = require('gemini'),
  glob = require('glob');

gemini.suite('pages', function(suite) {
  pages_arr = glob.sync('./_site/**/*.html')
  for(var i = 0; i < pages_arr.length; i++) {
    suite.setUrl(pages_arr[i])
      .setCaptureElements('body')
      .capture(pages_arr[i])
  }
});
