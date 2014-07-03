(function() {

  var UI = function() {

    self = this;

    this.renderTemplate = function(klass, data) {
      var template = $('#templates ' + klass).html();
      Mustache.parse(template);
      var rendered = Mustache.render(template, data);
      return rendered;
    };



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
      var rendered = self.renderTemplate('.tmp-photo-like', photo);
      $('#photo-grid').append(rendered);
    }

    function displayPhoto_comments(photo) {
      var rendered = self.renderTemplate('.tmp-photo-comment', photo);
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

    $(window).scroll(function(e) {
      e.preventDefault();
      var scrolled = $(window).scrollTop() + $(window).height()
      var docHeight =  $(document).height()
      console.log('scrolled: ',scrolled, ' doc height: ',docHeight );

      if(scrolled >= docHeight) {
        console.log('lounch event append next page');
        $.getJSON( bl.fbPhotos.photos.paging.next, function(data){
          if(!data) {return;}
          console.log(data);
          bl.fbPhotos.photos.paging = data.paging;
          handlePhotos(data.data,'likes');
          console.log('added');
        });

        }
      });

  };

  // this runs it
  window.viewUI = new UI();

  $(document).on('click', '#logout-link', function(e) {
    e.preventDefault();

    // $(document).trigger('click', '.fb-login-button', function(){
    //   $('#photo-grid').hide();

    //   // start with menu hidden
    //   $('.top-bar-section').hide();

    //   // show the login
    //   $('#login').show();
    // });

    FB.logout(function(){
      $('#photo-grid').hide();

      // start with menu hidden
      $('.top-bar-section').hide();

      // show the login
      $('#login').show();
    });
  });

  // start with menu hidden
  $('.top-bar-section').hide();

  // start with login template
  $('#main').append( viewUI.renderTemplate('.tmp-login', {}) );

})();
















