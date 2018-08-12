import React from 'react'
import App, { Container } from 'next/app'

import Page from '../components/page'
import '../styles/style.less'

import cn from '../locale/cn'
import en from '../locale/en'

const defaultLang = 'cn'
let lang = defaultLang
const langs = {
  cn,
  en,
}
let isServer = false
let path = ''

const pathprefix = {
  cn: '',
  en:'/en'
}

const navs = [
  
]
/**
 * ctx.req
 */
export default class MyApp extends App {

  // server
  static async getInitialProps(a) {
    const { Component, router, ctx } = a
 
    if (ctx.req) {
      isServer = true
    }

    if (isServer) {
      path = ctx.req.url
    } else {
      path = ctx.pathname
    }

    if (path.match(/^\/en/g)) {
      lang = 'en'
    } else {
      lang = defaultLang
    }

    const route = {
      path: router.route,
      query: router.query,
    }

    let pageProps = {
      lang,
      route
    }
 
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    
    return {pageProps}
  }

  constructor(props) {
    super(props)

    this.getURL = this.getURL.bind(this)

    this.state = {
      lang
    }
  }

  match(path) {
    if (path.match(/^\/en/g)) {
      lang = 'en'
    } else {
      lang = defaultLang
    }
    this.setState({
      lang
    })
  }

  componentDidMount() {
    this.match(window.location.pathname)
    window.$app = this
    window.$app.lang = lang
  }

  changeLang(_lang) {
    if (this.state.lang === _lang) {
      return
    }
    lang = _lang
    this.setState({
      lang
    })
    const ori = this.props.pageProps.route.path
    let path = ori.replace(/^\/(en|cn|de|fr)/, '')
    const url = `${pathprefix[_lang]}${path}`
    this.props.router.push(path || '/', url)
    window.$app.lang = lang
  }

  getURL(path) {
    return pathprefix[this.state.lang] + path
  }

  render () {
    const { Component, pageProps } = this.props
    const _navs = navs.map(item => {
      return `${pathprefix[this.state.lang]}${item}`
    })
  
    if (_navs[0]==='') {
      _navs[0] = '/'
    }

    return <Container>
      <Page locale={langs[this.state.lang]} route={pageProps.route} navs={_navs}>
        <Component {...pageProps} {...this.state} url={this.getURL} />
      </Page>
    </Container>
  }
}