import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  model() {
    return this.get('store').createRecord('customer');
  },
  actions: {
    transition(endpoint) {
      this.transitionTo(endpoint);
    }
  }
});
