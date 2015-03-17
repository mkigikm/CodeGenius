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
    this.listenTo(this.model, "sync", this.render);

    this.followButton = new CodeGenius.Views.FollowButton({model: this.model});
    this.philesView = new CodeGenius.Views.PhilesPanel({model: this.model});
    this.followsView = new CodeGenius.Views.FollowsPanel({model: this.model});
    this.activePanel = ".file-panel";
  },

  render: function () {
    this.$el.html(this.template({user: this.model}));

    this.$(".sidebar").append(this.followButton.render().$el);

    this.$tabs = this.$(".main-panel");
    this.$tabs.append(this.philesView.render().$el);
    this.$tabs.append(this.followsView.render().$el);
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
  },

  changeAvatar: function (event) {
    event.preventDefault();
    this.$(".avatar-file-selector").trigger("click");
  },

  uploadAvatar: function (event) {
    var file, reader;
    event.preventDefault();

    file = this.$(".avatar-file-selector")[0].files[0];

    reader = new FileReader();
		reader.onloadend = function () {
      this.model.save({"avatar": reader.result});
		}.bind(this);

		reader.readAsDataURL(file);
  }
});
