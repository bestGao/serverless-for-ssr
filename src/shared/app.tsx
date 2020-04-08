import React from 'react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Switch, Route } from 'react-router-dom'
import { HashLink as Link } from 'react-router-hash-link'
import { hot } from 'react-hot-loader/root'
import { get } from 'lodash'
import { IStoreState } from 'typings/store'
import Navbar from 'components/Navbar'
import Dropdown from '@/shared/components/Dropdown'
import Avatar from 'components/Avatar'
import RouterConfig from '@/shared/routers'
import MenuItems from '@/shared/menu-items'
import 'styles/variable.css'
import 'styles/reset.css'
import 'styles/module.css'
import 'highlight.js/styles/github.css'
import 'styles/markdown.css'
import './app.less'

const App: React.FC = () => {
  const user = useSelector<IStoreState, IStoreState['user']>((state) => state?.user)

  console.log('[测试ts-plugin-import的兼容性]', get({}, 'a'))

  return (
    <div className='app-wrap'>
      <Helmet>
        <title>tod-react-template-ssr</title>
        <meta name='author' content='tod' />
        <meta name='description' content='tod react ssr' />
      </Helmet>
      <Navbar className='navbar'>
        <h1>
          <img alt='logo' className='logo' src={require('@/shared/imgs/logo.png').default} />
          <span>tod-react-template-ssr</span>
        </h1>
        <Avatar user={user} />
      </Navbar>
      <section className='section'>
        <section className='section-left'>
          {
            MenuItems.map((item, index) => (
              <Dropdown key={item.to} title={item.name} expand={index === 0}>
                {
                  item?.children?.map((c) => (
                    <Link key={c.to} to={c.to}><div>{c.name}</div></Link>
                  ))
                }
              </Dropdown>
            ))
          }
        </section>
        <section className='section-right'>
          <Switch>
            {
            RouterConfig.map((r) => <Route key={r.path} {...r} />)
          }
          </Switch>
        </section>
      </section>
    </div>
  )
}

export default hot(App)
