import DS from 'ember-data';

export default DS.Model.extend({
  company: DS.belongsTo('company'),
  uid: DS.attr('string'),
  name: DS.attr('string'),
  email: DS.attr('string'),
  photoUrl: DS.attr('string')
});
