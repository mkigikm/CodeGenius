CodeGenius.Models.Phile = Backbone.Model.extend({
  urlRoot: "/api/philes",

  notes: function () {
    this._notes || (this._notes = new CodeGenius.Collections.Notes());
    return this._notes;
  },

  parse: function (payload) {
    if (payload.notes) {
      payload.notes.forEach(function (note) {
        this.notes().add(new CodeGenius.Models.Note(note), {merge: true});
      }, this);

      delete payload.notes;
    }

    return payload;
  }
});
