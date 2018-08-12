const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
 
const dev = process.env.NODE_ENV !== 'production'
/**
 * dev (bool) whether to launch Next.js in dev mode - default false
dir (string) where the Next project is located - default '.'
quiet (bool) Hide error messages containing server information - default false
conf (object) the same object you would use in next.config.js - default {}
 */
const app = next({ dev })
const handle = app.getRequestHandler()

module.exports = function (langs,port) {
  app.prepare().then(() => {
    createServer((req, res) => {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl

      const _langs = langs.filter(item=> !item.isdefault)

      const pattern = new RegExp('^\/(' + _langs.join('|') + ')','g')
      const matched = pathname.match(pattern)
  
      if (matched) {
        const _path = pathname.replace(pattern, '') || '/'
        app.render(req, res, _path, query)
      } else {
        handle(req, res, parsedUrl)
      }
    }).listen(port, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:' + port)
    })
  })
}