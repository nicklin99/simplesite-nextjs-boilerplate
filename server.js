/**
 * boot my server
 */
const boot = require('./packages/server')
const langs = require('./packages/lang')

boot(langs, 3000)