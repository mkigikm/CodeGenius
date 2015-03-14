CodeGenius.Views.FollowsPanel = Backbone.View.extend({
  template: JST["users/follows_panel"],

  tagName: "section",

  className: "follows-panel",

  events: {
    "click button": "followUser"
  },

  render: function () {
    this.$el.html(this.template({user: this.model}));
    return this;
  },

  followUser: function (event) {
    var userId = $(event.currentTarget).data("user-id"),
        url = "/api/users/" + userId + "/follow",
        model = this.model.follows().get(userId),
        method = model.get("following") ? "DELETE" : "POST";
    event.preventDefault();

    $.ajax(url, {
      method: method,
      success: function () {
        model.set("following", !model.get("following"));
        this.model.get("is_current_user") && this.model.follows().remove(model);
        this.render();
      }.bind(this)
    });
  }
});
