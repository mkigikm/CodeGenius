CodeGenius.Collections.Philes = Backbone.Collection.extend({
  model: CodeGenius.Models.Phile,

  comparator: function (phile0, phile1) {
    return phile0.get("created_at") > phile1.get("created_at") ?
      -1 : 1;
  }
});
