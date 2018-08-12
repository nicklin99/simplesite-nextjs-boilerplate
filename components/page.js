import React from 'react'
import { string,object } from 'prop-types'

import Head from './head'
import Header from './shared/header'
import Footer from './shared/footer'

class Page extends React.Component {

  static childContextTypes = {
    
  }
  
  getChildContext() {
    return {...this.props.locale}
  }
  render() {
    const { children } = this.props

    return (
      <div>
        <Head />
        <Header route={this.props.route} navs={this.props.navs} />
        {children}
        <Footer navs={this.props.navs} />
      </div>
    )
  }
}

export default Page