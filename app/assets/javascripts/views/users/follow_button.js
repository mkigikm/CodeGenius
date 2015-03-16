CodeGenius.Views.FollowButton = Backbone.View.extend({
  template: JST["users/follow_button"],

  events: {
    "click button.follow-user": "followUser",
  },

  render: function () {
    this.$el.html(this.template({user: this.model}));
    return this;
  },

  followUser: function (event) {
    var url = "/api/users/" + this.model.id + "/follow",
        method = this.model.get("following") ? "DELETE" : "POST";
    event.preventDefault();

    $.ajax(url, {
      method: method,
      success: function () {
        this.model.set("following", !this.model.get("following"));
        this.render();
      }.bind(this)
    });
  },
});
