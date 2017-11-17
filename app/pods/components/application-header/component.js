import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {

  },
  actions: {
    signOut() {
      this.get('session').close();
    }
  }
});
