CodeGenius.Views.PasswordPanel = Backbone.View.extend({
  template: JST["users/password_panel"],

  tagName: "section",

  className: "password-panel",

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});
