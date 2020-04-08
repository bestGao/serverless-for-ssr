/* eslint-disable react/no-danger*/

import React from 'react'
import { Helmet } from 'react-helmet'
import serialize from 'serialize-javascript'

interface IHtmlProps {
  styles: React.ReactElement[]
  scripts: React.ReactElement[]
  children: string
  state?: any
  store?: object
}

const Html:React.FC<IHtmlProps> = ({
  styles = [], scripts = [], children, state, store,
}) => {
  const head = Helmet.renderStatic()

  return (
    <html lang='zh'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {styles}
        <script
          id='ssr-store'
          dangerouslySetInnerHTML={{
            __html: `window.initialStore = ${serialize(store)}`,
          }}
        />
        <script
          id='ssr-data'
          dangerouslySetInnerHTML={{
            __html: `window.initialData = ${serialize(state)}`,
          }}
        />
      </head>
      <body>
        <div
          id='root'
          dangerouslySetInnerHTML={{
            __html: children,
          }}
        />
        {scripts}
      </body>
    </html>
  )
}

Html.defaultProps = {
  scripts: [],
  styles: [],
  state: {},
}

export default Html
