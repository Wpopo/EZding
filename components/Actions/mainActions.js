import { createAction } from 'redux-actions';

export const mainReset = createAction('MAIN_RESET');
export const setPopcornFlag = createAction('SET_POPCORN_Flag');
export const setPopcornText = createAction('SET_POPCORN_TEXT');
export const setView = createAction('SET_VIEW');
export const setPreferentialView = createAction('SET_PREFERENTIAL_VIEW');
export const setPreferentialTicketView = createAction('SET_PREFERENTIAL_TICKET_VIEW');
export const setInitOrderInfo = createAction('SET_INIT_ORDER_INFO');
export const setMovieInfo = createAction('SET_MOVIE_INFO');
export const setErpCode = createAction('SET_ERPCODE');
