CodeGenius.Views.PhilesPanel = Backbone.View.extend({
  template: JST["users/philes_panel"],

  tagName: "section",

  className: "file-panel",

  events: {
    "click button.file-upload": "createPhile",
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

  createPhile: function (event) {
    var file, reader, phile, philes = this.model.philes();
    event.preventDefault();

    file = this.$("#phile-input")[0].files[0];
    if (!file) return;

    phile = new CodeGenius.Models.Phile({name: file.name});

    reader = new FileReader();
    reader.onload = function (event) {
      phile.set("body", event.target.result);

      phile.save({}, {
        success: function (data) {
          debugger
          philes.add(phile);
        }
      })
    }
    reader.readAsText(file);
  },

  deletePhile: function (event) {
    var phile;
    event.preventDefault();

    phile = this.model.philes().get($(event.currentTarget).data("phile-id"));
    phile.destroy({
      success: function () {
        this.model.philes().remove(phile);
      }.bind(this)
    });
  }
});
