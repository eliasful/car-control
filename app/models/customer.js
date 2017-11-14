import DS from 'ember-data';

export default DS.Model.extend({
  company: DS.belongsTo('company'),
  name: DS.attr('string'),
  phone: DS.attr('string'),
  cellPhone: DS.attr('string'),
  address: DS.attr('string'),
  city: DS.attr('string'),
  email: DS.attr('string')
});
