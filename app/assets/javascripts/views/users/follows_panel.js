CodeGenius.Views.FollowsPanel = Backbone.View.extend({
  template: JST["users/follows_panel"],

  tagName: "section",

  className: "follows-panel",

  events: {
    "click button": "followUser"
  },

  render: function () {
    var listItem;
    this.$el.html(this.template({user: this.model}));

    this.removeItems();
    this.model.follows().each(function (user) {
      listItem = new CodeGenius.Views.FollowsPanelItem({model: user});
      this.$("ul").append(listItem.render().$el);
      this._items.push(listItem);
    }.bind(this));

    this.listenForChanges();
    return this;
  },

  remove: function () {
    this.removeItems();
  },

  removeItems: function () {
    if (this._items) {
      this._items.forEach(function (item) {
        item.remove();
      });
    }

    this._items = [];
  },

  listenForChanges: function () {
    if (!this.model.get("is_current_user")) return;

    this.model.follows().each(function (user) {
      this.listenTo(user, "change", this.updateFollowList);
    }.bind(this));
    this.listenTo(this.model.follows(), "remove", this.render);
  },

  updateFollowList: function (user) {
    this.model.follows().remove(user);
  }
});
