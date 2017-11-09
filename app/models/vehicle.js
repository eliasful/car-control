import DS from 'ember-data';

export default DS.Model.extend({
  company: DS.belongsTo('company'),
  year: DS.attr('number'),
  model: DS.attr('string'),
  brand: DS.belongsTo('brand'),
  name: DS.attr('string'),
  price: DS.attr('number'),
  fuel: DS.attr('string'),
  description: DS.attr('string'),
  color: DS.attr('string'),
  vehiclePhotos: DS.hasMany('vehicle-photo')
});
