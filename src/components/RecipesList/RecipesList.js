import React from 'react'

import RecipesListItem from './RecipesListItem'

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 800,
    margin: 'auto'
  },
}

const RecipesList = props => {
  return (
    <div style={styles.container}>
      {props.data.map(recipe => (
        <RecipesListItem
          key={recipe.key}
          data={recipe}
          route={props.route}
          changeRoute={props.changeRoute}
        />
      ))}
    </div>
  )
}

export default RecipesList