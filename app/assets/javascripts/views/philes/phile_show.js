CodeGenius.Views.PhileShow = Backbone.View.extend({
  render: function () {
    this.$el.find("a").each(function () {
      var $this = $(this),
          noteId = _.last($this.attr("href").split("/"))

      $this.attr("href", "#/notes/" + noteId);
    });
  }
});
