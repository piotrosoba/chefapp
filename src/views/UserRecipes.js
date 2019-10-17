import React from 'react'

import { connect } from 'react-redux'
import { getRecipesAsyncActionCreator } from '../state/recipes'

class UserRecipes extends React.Component {
  state = {

  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    this.props._getData()
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  _getData: () => dispatch(getRecipesAsyncActionCreator())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserRecipes)