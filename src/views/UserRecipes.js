import React from 'react'

import { connect } from 'react-redux'
import { getRecipesAsyncActionCreator, deleteRecipeAsyncActionCreator, editRecipeAsyncActionCreator } from '../state/recipes'

import { Typography } from '@material-ui/core'
import RecipesList from '../components/RecipesList'
import SingleRecipe from './SingleRecipe'
import MultiAutocompleteInput from '../components/MultiAutocompleteInput'

const styles = {
  refresh: { cursor: 'pointer', color: 'blue' },
  autocomplete: { maxWidth: 700, margin: '30px auto' },
  noRecipes: { cursor: 'pointer' }
}

class UserRecipes extends React.Component {
  state = {
    selectedItem: []
  }

  setSelectedItem = (items) => this.setState({ selectedItem: items })

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    this.props._getData()
  }

  render() {
    if (this.props._isFetching.length === 0) {

      const recipesToShow = this.props._recipes.filter(recipe => {
        const ingredients = recipe.ingredients.map(el => el.ingredient)
        return this.state.selectedItem.reduce((red, el) => ingredients.includes(el) ? red : false, true)
      })

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
      if (this.props._recipes.length === 0) {
        return (
          <div>
            <Typography
              variant='h4'
              align='center'
              color='secondary'
            >
              Nie dodałeś/aś jeszcze żadnych przepisów.
          </Typography>
            <Typography
              style={styles.noRecipes}
              variant='h4'
              align='center'
              color='primary'
              onClick={() => this.props.history.push('/add-recipe')}
            >
              Dodaj przepis
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
          <div style={styles.autocomplete}>
            <MultiAutocompleteInput
              label='Co masz w lodówce?'
              placeholder='Wybierz produkt (zacznij pisać i wybierz z listy)'
              suggestions={this.props._suggestions}
              selectedItem={this.state.selectedItem}
              setSelectedItem={this.setSelectedItem}
            />
          </div>
          <RecipesList
            data={recipesToShow}
            route='/your-recipes'
            changeRoute={this.props.history.push}
          />
          {recipesToShow.length === 0 &&
            <Typography
              color='secondary'
              align='center'
              variant='h4'
            >
              Nie ma przepisu zawierającego te składniki
        </Typography>
          }
        </div>
      )
    }
    return null
  }
}

const mapStateToProps = state => ({
  _isError: state.recipes.isError,
  _recipes: state.recipes.recipes,
  _suggestions: state.recipes.suggestions,
  _isFetching: state.fullScreenCircuralProgress.circurals
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