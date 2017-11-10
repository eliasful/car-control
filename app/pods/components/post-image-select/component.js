import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
  },

  renderPreview(element) {
    var file = element[0].files[0];
    if (!file) {
      return false;
    }
    var oFReader = new FileReader();
    oFReader.readAsDataURL(file);
    oFReader.onload = (oFREvent) => {
      var img = new Image();
      img.src = oFREvent.target.result;
      img.onload = () => {
        if (file.type.includes('image')) {
          this.get('postImages').pushObject({
            preview: oFREvent.target.result,
            form: file
          });
        } else {
          swal("Oops...", "Apenas imagens podem ser salvas", "error");
        }
      };
    };
  },
  actions: {
    click(item) {
      $('#' + item).click();
    },
    selectImage() {
      var element = '#' + this.get('elementId') + ' > input';
      this.renderPreview(Ember.$(element));
    },
    deleteImage(index) {
      var postImages = this.get('postImages');
      postImages.removeAt(index);
    },
    openImage(index) {
      $("#image").modal('show');
    },
    chooseImage() {
      if (this.get('urlPreview')) {
        this.set('urlPreview', null);
        this.set('promiseUpload', null);
      } else {
        this.$('.upload-image').click();
      }
    }
  }
});
