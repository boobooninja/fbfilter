(function() {

  var UI = function() {

    function handlePhotos(photos,type) {
      $('#photo-grid').empty();
      for(var i = 0; i < photos.length; i++) {
        eval('displayPhoto_' + type)(photos[i]);
        // displayPhoto_likes(photos[i]);
      }
    }

    function displayPhoto_likes(photo) {
      var template = $('#templates .tmp-photo-like').html();
      Mustache.parse(template);
      var rendered = Mustache.render(template, photo);
      $('#photo-grid').append(rendered);
    }

    function displayPhoto_comments(photo) {
      var template = $('#templates .tmp-photo-comment').html();
      Mustache.parse(template);
      var rendered = Mustache.render(template, photo);
      $('#photo-grid').append(rendered);
    }

    function renderPhotosByLikes() {
      handlePhotos( bl.sortPhotosByLikes(),'likes' );
    }

    function renderPhotosByComments() {
      handlePhotos( bl.sortPhotosByComments(),'comments' );
    }

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
  window.UI = new UI();

})();
