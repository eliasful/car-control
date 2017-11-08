import Ember from 'ember';

export default Ember.Route.extend({
  firebaseApp: Ember.inject.service(),
  session: Ember.inject.service(),
  store: Ember.inject.service(),
  model() {
    return Ember.RSVP.hash({
      company: this.get('store').createRecord('company'),
      user: null
    });
  },
  beforeModel() {
    return this.get('session').fetch().catch(function() {});
  },
  actions: {
    signIn(provider, model) {
      this.get('session').open('firebase', {
        provider: provider
      }).then((data) => {
        this.get('store').query('user', {
          orderBy: 'uid',
          equalTo: data.uid
        }).then((users) => {
          //Verifica se não existir nenhum usuário com esse id
          if (!users.get('length')) {
            //Verifica se a company que está no model, realmente está salva
            if (model.company.get('name')) {
              //Se sim, cria um novo usuário, com as informações necessárias
              //e vinculando a company em questão.
              let user = this.get('store').createRecord('user');
              user.set('uid', data.uid);
              user.set('name', data.currentUser.displayName);
              user.set('email', data.currentUser.email);
              user.set('photoUrl', data.currentUser.photoURL);
              user.set('company', model.company);
              user.save().then((userSaved) => {
                //Após salvar o usuário, limpa o company
                Ember.set(model, 'company', this.get('store').createRecord('company'));
                Ember.set(model, 'user', userSaved);
              });
            } else {
              //Se não, fecha a sessão e excluir o user Authenticated
              //Que é criado automaticamente ao clicar no login
              this.get('session').close();
              this.get('firebaseApp').auth().currentUser
                .delete()
                .then(() => {
                  swal('Ops!', 'Esse usuário não possui vinculo com nenhuma empresa', 'error');
                })
                .catch((error) => {
                  swal(error.message);
                });
            }
          } else {
            //Se existir usuário com esse uid, pega o primeiro e verifica se ele tem company
            //Se não tiver, fecha a sessao e exclui o usuário
            let user = users.get('firstObject');
            if (!user.get('company')) {
              this.get('session').close();
              user.destroyRecord();
            } else {
              Ember.set(model, 'user', user);
            }
          }
        });
      });
    }
  }
});
