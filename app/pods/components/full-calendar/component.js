import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  appointment: {},
  allDayObserver: Ember.observer('model.allDay', function() {
    if (this.get('model.allDay')) {
      $("#day").hide();
      $("#allDay").show();
    } else {
      $("#day").show();
      $("#allDay").hide();
    }
  }),
  didInsertElement() {
    let that = this;
    $('#calendar').fullCalendar({
      height: 700,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month agendaWeek agendaDay'
      },
      navLinks: true,
      editable: true,
      events: [],
      dayClick(date, evt, view, obj) {
        that.get('model').set('start', date.format('DD/MM/YYYY HH:mm'));
        that.get('model').set('className', 'bg-primary');

        $('#modal').modal('show');
      }
    });

    let userId = that.get('session.currentUser.uid');
    that.get('store').query('user', {
      orderBy: 'uid',
      equalTo: userId
    }).then((users) => {
      let user = users.get('firstObject');
      that.get('store').query('appointment', {
        orderBy: 'company',
        equalTo: user.get('company.id')
      }).then(data => {
        data.forEach(item => {
          let appointment = {
            id: item.get('id'),
            title: item.get('title'),
            start: item.get('start'),
            end: item.get('end'),
            className: item.get('className'),
            allDay: item.get('allDay'),
          };
          $('#calendar').fullCalendar('renderEvent', appointment);
        });
      });
    });
  },
  actions: {
    insert(model) {
      let userId = this.get('session.currentUser.uid');
      return this.get('store').query('user', {
        orderBy: 'uid',
        equalTo: userId
      }).then((users) => {
        let user = users.get('firstObject');
        let title = model.get('title') ? model.get('title') : '(Sem Título)';
        let start = new Date(moment(model.get('start'), "DD/MM/YYYY HH:mm").toDate());
        let end = new Date(moment(model.get('end'), "DD/MM/YYYY HH:mm").toDate());
        model.set('company', user.get('company'));
        model.set('title', title);
        model.set('start', start);
        model.set('end', end);

        model.save()
          .then(data => {
            let appointment = {
              id: data.get('id'),
              title: data.get('title'),
              start: start,
              end: end,
              className: data.get('className')
            };

            $('#modal').modal('hide');
            $('#calendar').fullCalendar('renderEvent', appointment);
            Ember.set(this, 'model', this.get('store').createRecord('appointment'));
          }).catch(err => {
            swal('Ops!', 'Não foi possível salvar o compromisso: ' + err, 'error');
          });
      });
    }
  }
});
