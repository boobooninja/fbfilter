(function(){

  // business logic constructor function
  var BusinessLogic = function() {

    this.setCounts = function(photo) {
      if (photo.likeCount && photo.commentCount) {
      } else {
        if (photo.likes) { photo.likeCount = photo.likes.data.length; }
        else { photo.likeCount = 0; }

        if (photo.comments){ photo.commentCount = photo.comments.data.length; }
        else{ photo.commentCount = 0; }
      }
    }

    this.getPhotos = function(func) {
      console.log("getPhotos");
      var bizLogic = this;
      if (!bizLogic.photos) { bizLogic.photos = []; }

      if (bizLogic.next) {
        console.log("Next...");
        console.log(bizLogic.next);
        $.getJSON( bizLogic.next, function(response){
          if(!response) {return;}
console.log('get more pics', response);
          var photos = response.data;
          for (var i = 0; i < photos.length; i++){
            bizLogic.setCounts(photos[i]);
          }
          console.log('bizLogic', bizLogic);
          bizLogic.prev = response.paging.previous;
          bizLogic.next = response.paging.next;

          bizLogic.photos = bizLogic.photos.concat(photos);
          bizLogic.sortFunc();
          console.log('Photos loaded!');
          func();
        });
      } else {
        console.log('Fetching your photos...');
        FB.api('/me?fields=photos', function(response) {
          var photos = response.photos.data;
          for (var i = 0; i < photos.length; i++){
            bizLogic.setCounts(photos[i]);
          }
          console.log('bizLogic', bizLogic);
          bizLogic.prev = response.photos.paging.previous;
          bizLogic.next = response.photos.paging.next;

          bizLogic.photos = bizLogic.photos.concat(photos);
          console.log('Photos loaded!');
          func();
        });
      }
    };

    this.getNextPhotos = function(func) {
      console.log("getNextPhotos");
      this.getPhotos(func);
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
