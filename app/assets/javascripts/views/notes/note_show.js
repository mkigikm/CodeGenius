CodeGenius.Views.NoteShow = Backbone.View.extend({
  render: function () {
    this.$el.html(this.model.escape("body"));
    return this;
  }
});
