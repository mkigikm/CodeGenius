CodeGenius.Views.PhilesPanel = Backbone.View.extend({
  template: JST["users/philes_panel"],

  tagName: "section",

  className: "file-panel",

  events: {
    "click button.file-upload": "choosePhile",
    "change input.file-upload-selector": "uploadPhile",
    "click button.phile-delete": "deletePhile",
    "click button.phile-tag": "tagPhile",
    "submit .file-search": "search",
    "click .tag-search": "tagSearch"
  },

  initialize: function () {
    this.philes = this.model.philes();
    this.listenTo(this.philes, "sync", this.render);
    this.listenTo(this.philes, "change", this.render);
    this.philes.fetch();
  },

  render: function () {
    var itemView;
    this.removeItemViews();
    this.$el.html(this.template({user: this.model}));

    this.philes.each(function (phile) {
      itemView = new CodeGenius.Views.PhilesPanelItem({
        model: phile,
        displayControls: this.model.get("is_current_user")
      });
      this.$(".file-list").append(itemView.render().$el);
      this._itemViews.push(itemView);
    }.bind(this));

    return this;
  },

  removeItemViews: function () {
    if (this._itemViews) {
      this._itemViews.forEach(function (itemView) {
        itemView.remove();
      });
    }

    this._itemViews = [];
  },

  remove: function () {
    this.removeItemViews();
  },

  search: function (event) {
    event.preventDefault();
    this.philes.search(this.$(".file-search > input").val());
    this.philes.fetch();
  },

  tagSearch: function (event) {
    event.preventDefault();
    this.philes.search("tag:" + $(event.currentTarget).data("tag"));
    this.philes.fetch();
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
        success: function () {
          this.philes.search("");
          this.philes.fetch();
        }.bind(this)
      });
    }.bind(this)
    reader.readAsText(file);
  },

  deletePhile: function (event) {
    var phile;
    event.preventDefault();

    phile = this.philes.get($(event.currentTarget).data("phile-id"));
    phile.destroy({
      success: this.philes.fetch.bind(this.philes)
    });
  },

  tagPhile: function (event) {
    var phileModal;
    event.preventDefault();

    phileModal = new CodeGenius.Views.PhileModal({
      model: this.philes.get($(event.currentTarget).data("phile-id"))
    });
    $("body").append(phileModal.render().$el);
  }
});
