import Ember from 'ember';

export default Ember.Component.extend({
  firebaseApp: Ember.inject.service(),
  actions: {
    save(model) {
      model.company.save().then((company) => {
        Ember.set(model, 'company', company);

        $("#company").modal('hide');
        swal('Sucesso', "Criar seu usuário a partir do:", 'success', {
          allowOutsideClick: false,
          buttons: {
            google: {
              text: "Google",
              value: "google",
              className: "btn-danger"
            },
            facebook: {
              text: "Facebook",
              value: "facebook",
              className: "btn-primary"
            }
          },
        }).then((value) => {
          this.sendAction('signIn', value, model);
        });

      }).catch(() => {
        swal('Ops!', 'Não foi possível salvar a empresa', 'error');
      });
    }
  }
});
