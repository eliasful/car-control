import Ember from 'ember';

export default Ember.Component.extend({
  firebaseApp: Ember.inject.service(),
  actions: {
    save(model) {
      model.company.save().then((company) => {
        Ember.set(model, 'company', company);

        swal('Sucesso', 'Empresa salva com sucesso', 'success');
        $("#company").modal('hide');

        //TODO talvez fazer um sendaction pro login, passando o google de padrao, 
        this.get('firebaseApp').auth()
          .createUserWithEmailAndPassword(model.user.get('email'), model.user.get('password'))
          .then((data) => {
            data.updateProfile({
              displayName: model.user.get('name'),
              // photoURL: "https://example.com/jane-q-user/profile.jpg" //todo
            });
          });

      }).catch(() => {
        swal('Ops!', 'Não foi possível salvar a empresa', 'error');
      });
    }
  }
});
