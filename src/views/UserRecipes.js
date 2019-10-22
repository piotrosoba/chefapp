import React from 'react'

import { connect } from 'react-redux'
import { getRecipesAsyncActionCreator, deleteRecipeAsyncActionCreator, editRecipeAsyncActionCreator } from '../state/recipes'

import { Typography } from '@material-ui/core'
import RecipesList from '../components/RecipesList'
import SingleRecipe from './SingleRecipe'

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

    if (this.props.match.params.id) {
      const recipe = this.props._recipes.find(el => el.key === this.props.match.params.id)
      return <SingleRecipe
        data={recipe}
        param={this.props.match.params.id}
        back={() => this.props.history.push('/your-recipes')}
        _deleteRecipe={this.props._deleteRecipe}
        _editRecipe={this.props._editRecipe}
      />
    }

    return (
      <div>
        <RecipesList
          data={this.props._recipes}
          route='/your-recipes'
          changeRoute={this.props.history.push}
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
  _getData: () => dispatch(getRecipesAsyncActionCreator()),
  _deleteRecipe: (key, success, error) => dispatch(deleteRecipeAsyncActionCreator(key, success, error)),
  _editRecipe: (form, key, success, error) => dispatch(editRecipeAsyncActionCreator(form, key, success, error))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserRecipes)