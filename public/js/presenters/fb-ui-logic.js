(function() {

  var UI = function() {

    function handlePhotos(photos,type) {
      $('#photo-grid').empty();
      for(var i = 0; i < photos.length; i++) {
        eval('displayPhoto_' + type)(photos[i]);
      }

      $(".imgLiquidFill").imgLiquid({
          fill: true,
          horizontalAlign: "center",
          verticalAlign: "top"
      });
    }

    function displayPhoto_likes(photo) {
      var rendered = this.renderTemplate('.tmp-photo-like', photo);
      $('#photo-grid').append(rendered);
    }

    function displayPhoto_comments(photo) {
      var rendered = this.renderTemplate('.tmp-photo-comment', photo);
      $('#photo-grid').append(rendered);
    }

    function renderPhotosByLikes() {
      handlePhotos( bl.sortPhotosByLikes(),'likes' );
    }

    function renderPhotosByComments() {
      handlePhotos( bl.sortPhotosByComments(),'comments' );
    }

    this.renderTemplate = function(klass, data) {
      var template = $('#templates ' + klass).html();
      Mustache.parse(template);
      var rendered = Mustache.render(template, data);
      return rendered;
    };

    $(document).on('click', '#likes', function(e) {
      e.preventDefault();

      renderPhotosByLikes();
    });

    $(document).on('click', '#comments', function(e) {
      e.preventDefault();

      renderPhotosByComments();
    });

  };

  // this runs it
  window.viewUI = new UI();

})();
