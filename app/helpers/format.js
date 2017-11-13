import Ember from 'ember';

export function format(params /*, hash*/ ) {
  if (params[0] && params[1]) {
    return Inputmask.format(params[0], params[1]);
  }

  return params;
}

export default Ember.Helper.helper(format);
