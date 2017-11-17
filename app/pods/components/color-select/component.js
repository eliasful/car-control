import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    select(color) {
      this.get('model').set(this.get('item'), color);
    }
  }
});
