(function(){

  // business logic constructor function
  var BusinessLogic = function() {

    function setCounts(photo) {
      if (photo.likeCount && photo.commentCount) {
      } else {
        if (photo.likes) { photo.likeCount = photo.likes.data.length; }
        else { photo.likeCount = 0; }

        if (photo.comments){ photo.commentCount = photo.comments.data.length; }
        else{ photo.commentCount = 0; }
      }
    }

    this.getPhotos = function() {
      console.log('Fetching your photos...');
      var bizLogic = this;
      FB.api('/me?fields=photos', function(response) {
        var photos = response.photos.data;
        for (var i = 0; i < photos.length; i++){
          setCounts(photos[i]);
        }

        bizLogic.photos = photos;
      });
    };

   this.sortPhotosByLikes = function(){
    return this.photos.sort(function(a,b){
      if (a.likeCount < b.likeCount) { return 1; }
      else { return -1; }
    });
   };

   this.sortPhotosByComments = function(){
    return this.photos.sort(function(a,b){
      if (a.commentCount < b.commentCount) { return 1; }
      else { return -1; }
    });
   };

  };

  window.bl = new BusinessLogic();

})();

$(document).foundation();
