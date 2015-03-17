CodeGenius.Views.PasswordPanel = Backbone.View.extend({
  template: JST["users/password_panel"],

  tagName: "section",

  className: "password-panel",

  events: {
    "submit .email-form": "changeEmail",
    "submit .change-password": "changePassword"
  },

  render: function () {
    console.log("rendering")
    this.$el.html(this.template({user: this.model}));
    return this;
  },

  changeEmail: function (event) {
    event.preventDefault();

    this.model.save({email: this.$(".email-form > input").val()}, {
      success: function () {
        alert("changed email");
      },

      error: function () {
        alert("fail");
      }
    });
  },

  changePassword: function (event) {
    event.preventDefault();

    this.model.save($(event.currentTarget).serializeJSON(), {
      success: function () {
        alert("saved new password");
      },

      error: function () {
        alert("fail");
      }
    });
  }
});
