CodeGenius.Views.PhileModal = Backbone.View.extend({
  template: JST["users/phile_modal"],

  events: {
    "click .modal-overlay": "remove",
    "click a": "remove",
    "submit .tag-form": "tag",
    "click .tag-delete": "delete"
  },

  initialize: function () {
    this.taggings = this.model.taggings();
    this.listenTo(this.taggings, "add remove", this.render);
  },

  render: function () {
    this.$el.html(this.template({phile: this.model}));
    return this;
  },

  tag: function (event) {
    var url = "/api/philes/" + this.model.id + "/tagging",
        tagName = this.$(".tag-form > input").val();
    event.preventDefault();

    $.ajax(url, {
      method: "POST",
      data: {tag_name: tagName},
      success: function (data) {
        this.taggings.add(new CodeGenius.Models.Tagging(
          {id: data.id, name: tagName}
        ))
      }.bind(this)
    });
  },

  delete: function (event) {
    var tagging;
    event.preventDefault();

    tagging = this.taggings.get($(event.currentTarget).data("tag-id"));
    tagging.destroy();
  }
});
