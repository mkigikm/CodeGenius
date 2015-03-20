CodeGenius.Models.Note = Backbone.Model.extend({
  urlRoot: "/api/notes",

  overlaps: function (note) {
    return !(note.get("start") > this.get("finish") ||
        this.get("start") > note.get("finish"));
  },

  revisions: function () {
    return [];
  }
});
