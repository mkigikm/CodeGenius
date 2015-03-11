CodeGenius.Collections.Notes = Backbone.Collection.extend({
  model: CodeGenius.Models.Note,

  comparator: "start",

  getOrAdd: function (id) {
    var note = this.get(id);

    if (!note) {
      note = new CodeGenius.Models.Note({id: id});
      this.add(note);
    }

    return note;
  }
});
