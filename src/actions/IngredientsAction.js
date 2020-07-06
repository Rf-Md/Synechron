import axios from 'axios';

import { GET_INGREDIENTS_LIST, GET_ERRORS, RESET_STORE } from '../Static/types'


export const getIngredientsList = () => dispatch => {

  axios
    .get('./ingredients.json')
    .then(res => {
      dispatch({
        type: GET_INGREDIENTS_LIST,
        payload: res.data.ingredients
      })
    })
    .catch(err => {
      console.error('Error occured while fetching list ', err)
      dispatch({
        type: GET_ERRORS,
        payload: err
      })

    })
}

export const resetStore = () => dispatch => {
  dispatch({
    type: RESET_STORE,
    payload: {}
  })

}
