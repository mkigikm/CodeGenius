CodeGenius.Models.Phile = Backbone.Model.extend({
  urlRoot: "/api/philes",

  notes: function () {
    this._notes || (this._notes = new CodeGenius.Collections.Notes());
    return this._notes;
  },

  parse: function (payload) {
    if (payload.notes) {
      this.notes().add(payload.notes.map(function (note) {
        return new CodeGenius.Models.Note(note)
      }), {merge: true});

      delete payload.notes;
    }

    return payload;
  }
});
