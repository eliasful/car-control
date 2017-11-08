import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  list: Ember.A(),
  didInsertElement() {
    let endpoint = this.get('endpoint');

    this.set('list', this.get('store').findAll(endpoint));

    this.$('select').on('change', (evt) => {
      let found = this.get('list').findBy('id', this.$(evt.currentTarget).val());
      this.set('selected', found);
    });
  }
});
