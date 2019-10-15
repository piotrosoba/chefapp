import React from 'react'

import { connect } from 'react-redux'

import { TextField, InputAdornment } from '@material-ui/core'

const MAX_NAME_LENGTH = 45
const MIN_NAME_LENGTH = 4
const MIN_DESCRIPTION_LENGTH = 20
const MAX_DESCRIPTION_LENGTH = 1500
const MAX_TIME = 240

const styles = {
  div: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  input: { maxWidth: 380, margin: '10px 0' }
}

const AddRecipe = props => {
  const [name, setName] = React.useState('')
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

  const [description, setDescription] = React.useState('')
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

  const [time, setTime] = React.useState('')
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

  const [photo, setPhoto] = React.useState('')
  const [photoError, setPhotoError] = React.useState(false)
  const photoValidate = value => {
    const isError = !value || !value.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/)
    setPhotoError(isError)
    return isError
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
    <div
      style={styles.div}
    >
      {inputs.map(input => (
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
      ))}
    </div>
  )
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRecipe)