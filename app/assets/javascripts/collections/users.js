CodeGenius.Collections.Users = Backbone.Collection.extend({
  model: CodeGenius.Models.User,
  
  comparator: "name"
});
