CodeGenius.Views.Sidebar = Backbone.View.extend({
  template: JST["users/sidebar"],

  tagName: "section",

  className: "sidebar",

  events: {
    "click .sidebar > button.follow-user": "followUser",
    "click .avatar-tooltip": "changeAvatar",
    "click .avatar-blur": "changeAvatar",
    "change input.avatar-file-selector": "uploadAvatar"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({user: this.model}));
    this.followButton = new CodeGenius.Views.FollowButton({model: this.model});
    this.$el.append(this.followButton.render().$el);
    return this;
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
  },

  remove: function () {
    this.followButton.remove();
  }
});
