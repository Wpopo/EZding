import { createAction } from 'redux-actions';

export const productReset = createAction('PRODUCT_RESET');
export const setProductPopcornFlag = createAction('SET_PRODUCT_POPCORN_Flag');
export const setProductPopcornText = createAction('SET_PRODUCT_POPCORN_TEXT');
export const setInitTicketList = createAction('SET_INIT_TICKET_LIST');
export const addTicket = createAction('ADD_TICKET');
export const reduceTicket = createAction('REDUCE_TICKET');
export const setInitUseFare = createAction('SET_INIT_USE_FARE');
export const addFareProduct = createAction('ADD_FARE_PRODUCT');
export const reduceFareProduct = createAction('REDUCE_FARE_PRODUCT');
export const setBookingTicket = createAction('SET_BOOKING_TICKET');
