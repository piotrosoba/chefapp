import React from 'react'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { openDrawerActionCreator, closeDrawerActionCreator } from '../state/drawer'

import { SwipeableDrawer, List, ListItemText, ListItem } from '@material-ui/core'

const links = [
  { title: 'Dodaj przepis', route: '/add-recipe' },
  { title: 'Przepisy', route: '/recipes' },
  { title: 'Twoje przepisy', route: 'your-recipes' },
]

const Drawer = props => {
  return (
    <SwipeableDrawer
      open={props._isOpen}
      onClose={props._close}
      onOpen={props._open}
    >
      <List>
        {links.map(link => (
          <ListItem
            onClick={() => {
              props._close()
              props.history.push(link.route)
            }}
            button={true}
            key={link.title}
          >
            <ListItemText
              primary={link.title}
            />
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  )
}

const mapStateToProps = state => ({
  _isOpen: state.drawer.isOpen
})

const mapDispatchToProps = dispatch => ({
  _open: () => dispatch(openDrawerActionCreator()),
  _close: () => dispatch(closeDrawerActionCreator())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Drawer))