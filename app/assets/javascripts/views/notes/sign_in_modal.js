CodeGenius.Views.SignInModal = Backbone.View.extend({
  template: JST["notes/sign_in_modal"],

  events: {
    "click .modal-overlay": "remove",
    "click a": "remove"
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});
