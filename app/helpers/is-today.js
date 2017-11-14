import Ember from 'ember';

export function isToday(params /*, hash*/ ) {
  if (params[1]) return params[0].concat(' calendar-today')

  return params[0];
}

export default Ember.Helper.helper(isToday);
