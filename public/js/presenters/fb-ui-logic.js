(function() {

  var UI = function() {

    function handlePhotos(photos) {
      $('#photo-grid').empty();
      for(var i = 0; i < photos.length; i++) {
        displayPhoto(photos[i]);
      }
    }

    function displayPhoto(photo) {
      var template = $('#templates .tmp-photo').html();
      Mustache.parse(template);
      var rendered = Mustache.render(template, photo);
      $('#photo-grid').append(rendered);
    }

    function renderPhotosByLikes() {
      handlePhotos( bl.sortPhotosByLikes() );
    }

    function renderPhotosByComments() {
      handlePhotos( bl.sortPhotosByComments() );
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
