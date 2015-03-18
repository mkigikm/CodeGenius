CodeGenius.Views.UserShow = Backbone.View.extend({
  template: JST["users/user_show"],

  events: {
    "click .sidebar > button.follow-user": "followUser",
    "click .main-panel-tabs a": "changePanel",
    "click .avatar-tooltip": "changeAvatar",
    "click .avatar-blur": "changeAvatar",
    "change input.avatar-file-selector": "uploadAvatar"
  },

  initialize: function () {
    this.listenToOnce(this.model, "sync", this.render);
    this.sidebar = new CodeGenius.Views.Sidebar({model: this.model});

    this.activePanel  = ".file-panel";
    this.philePanel   = new CodeGenius.Views.PhilesPanel({model: this.model});
    this.followsPanel = new CodeGenius.Views.FollowsPanel({model: this.model});
    this.feedPanel    = new CodeGenius.Views.FeedPanel({
      collection: this.model.feed()
    });
    this.passwordPanel = new CodeGenius.Views.PasswordPanel({
      model: this.model
    });
  },

  render: function () {
    this.$el.html(this.template({user: this.model}));

    this.$el.prepend(this.sidebar.render().$el);

    this.$tabs = this.$(".main-panel");
    this.$tabs.append(this.philePanel.render().$el);
    this.$tabs.append(this.followsPanel.render().$el);
    this.$tabs.append(this.feedPanel.render().$el);
    this.$tabs.append(this.passwordPanel.render().$el);
    this.makeActive(this.activePanel);

    return this;
  },

  changePanel: function (event) {
    event.preventDefault();
    this.makeActive($(event.currentTarget).data("tab"));
  },

  makeActive: function (panel) {
    this.activePanel = panel;
    this.$(".main-panel > section").addClass("hidden");
    this.$(panel).removeClass("hidden");
    this.$(".main-panel-tabs > li").removeClass("activated");
    this.$(panel + "-tab").addClass("activated");
  }
});
