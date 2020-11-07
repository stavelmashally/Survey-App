import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Payments from './Payments'

const Header = () => {
  const auth = useSelector(({auth}) => auth)

  function renderContent() {
    switch (auth) {
      case null:
        return
      case false:
        return (
          <li>
            <a href="/auth/google">Sign In With Google</a>
          </li>
        )
      default:
        return (
          <>
            <li>
              <Payments />
            </li>
            <li style={{margin: '0 10px'}}>{`Credits: ${auth.credits}`}</li>
            <li>
              <a href="/api/logout">Logout</a>
            </li>
          </>
        )
    }
  }

  return (
    <nav>
      <div className="nav-wrapper teal">
        <Link
          className="left brand-logo"
          style={{marginLeft: '10px'}}
          to={auth ? '/surveys' : '/'}
        >
          Survey App
        </Link>
        <ul className="right">{renderContent()}</ul>
      </div>
    </nav>
  )
}

export default Header
