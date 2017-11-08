import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  list: Ember.A(),
  didInsertElement() {
    this.$('select').on('change', (evt) => {
      this.set('selected', evt.currentTarget.value);
    });
  }
});
