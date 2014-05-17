require 'rack/contrib/try_static'
require 'rack/contrib/not_found'
require 'rack-cache'

use Rack::Deflater
#TODO: Setup memcache and test performance
use Rack::Cache, allow_reload: false, allow_revalidate: false

use Rack::Static,
  root: '_site',
  urls: %w(/images /javascript /css /ie /),
  index: 'index.html',
  cache_control: 'public, max-age=86400'

run Rack::NotFound.new('_site/404.html')
