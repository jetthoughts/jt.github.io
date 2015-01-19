// Use only if your Grunt plugin isn't available for Gulp
// All grunt tasks run as gulp tasks
// For more information read https://www.npmjs.com/package/gulp-grunt
// As main JavaScript task runner use Gulp

module.exports = function(grunt) {
  grunt.initConfig({
    wpt: {
      options: {
        locations: ['Dulles:Chrome'],
        key: 'A.9680d066b8ba2f4876d57c54f7b36a19'
      },
      sideroad: {
        options: {
          url: [
            'http://www.jetthoughts.com/',
            'http://www.jetthoughts.com/portfolio.html',
            'http://www.jetthoughts.com/team.html',
            'http://www.jetthoughts.com/career.html',
            'http://www.jetthoughts.com/work.html',
            'http://www.jetthoughts.com/blog/index.html',
            'http://www.jetthoughts.com/contact.html'
          ]
        },
        dest: 'tmp/sideroad/'
      }
    },
    pagespeed: {
      options: {
        nokey: true,
        url: "http://www.jetthoughts.com"
      },
      prod: {
        options: {
          url: "http://www.jetthoughts.com",
          locale: "en_GB",
          strategy: "desktop",
          threshold: 80
        }
      },
      paths: {
        options: {
          paths: [
                    "/portfolio.html",
                    "/team.html",
                    "/career.html",
                    "/work.html",
                    "/blog/index.html",
                    "/contact.html"
                 ],
          locale: "en_GB",
          strategy: "desktop",
          threshold: 80
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-wpt');

  grunt.loadNpmTasks('grunt-pagespeed');
}
