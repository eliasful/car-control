import Ember from 'ember';

export function isToday(params /*, hash*/ ) {
  if (params[1] === 1) return params[0].concat(' calendar-today')
  else if (params[1] === 0) return params[0].concat(' calendar-past')

  return params[0];
}

export default Ember.Helper.helper(isToday);
