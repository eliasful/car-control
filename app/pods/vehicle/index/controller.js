import Ember from 'ember';

export default Ember.Controller.extend({
  modelFilter: Ember.computed('model', function() {
    return this.get('model');
  }),
  pricesObserver: Ember.observer('filter.isPrices', function() {
    if (this.get('filter.isPrices'))
      $("#div-prices input").prop("disabled", false);
    else
      $("#div-prices input").prop("disabled", true);
  }),
  brandObserver: Ember.observer('filter.isBrand', function() {
    if (this.get('filter.isBrand'))
      $("#div-brand select").prop("disabled", false);
    else
      $("#div-brand select").prop("disabled", true);
  }),
  nameObserver: Ember.observer('filter.isName', function() {
    if (this.get('filter.isName'))
      $("#div-name input").prop("disabled", false);
    else
      $("#div-name input").prop("disabled", true);
  }),
  actions: {
    filter(data, model) {
      //TODO trocar filtro para radio
      let filtered = [];
      if (data.isBrand && data.brand) {
        filtered = model.filterBy('brand.id', data.brand.get('id'));
      } else if (data.isName && data.name) {
        filtered = model.filterBy('name', data.name);
        // } else if (data.isPrices) {
        // filtered = model.filterBy('property', value);
      } else {
        filtered = this.get('model');
      }

      this.set('modelFilter', filtered);
    }
  }
});
