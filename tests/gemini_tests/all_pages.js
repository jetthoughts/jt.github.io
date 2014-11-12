var HTML_EXTENSION_SIZE = 4

var gemini = require('gemini'), glob = require('glob'), pages_arr = glob.sync('./_site/*.html'),
  page_path = '', page_name = '', suite_name = '', capture_name = '1366x768_all_screen',
  capture_element = 'body';

var screens = {
    big: {width: 1920, height: 1080}, meddium: {width: 1440, height: 900},
    small: {width: 1366, height: 768}, mobile: {width: 400, height: 768}
  };

for(var i = 0; i < pages_arr.length; i++) {
  page_path = pages_arr[i].replace('./_site', '');
  page_name = page_path.replace(/[^\w\s]/gi, '');
  suite_name = '1366x768_' + page_name.substring(0, page_name.length - HTML_EXTENSION_SIZE);

  gemini.suite(suite_name, function(suite) {
    suite.before(function(actions, find) {
        actions.setWindowSize(screens.small.width, screens.small.height)
      })
      .setUrl(page_path)
      .setCaptureElements(capture_element)
      .capture(capture_name);
  });
};
