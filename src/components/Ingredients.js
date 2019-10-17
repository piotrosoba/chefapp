import React from 'react'

import { TextField, Fab, Paper, Typography, IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'


const MAX_LENGTH = 30
const MIN_INGREDIENT_LENGTH = 3

const styles = {
  container: { maxWidth: 380 },
  inputsDiv: { display: 'flex', justifyContent: 'center' },
  input: { margin: '10px 20px 10px 0', maxWidth: 150 },
  addButton: { marginTop: 18 },
  paper: { maxWidth: 380, padding: 10, marginTop: 10, marginBottom: 10 },
  singleIngredient: { display: 'flex' },
  singleIngredientTypography: { flexGrow: 1 },
  singleIngredientRemoveButton: { width: 30, height: 30, alignSelf: 'center' }

}

const Ingredients = props => {
  const [ingredient, setIngredient] = React.useState('')
  const [ingredientError, setIngredientError] = React.useState(false)
  const ingredientValidate = value => {
    const validValue = value && value.replace(/\s{2,}/g, ' ')
    if (value !== validValue) {
      setIngredient(validValue)
    }
    const isError = !validValue || validValue.length < MIN_INGREDIENT_LENGTH
    setIngredientError(isError)
    return isError
  }
  const setValidIngredient = string => {
    if (string.length < MAX_LENGTH) {
      setIngredient(string)
    }
  }
  const focusTo = React.useRef(null)

  const [quantity, setQuantity] = React.useState('')
  const [quantityError, setQuantityError] = React.useState(false)
  const quantityValidate = value => {
    const validValue = value && value.replace(/\s{2,}/g, ' ')
    if (value !== validValue) {
      setQuantity(validValue)
    }
    const isError = !validValue
    setQuantityError(isError)
    return isError
  }
  const setValidQuantity = string => {
    if (string.length < MAX_LENGTH) {
      setQuantity(string)
    }
  }

  const onSubmit = () => {
    const isIngredientError = ingredientValidate(ingredient)
    const isQuantityError = quantityValidate(quantity)

    if (!isIngredientError && !isQuantityError) {
      props.setIngredients([
        ...props.ingredients,
        {
          ingredient: ingredient.toLowerCase(),
          quantity
        }
      ])
      setIngredient('')
      setQuantity('')
      props.setIngredientsError(false)
      focusTo.current.focus()
    }
  }

  const submitOnEnter = evt => {
    if (evt.key === 'Enter') {
      onSubmit()
    }
  }

  const removeIngredient = index => {
    props.setIngredients(props.ingredients.filter((el, i) => index !== i))
  }

  const inputs = [
    {
      label: 'Składnik',
      value: ingredient,
      error: ingredientError || props.ingredientsError,
      helperText: 'Min 3 znaki',
      onChange: setValidIngredient,
      validate: ingredientValidate,
      inputRef: focusTo
    },
    {
      label: 'Ilość',
      value: quantity,
      error: quantityError || props.ingredientsError,
      helperText: 'Podaj ilość',
      onChange: setValidQuantity,
      validate: quantityValidate
    },
  ]
  return (
    <div style={styles.container}>
      {props.ingredientsError &&
        <Typography
          color='error'
          align='center'
        >
          <b>Dodaj składnik!</b>
        </Typography>
      }
      <div style={styles.inputsDiv}>
        {inputs.map(input =>
          <TextField
            key={input.label}
            style={styles.input}
            variant='outlined'
            fullWidth
            label={input.label}
            value={input.value}
            error={input.error}
            helperText={input.error && input.helperText}
            onChange={evt => {
              input.onChange(evt.target.value)
              if (input.error) {
                input.validate(evt.target.value)
              }
            }}
            onKeyPress={submitOnEnter}
            inputRef={input.inputRef}
          />
        )}
        <Fab
          style={styles.addButton}
          size='small'
          color='primary'
          onClick={onSubmit}
        >
          <AddIcon />
        </Fab>
      </div>
      {
        props.ingredients.length > 0 &&
        <Paper style={styles.paper}>
          <Typography
            align='center'
          >
            Składniki:
        </Typography>
          {props.ingredients.map((ingredient, index) => (
            <div
              style={styles.singleIngredient}
              key={ingredient.ingredient + ingredient.quantity + index}
            >
              <Typography
                style={styles.singleIngredientTypography}
              >
                {index + 1}. {ingredient.ingredient} - {ingredient.quantity}
              </Typography>
              <IconButton
                style={styles.singleIngredientRemoveButton}
                size='small'
                onClick={() => removeIngredient(index)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </Paper>
      }
    </div>
  )
}

export default Ingredients