import DS from 'ember-data';

export default DS.Model.extend({
  company: DS.belongsTo('company'),
  title: DS.attr('string'),
  allDay: DS.attr('boolean'),
  start: DS.attr('date'),
  hourStart: DS.attr('string'),
  end: DS.attr('date'),
  hourEnd: DS.attr('string'),
  local: DS.attr('string'),
  description: DS.attr('string'),
  className: DS.attr('string')
});
