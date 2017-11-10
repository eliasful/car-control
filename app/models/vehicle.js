import DS from 'ember-data';

export default DS.Model.extend({
  company: DS.belongsTo('company'),
  year: DS.attr('number'),
  model: DS.attr('string'),
  brand: DS.belongsTo('brand'),
  name: DS.attr('string'),
  pricePurchase: DS.attr('number'),
  priceSale: DS.attr('number'),
  fuel: DS.attr('string'),
  description: DS.attr('string'),
  color: DS.attr('string'),
  motor: DS.attr('string'),
  plate: DS.attr('string'),
  datePurchase: DS.attr('date'),
  dateSale: DS.attr('date'),
  vehiclePhotos: DS.hasMany('vehicle-photo')
});
