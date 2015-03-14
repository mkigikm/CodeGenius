window.CodeGenius = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initializePhile: function() {
    CodeGenius.router = new CodeGenius.Routers.PhileRouter();
  },

  userProfile: function (id) {
    CodeGenius.user = new CodeGenius.Models.User({id: id});
    CodeGenius.user.fetch();
    
    CodeGenius.userProfile = new CodeGenius.Views.UserShow({
      model: CodeGenius.user,
      el: $(".content")
    });
  }
};
