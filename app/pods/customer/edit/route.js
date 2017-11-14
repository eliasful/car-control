import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    transition(endpoint) {
      this.transitionTo(endpoint);
    }
  }
});
