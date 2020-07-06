import { GET_INGREDIENTS_LIST, GET_ERRORS, RESET_STORE } from '../Static/types'

const initialState = {

  ingredientsList: [],
  errors: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_LIST:
      let tempArr = action.payload
      let adjustedArr = []
      tempArr.forEach((arrayItem) => {
        arrayItem.itemsCount = 0
        arrayItem.totalItemValue = 0
        adjustedArr.push(arrayItem)
      });
      return {
        ...state,
        ingredientsList: adjustedArr,
      }

    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload
      }
    case RESET_STORE:
      return {
        ...state,
        ingredientsList: action.payload
      }

    default:
      return state;
  }
}
