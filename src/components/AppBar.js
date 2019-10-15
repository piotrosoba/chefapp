import React from 'react'
import { withRouter, Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { openDrawerActionCreator } from '../state/drawer'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import SettingsIcon from '@material-ui/icons/Settings'

import logo from '../img/logo.png'

const styles = {
  toolbar: { justifyContent: 'space-between' },
  logo: { cursor: 'pointer' },
  link: { textDecoration: 'none', color: 'black' }
}

const MenuAppBar = props => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div >
      <AppBar position="static">
        <Toolbar style={styles.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={props._drawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <img
            onClick={() => props.history.push('/')}
            style={styles.logo}
            src={logo}
            alt='logo'
          />
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <SettingsIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <Link to='/change-password' style={styles.link}>
                <MenuItem onClick={handleClose}>Zmień hasło</MenuItem>
              </Link>
              <Link to='/' style={styles.link}>
                <MenuItem onClick={handleClose}>Wyloguj się</MenuItem>
              </Link>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div >
  )
}

const mapDispatchToProps = (dispatch) => ({
  _drawerOpen: () => dispatch(openDrawerActionCreator())
})

export default connect(
  null,
  mapDispatchToProps
)(withRouter(MenuAppBar))