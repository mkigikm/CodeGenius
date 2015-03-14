CodeGenius.Views.UserShow = Backbone.View.extend({
  template: JST["users/user_show"],

  events: {
    "click button.follow-user": "followUser",
    "click .main-panel-tabs a": "changePanel"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);

    this.philesView = new CodeGenius.Views.PhilesPanel({model: this.model});
    this.followsView = new CodeGenius.Views.FollowsPanel({model: this.model});
  },

  render: function () {
    this.$el.html(this.template({user: this.model}));

    this.$tabs = this.$(".main-panel");
    this.$tabs.append(this.philesView.render().$el);
    this.$tabs.append(this.followsView.render().$el);

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

  changePanel: function (event) {
    event.preventDefault();
    this.makeActive($(event.currentTarget).data("tab"));
  },

  makeActive: function (panel) {
    this.$(".main-panel > section").addClass("hidden");
    this.$(panel).removeClass("hidden");
  }
});
