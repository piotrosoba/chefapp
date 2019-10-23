import React from 'react'
import Downshift from 'downshift'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
  },
  divider: {
    height: theme.spacing(2),
  },
}))

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
      }}
      {...other}
    />
  )
}

function renderSuggestion(suggestionProps) {
  const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps
  const isHighlighted = highlightedIndex === index
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.label}
    </MenuItem>
  )
}

function getSuggestions(suggestions, value, { showEmpty = false } = {}) {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length
  let count = 0

  return inputLength === 0 && !showEmpty
    ? []
    : suggestions.map(el => ({ label: el })).filter(suggestion => {
      const keep =
        count < 7 && suggestion.label.split(' ').reduce((red, el) => el.startsWith(inputValue) ? true : red, false)

      if (keep) {
        count += 1
      }

      return keep
    })
}

const MultiAutoCompleteInput = (props) => {
  const classes = useStyles()
  const [inputValue, setInputValue] = React.useState('')
  const { selectedItem, setSelectedItem } = props

  const handleKeyDown = event => {
    if (selectedItem.length && !inputValue.length && event.key === 'Backspace') {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1))
    }
  }

  const handleInputChange = event => {
    setInputValue(event.target.value)
  }

  const handleChange = item => {
    let newSelectedItem = [...selectedItem]
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item]
    }
    setInputValue('')
    setSelectedItem(newSelectedItem)
  }

  const handleDelete = item => () => {
    const newSelectedItem = [...selectedItem]
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1)
    setSelectedItem(newSelectedItem)
  }

  return (
    <Downshift
      id="downshift-multiple"
      inputValue={inputValue}
      onChange={handleChange}
      selectedItem={selectedItem}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        isOpen,
        inputValue: inputValue2,
        selectedItem: selectedItem2,
        highlightedIndex,
      }) => {
        const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
          onKeyDown: handleKeyDown,
          placeholder: props.placeholder,
        })

        return (
          <div className={classes.container}>
            {renderInput({
              variant: 'outlined',
              fullWidth: true,
              classes,
              label: props.label,
              InputLabelProps: getLabelProps(),
              InputProps: {
                startAdornment: selectedItem.map(item => (
                  <Chip
                    key={item}
                    tabIndex={-1}
                    label={item}
                    className={classes.chip}
                    onDelete={handleDelete(item)}
                  />
                )),
                onBlur,
                onChange: event => {
                  handleInputChange(event)
                  onChange(event)
                },
                onFocus,
              },
              inputProps,
            })}

            {isOpen ? (
              <Paper className={classes.paper} square>
                {getSuggestions(props.suggestions, inputValue2).map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion.label }),
                    highlightedIndex,
                    selectedItem: selectedItem2,
                  }),
                )}
              </Paper>
            ) : null}
          </div>
        )
      }}
    </Downshift>
  )
}

export default MultiAutoCompleteInput