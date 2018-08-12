
const path = require('path')
const fs = require('fs')

function getPages(dir, page, _paths) {
  const files = fs.readdirSync(dir)
  if (files.length ==0 ) {
    return []
  }
  files.forEach(file => {
    const _path = path.resolve(dir, file)
    const stat = fs.statSync(_path)
    const _file = '/' + file
    if (file === '_app.js') {
      return
    }
    if (stat.isDirectory()) {
      return getPages(dir + _file, _file, _paths)
    } else {
      _paths.push(_getPage( page + _file))
    }
  })
  return _paths
}

function _getPage(file) {
  return {
    page:composePage(file)
  }
}

function composePathName(prefix, page) {
  let _page = prefix + page
  if (_page != '/') {
    _page = _page.replace(/\/$/,'')
  }
  return _page
}

function composePage(file) {
  return file.replace('/index.js', '').replace('.js', '') || '/'
}

/**
 * 获取所有pages
 * @param {*} langs 
 */
module.exports = function getLangsPages (langs) {
  const pages = getPages('./pages','', [])

  let _pages = {}

  langs.forEach(lang => {
    pages.forEach(_page => {
      const _pathkey = composePathName(lang.path, _page.page)
      _pages[_pathkey] = _page
    })
  })

  return _pages
}