import Ember from 'ember';

export function toHour(params /*, hash*/ ) {
  let hour = params[0];
  return String(hour).concat(':00');
}

export default Ember.Helper.helper(toHour);
