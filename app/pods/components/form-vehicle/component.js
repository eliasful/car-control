import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  firebaseApp: Ember.inject.service(),
  postImages: Ember.A([]),
  actions: {
    save(model) {
      let userId = this.get('session.currentUser.uid');
      this.get('store').query('user', {
        orderBy: 'uid',
        equalsTo: userId
      }).then((users) => {
        let user = users.get('firstObject');
        model.set('company', user.get('company'));

        //TODO INSERIR O NOME DO CARRO
        const storage = this.get('firebaseApp').storage().ref().child('mountains.jpg');;
        this.get('postImages').forEach((image) => {
          storage.put(image.form).then(function(snapshot) {
            console.log('Uploaded a blob or file!');
          });
        });

        model.save().then(() => {
          swal('Sucesso', 'Registro salvo com sucesso!', 'success');
          this.transitionTo('vehicle.index');
        });
      });
    }
  }
});
