import Ember from 'ember';

export function format(params /*, hash*/ ) {
  return Inputmask.format(params[0], params[1]);
}

export default Ember.Helper.helper(format);
