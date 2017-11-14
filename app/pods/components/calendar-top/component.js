import Ember from 'ember';

export default Ember.Component.extend({
  days: [],
  hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
  didInsertElement() {
    if (this.get('days').length) return;

    let today = moment().date();
    //Adiciona 2 dias atras
    for (let i = 2; i > 0; i--) {
      let day = moment().date(today - i);
      this.get('days').pushObject({
        today: 0, //não, passado
        month: day.format('DD'),
        resume: day.format('ddd')
      });
    }
    //Adiciona hoje
    this.get('days').pushObject({
      today: 1, //sim
      month: today,
      resume: moment().date(today).format('ddd')
    });
    //Adiciona dois dias à frente
    for (let i = 1; i <= 4; i++) {
      let day = moment().date(today + i);
      this.get('days').pushObject({
        today: 2, //não, futuro
        month: day.format('DD'),
        resume: day.format('ddd')
      });
    }
  }
});
