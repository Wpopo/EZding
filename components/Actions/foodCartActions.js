import { createAction } from 'redux-actions';

export const foodReset = createAction('FOOD_RESET');
export const setInitFoodList = createAction('SET_INIT_FOOD_LIST');
export const addFood = createAction('ADD_FOOD');
export const reduceFood = createAction('REDUCE_FOOD');
