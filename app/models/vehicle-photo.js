import DS from 'ember-data';

export default DS.Model.extend({
  photoUrl: DS.attr('string'),
  name: DS.attr('string'),
  vehicle: DS.belongsTo('vehicle')
});
