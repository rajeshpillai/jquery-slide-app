// Now lets build the library
// NOTE: We are not creating any namespace now.


(function (window, $) {
  
  var mySlideShow = {
    $element: null,
    counter: 0,   // tracks which slide is currently selected
    slides: [],   // holds all slide object
    
    // The text to show in the title and the options object which contain
    // the elementID and the timer value.
    title: function (text, options){
      var elementId = options.elementId;
      this.timer = options.timer;
      
      this.$element = $("#" + elementId);
      
      // This will be displayed in the jquery UI dialog
      this.$element.attr("title", text);  
      
      // Create the container and the footer divs
      this.$element.append("<div class='container'></div>");
      this.$element.append("<div class='footer'></div>");
      
      var $footer = $(".footer", this.$element);
      
      
      // Add the next and prev button to the footer div
      $footer.append("<input type='button' class='prev' value='prev'>");
      $footer.append("<input type='button' class='next' value='next'>");
      
      
      // Create the div for holding the slides
      $(".container").append("<div class='slides'></div>");
      
      // Call the initialize method
      this.onInit();
      
      // Setup the event handler. NOTE:  The repetation in the handlers can be
      // refactored later.
      this._next();   // setup next button click
      this._prev();
      
      return this;  // for method chaining
    },
 
    /*
      In the initialize method setup the timer and handle the windows resize 
      event, so that as the window is resized the slides takes up the full screen.
    */
    onInit: function () {
      // Store a reference to the original object as otherwise in in time calls like
      // setInterval the context will change and "this" will point to global object.
      var that = this;  
      
       if (that.timer) {
        setInterval(function(){
          that.next();  
        },that.timer);
      }
      
      $(window).resize(function () {
         $(that.$element).css({
              'width': $(window).width(),
              'height': $(window).height(),
              'left': '0px',
              'top':'0px'
         });
      }).resize(); //<---- resizes on page ready  
    },
    
    /*
      Given the index of the slide, show the slide.
    */
    load: function (index) {  //loads the slide based on index
      var that = this;
      var current = that.slides[index];
      var $slides = $("div.slides");
      
      $slides.html("");  // clear
      $slides.append("<h2>" + current.title + "</h2>");
      
      
      if (current.image_url){
        $slides.append("<img src='" + current.image_url + "' </img>");
      }
      
      for(var i = 0; i < current.points.length; i++) {
        $slides.hide().append("<li>" + current.points[i] + "</li>").slideDown();  // lets animate
      }
      
    },
    
    /*
      Move to next slide.
    */
    next: function () {
      var that = this;
      that.counter ++;
      if (that.counter >= that.slides.length) {
        that.counter = 0;  // reset the counter if on last slide.
      }
      that.load(that.counter);  // load the slide
    },
    
    /*
      Move to prev slide.
    */
    prev: function () {
      var that = this;
      that.counter --;
        if (that.counter < 0) {
          that.counter = 0;  // reset the counter, if first slide reached.
        }
        that.load(that.counter);  // load the slide
    },
    
    // Event handler to track the click of next button
    _next: function () {
      var that = this;
      $(".next").on("click", function (e) {
        that.next();
      })
    },
    // Event handler to track the click of prev button
    _prev: function () {
       var that = this;
      $(".prev").on("click", function (e) {
        that.prev();
      })
    },
    
    /*
      Create the array for storing slide objects
    */
    slide: function (options) {
      this.slides.push(options);
      return this;  // for method chaining
    },
    
    /*
      Show the lide first time, by invoking the jQuery UI
      modal dialog.
    */
    show: function () {
      this.load(0);  // load the first slide
      
      this.$element.dialog({
        height: $(window).height()-10,
        width: $(window).width()-10,
        modal: true
      });
    }
  };
  
  window.mySlideShow = mySlideShow;
})(window, jQuery);

