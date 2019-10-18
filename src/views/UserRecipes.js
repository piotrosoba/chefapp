import React from 'react'

import { connect } from 'react-redux'
import { getRecipesAsyncActionCreator } from '../state/recipes'

import { Typography } from '@material-ui/core'
import RecipesList from '../components/RecipesList'

const styles = {
  refresh: { cursor: 'pointer', color: 'blue' }
}

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
    if (this.props._isError) {
      return (
        <div>
          <Typography
            variant='h4'
            align='center'
            color='error'
          >
            Nie udało się pobrać przepisów
          </Typography>
          <Typography
            style={styles.refresh}
            variant='h4'
            align='center'
            onClick={this.getData}
          >
            Odśwież
          </Typography>
        </div>
      )
    }
    return (
      <div>
        <RecipesList
          data={this.props._recipes}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  _isError: state.recipes.isError,
  _recipes: state.recipes.recipes
})

const mapDispatchToProps = dispatch => ({
  _getData: () => dispatch(getRecipesAsyncActionCreator())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserRecipes)