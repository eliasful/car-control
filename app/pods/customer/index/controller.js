import Ember from 'ember';

export default Ember.Controller.extend({
  filter: {
    name: null,
    city: null
  },
  modelFilter: Ember.computed('model', function() {
    return this.get('model');
  }),
  actions: {
    filter(data) {
      let filtered = this.get('model');

      if (data.name) {
        filtered = filtered.filter(item => filter(item.get('name'), data.name));
      }

      if (data.city) {
        filtered = filtered.filter(item => filter(item.get('city'), data.city));
      }

      this.set('modelFilter', filtered);
    }
  }
});

function filter(item, attr) {
  if (item)
    return item.toUpperCase().includes(attr.toUpperCase());

  return false;
}
