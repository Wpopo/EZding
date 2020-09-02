import Immutable from 'immutable';
import { foodReset, setInitFoodList, addFood, reduceFood } from 'Actions/foodCartActions';
import { handleActions } from 'redux-actions';

// 預設食物初始狀態
const initState = Immutable.fromJS({
  money: 0,
  foodList: [],
});
const FoodCartReducer = handleActions(
  {
    // Reset
    [foodReset]: () => initState,

    // 設定初始食物商品清單
    [setInitFoodList]: (state, { payload }) => state.set('foodList', payload),

    // 食物商品數量 +1
    [addFood]: (state, { payload }) =>
      state.setIn(
        ['foodList', payload.foodIdx, 'quantity'],
        state.getIn(['foodList', payload.foodIdx, 'quantity']) + 1,
      ),
    // 食物商品數量 -1
    [reduceFood]: (state, { payload }) =>
      state.setIn(
        ['foodList', payload.foodIdx, 'quantity'],
        state.getIn(['foodList', payload.foodIdx, 'quantity']) - 1,
      ),
  },
  initState,
);

export default FoodCartReducer;
