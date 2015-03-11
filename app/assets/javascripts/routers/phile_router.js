CodeGenius.Routers.PhileRouter = Backbone.Router.extend({
  routes: {
    "": "show"
  },

  initialize: function () {
    this.findPhile();
  },

  show: function () {
    
  },

  findPhile: function () {
    var phileId = _.last(window.location.pathname.split("/"));
    this.phile = new CodeGenius.Models.Phile({id: phileId});
    this.phile.fetch();
  }
})
