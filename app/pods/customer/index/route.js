import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let userId = this.get('session.currentUser.uid');
    return this.get('store').query('user', {
      orderBy: 'uid',
      equalTo: userId
    }).then((users) => {
      let user = users.get('firstObject');
      return this.get('store').query('customer', {
        orderBy: 'company',
        equalTo: user.get('company.id')
      });
    });
  },
  actions: {
    delete(model) {
      swal({
        title: "Tem Certeza?",
        text: "Se você deletar esse registro, a operação não poderá ser desfeita!",
        icon: "warning",
        buttons: {
          cancel: "Não, cancelar!",
          confirm: {
            text: "Sim, confirmar!",
            value: true,
          },
        },
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          return model.destroyRecord()
            .then(() => {
              swal('Sucesso!', 'Registro deletado com sucesso!', 'success');
            })
            .catch((err) => {
              swal('Ops!', 'Não foi possível deletar o registro: ' + err, 'error');
            });
        }
      });
    }
  }
});
