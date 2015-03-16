CodeGenius.Views.FollowButton = Backbone.View.extend({
  template: JST["users/follow_button"],

  tagName: "button",

  className: "follow-user",

  events: {
    "click": "followUser",
  },

  render: function () {
    this.$el.html(this.template({user: this.model}));
    this.model.get("is_current_user") && this.$el.css("display", "none");
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
