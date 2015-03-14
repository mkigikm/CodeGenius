CodeGenius.Collections.Philes = Backbone.Collection.extend({
  model: CodeGenius.Models.Phile,

  comparator: "created_at"
});
