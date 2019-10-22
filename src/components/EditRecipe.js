import React from 'react'

import { Dialog, TextField, Typography, InputAdornment, Button } from '@material-ui/core'
import Ingredienst from './Ingredients'

const MAX_NAME_LENGTH = 45
const MIN_NAME_LENGTH = 4
const MIN_DESCRIPTION_LENGTH = 20
const MAX_DESCRIPTION_LENGTH = 1500
const MAX_TIME = 240

const styles = {
  input: { maxWidth: 380, margin: '10px 0' },
  randomPhoto: { margin: '-10px auto 10px auto', cursor: 'pointer', color: 'blue' },
  buttonDiv: { display: 'flex', justifyContent: 'space-around', marginTop: 20 }
}

const EditRecipe = props => {
  const [name, setName] = React.useState(props.data.name || '')
  const [nameError, setNameError] = React.useState(false)
  const nameValidate = (value) => {
    const validValue = value && value.replace(/\s{2,}/g, ' ')
    if (value !== validValue) {
      setName(validValue)
    }
    const isError = !validValue || validValue.length < MIN_NAME_LENGTH
    setNameError(isError)
    return isError
  }
  const setValidName = (string) => {
    if (string.length < MAX_NAME_LENGTH) {
      setName(string)
    }
  }

  const [description, setDescription] = React.useState(props.data.description || '')
  const [descriptionError, setDescriptionError] = React.useState(false)
  const descriptionValidate = value => {
    const validValue = value && value.replace(/\s{2,}/g, ' ')
    if (value !== validValue) {
      setDescription(validValue)
    }
    const isError = !validValue || validValue.length < MIN_DESCRIPTION_LENGTH
    setDescriptionError(isError)
    return isError
  }
  const setValidDescription = string => {
    if (string.length < MAX_DESCRIPTION_LENGTH) {
      setDescription(string)
    }
  }

  const [time, setTime] = React.useState(props.data.time || '')
  const [timeError, setTimeError] = React.useState(false)
  const timeValidate = (value) => {
    value = Number(Number(value).toFixed(2))
    setTime(value)
    const isError = value < 1
    setTimeError(isError)
    return isError
  }
  const setValidTime = value => {
    setTime(value < 0 ? 0 : value > MAX_TIME ? MAX_TIME : value)
  }

  const [photo, setPhoto] = React.useState(props.data.photo || '')
  const [photoError, setPhotoError] = React.useState(false)
  const photoValidate = value => {
    const isError = !value || !value.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/)
    setPhotoError(isError)
    return isError
  }

  const [ingredients, setIngredients] = React.useState(props.data.ingredients || [])
  const [ingredientsError, setIngredientsError] = React.useState(false)
  const ingredientsValidate = value => {
    const isError = value.length === 0
    setIngredientsError(isError)
    return isError
  }

  const onSubmit = () => {
    const isNameError = nameValidate(name)
    const isDescriptionError = descriptionValidate(description)
    const isIngredientsError = ingredientsValidate(ingredients)
    const isTimeError = timeValidate(time)
    const isPhotoError = photoValidate(photo)

    if (!isNameError && !isDescriptionError && !isIngredientsError && !isTimeError && !isPhotoError) {
      const form = {
        name,
        description,
        ingredients,
        time,
        photo,
        key: props.data.key
      }

      props._editRecipe(form, props.data.key, props.onClose, () => { })
    }
  }

  const inputs = [
    {
      label: 'Nazwa',
      value: name,
      onChange: setValidName,
      error: nameError,
      validate: nameValidate,
      helperText: 'Zbyt krótka nazwa, minimum 4 znaki'
    },
    {
      label: 'Składniki'
    },
    {
      label: 'Sposób przyrządzenia',
      value: description,
      onChange: setValidDescription,
      error: descriptionError,
      validate: descriptionValidate,
      helperText: 'Zbyt krótka nazwa, minimum 15 znaki',
      multiline: true
    },
    {
      label: 'Czas przyrządzenia',
      value: time,
      onChange: setValidTime,
      error: timeError,
      validate: timeValidate,
      helperText: 'Podaj prawidłowy czas',
      type: 'number',
      InputProps: {
        endAdornment: <InputAdornment position="end">min</InputAdornment>,
      }
    },
    {
      label: 'Zdjęcie',
      value: photo,
      onChange: setPhoto,
      error: photoError,
      validate: photoValidate,
      helperText: 'Podaj prawidłowy adres URL',
      placeholder: 'http://'
    },
  ]
  return (
    <Dialog
      open={true}
      onClose={props.onClose}
      PaperProps={{
        style: { padding: 20 }
      }}
    >
      {inputs.map(input => input.label === 'Składniki' ?
        <Ingredienst
          key={input.label}
          ingredients={ingredients}
          setIngredients={setIngredients}
          ingredientsError={ingredientsError}
          setIngredientsError={setIngredientsError}
        />
        :
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
          onBlur={() => input.validate(input.value)}
          multiline={input.multiline}
          type={input.type || 'text'}
          InputProps={input.InputProps}
          placeholder={input.placeholder}
        />
      )}
      <Typography
        style={styles.randomPhoto}
        onClick={() => {
          setPhoto('https://source.unsplash.com/random')
          setPhotoError(false)
        }}
      >
        (losowe zdjęcie)
      </Typography>
      <div
        style={styles.buttonDiv}
      >
        <Button
          variant='contained'
          color='primary'
          onClick={onSubmit}
        >
          Zatwierdź
          </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={props.onClose}
        >
          Anuluj
          </Button>
      </div>
    </Dialog>
  )
}

export default EditRecipe