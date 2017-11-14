import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    save(model) {
      let userId = this.get('session.currentUser.uid');
      this.get('store').query('user', {
        orderBy: 'uid',
        equalTo: userId
      }).then((users) => {
        let user = users.get('firstObject');
        model.set('company', user.get('company'));

        model.save().then(() => {
          swal('Sucesso', 'Registro salvo com sucesso!', 'success');
          this.sendAction('transition', 'customer.index');
        }).catch(err => {
          swal('Ops!', 'Não foi possível salvar o registro: ' + err, 'error');
        });
      });
    }
  }
});
