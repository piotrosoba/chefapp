export default (obj) => (
  Object.entries(obj || {})
    .map(el => (
      typeof el[1] === 'object' ?
        {
          key: el[0],
          ...el[1]
        }
        :
        {
          key: el[0],
          value: el[1]
        }
    ))
)