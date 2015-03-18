CodeGenius.Collections.Notes = Backbone.Collection.extend({
  model: CodeGenius.Models.Note,

  comparator: "start",

  getOrFetch: function (id, options) {
    var note = this.get(id);

    if (!note) {
      note = new CodeGenius.Models.Note({id: id});
      note.fetch({
        success: function () {
          this.add(note);
        }.bind(this),

        error: function () {
          options.error();
        }
      });
    }

    return note;
  },

  overlaps: function (newNote) {
    return this.any(newNote.overlaps.bind(newNote));
  }
});
