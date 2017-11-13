import Ember from 'ember';

export default Ember.Controller.extend({
  modelFilter: Ember.computed('model', function() {
    return this.get('model');
  }),
  actions: {
    filter(data) {
      let filtered = this.get('model');

      if (data.brand) {
        filtered = filtered.filterBy('brand.id', data.brand.get('id'));
      }

      if (data.name) {
        filtered = filtered.filter(item => filter(item.get('name'), data.name));
      }

      if (data.priceStart > 0 && data.priceEnd > 0) {
        filtered = filtered.filter(item =>
          item.get('priceSale') >= data.priceStart &&
          item.get('priceSale') <= data.priceEnd);
      }

      if (data.color) {
        filtered = filtered.filter(item => filter(item.get('color'), data.color));
      }

      if (data.year) {
        filtered = filtered.filter(item => filter(String(item.get('year')), data.year));
      }

      if (data.model) {
        filtered = filtered.filter(item => filter(item.get('model'), data.model));
      }

      if (data.motor) {
        filtered = filtered.filter(item => filter(item.get('motor'), data.motor));
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
