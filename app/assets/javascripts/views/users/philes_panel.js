CodeGenius.Views.PhilesPanel = Backbone.View.extend({
  template: JST["users/philes_panel"],

  tagName: "section",

  className: "file-panel",

  events: {
    "click button.file-upload": "choosePhile",
    "change input.file-upload-selector": "uploadPhile",
    "click button.phile-delete": "deletePhile"
  },

  initialize: function () {
    this.listenTo(this.model.philes(), "add", this.render);
    this.listenTo(this.model.philes(), "remove", this.render);
  },

  render: function () {
    this.$el.html(this.template({user: this.model}));

    return this;
  },

  choosePhile: function (event) {
    event.preventDefault();
    this.$(".file-upload-selector").trigger("click");
  },

  uploadPhile: function (event) {
    var file, reader, phile, philes = this.model.philes();
    event.preventDefault();

    file = this.$(".file-upload-selector")[0].files[0];
    phile = new CodeGenius.Models.Phile({name: file.name});

    reader = new FileReader();
    reader.onloadend = function () {
      phile.save({"body": reader.result}, {
        success: function (data) {
          philes.add(phile);
        }
      });
    }
    reader.readAsText(file);
  },

  deletePhile: function (event) {
    var phile;
    event.preventDefault();

    phile = this.model.philes().get($(event.currentTarget).data("phile-id"));
    phile.destroy({
      success: function () {
        debugger
        this.model.philes().remove(phile);
      }.bind(this)
    });
  }
});
