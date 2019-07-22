import {R} from '@libs/ramda';

const selectReqBody = R.prop('body');
const selectParam = R.prop('params');
const selectQuery = R.prop('query');

export {
    selectReqBody,
    selectQuery,
    selectParam,
};