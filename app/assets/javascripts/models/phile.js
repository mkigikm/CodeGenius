CodeGenius.Models.Phile = Backbone.Model.extend({
  urlRoot: "/api/philes",

  notes: function () {
    this._notes || (this._notes = new CodeGenius.Collections.Notes());
    return this._notes;
  },

  taggings: function () {
    this._taggings || (this._taggings = new CodeGenius.Collections.Taggings());
    return this._taggings;
  },

  parse: function (payload) {
    if (payload.notes) {
      this.notes().add(payload.notes.map(function (note) {
        return new CodeGenius.Models.Note(note)
      }), {merge: true});

      delete payload.notes;
    }

    if (payload.taggings) {
      this.taggings().add(payload.taggings.map(function (tagging) {
        return new CodeGenius.Models.Tagging(tagging)
      }), {merge: true});

      delete payload.taggings;
    }

    return payload;
  }
});
