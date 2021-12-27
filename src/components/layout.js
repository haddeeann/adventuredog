import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = null;
  } else {
    header = (
      <header className="global-header">
        <Link className="header-link-home" to="/">
          {title}
        </Link>
      </header>
    )
  }

  return (
    <div>
      <div className='secret-wrapper'>
        <div className='top-secret'></div>
        <div className='bottom-secret'></div>
        <div className='left-secret'></div>
        <div className='right-secret'></div>
      </div>
      <div className="body-wrapper" data-is-root-path={isRootPath}>
        {header}
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </div>

  )
}

export default Layout
