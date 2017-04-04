// Let's build a little jQuery PPT like app

// First lets build the API

$(function () {
  mySlideShow.title("Build your own slide object V0.1",{elementId: "board", timer: 0})
    .slide({
      title: "Slide 1",
      image_url: "http://loremflickr.com/320/240/dog",
      points: ["Point 1","Point 2" ]
    })
    .slide({
      title: "Slide 2",
      image_url: "http://loremflickr.com/320/240/dog",
      points: ["Point 3","Point 2"]
    })
    .slide({
      title: "Slide 3",
      image_url: "http://loremflickr.com/320/240/cat",
      points: ["Point 3","Point 3"]
    })
    .slide({
      title: "Slide 4",
      image_url: "https://placekitten.com/g/200/300",
      points: ["Point 4","Point 4"]
    })
    .show();
});



