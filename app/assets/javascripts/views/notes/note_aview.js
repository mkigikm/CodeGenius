CodeGenius.Views.NoteView = Backbone.View.extend({
  positionNote: function () {
    var noteEl = this.noteEl();
    noteEl && this.$el.css("top", noteEl.offsetTop - this.abovePixels());
  },

  noteEl: function () {
    var url = this.model.isNew() ? "#" : "#notes/" + this.model.id;
    return _.find(this.$placementEl.find("a"), function (a) {
      return $(a).attr("href") === url;
    });
  },

  abovePixels: function () {
    return this.$placementEl.offset().top;
  }
});
