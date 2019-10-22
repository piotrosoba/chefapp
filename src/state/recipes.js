import axios from 'axios'
import { URL } from '../consts/firebase'
import { circuralProgress } from './fullScreenCircuralProgress'
import { addSnackbar } from './snackbars'
import mapObjectToArray from '../utilities/mapObjectToArray'

const SAVE_RECIPES = 'recipes/SAVE_RECIPE'
const ERROR_ON_GET = 'recipes/ERROR_ON_GET'

export const addRecipeAsyncActionCreator = form => (dispatch, getState) => {
  dispatch(circuralProgress.add())
  return axios.post(URL + 'recipes.json', form)
    .then(() => {
      dispatch(circuralProgress.remove())
      dispatch(addSnackbar('Przepis dodano prawidłowo'))
    })
    .catch(() => {
      dispatch(circuralProgress.remove())
      dispatch(addSnackbar('Dodawanie nie powiodło się, spróbuj ponownie później', 'red'))
      return Promise.reject()
    })
}

export const getRecipesAsyncActionCreator = () => (dispatch, getState) => {
  dispatch(circuralProgress.add())
  axios.get(URL + 'recipes.json')
    .then((response) => {
      const mappedData = mapObjectToArray(response.data)
      dispatch(saveRecipesActionCreator(mappedData))
      dispatch(circuralProgress.remove())
    })
    .catch(() => {
      dispatch(circuralProgress.remove())
      dispatch(errorOnGetRecipesActionCreator())
    })
}

export const deleteRecipeAsyncActionCreator = (key, success, error) => (dispatch, getState) => {
  dispatch(circuralProgress.add())
  axios.delete(URL + 'recipes/' + key + '.json')
    .then(() => {
      const recipes = getState().recipes.recipes
      const recipesAfterDelete = recipes.filter(recipe => recipe.key !== key)
      dispatch(saveRecipesActionCreator(recipesAfterDelete))
      dispatch(addSnackbar('Przepis usunięto prawidłowo'))
      dispatch(circuralProgress.remove())
      success()
    })
    .catch(() => {
      dispatch(addSnackbar('Usuwanie nie powiodło się, spróbuj ponownie później', 'red'))
      dispatch(circuralProgress.remove())
      error()
    })
}

export const editRecipeAsyncActionCreator = (form, key, success, error) => (dispatch, getState) => {
  dispatch(circuralProgress.add())
  axios.patch(URL + 'recipes/' + key + '', form)
    .then(() => {
      const recipes = getState().recipes.recipes
      const recipesAfterEdite = recipes.map(recipe => {
        if (recipe.key === key) {
          return form
        }
        return recipe
      })
      dispatch(saveRecipesActionCreator(recipesAfterEdite))
      dispatch(addSnackbar('Przepis edytawno.'))
      dispatch(circuralProgress.remove())
      success()
    })
    .catch(() => {
      dispatch(addSnackbar('Edytowanie nie powiodło się, spróbuj ponownie później', 'red'))
      dispatch(circuralProgress.remove())
      error()
    })
}

const saveRecipesActionCreator = recipes => ({
  type: SAVE_RECIPES,
  recipes
})

const errorOnGetRecipesActionCreator = () => ({ type: ERROR_ON_GET })

const initialState = {
  recipes: [],
  isError: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_RECIPES:
      return {
        ...state,
        isError: false,
        recipes: action.recipes
      }
    case ERROR_ON_GET:
      return {
        ...state,
        isError: true
      }
    default:
      return state
  }
}