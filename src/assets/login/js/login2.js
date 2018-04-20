/*window.onload = function() {
    var config = {
      vx : 4,
      vy : 4,
      height : 2,
      width : 2,
      count : 100,
      color : "121, 162, 185",
      stroke : "100, 200, 180",
      dist : 6000,
      e_dist : 20000,
      max_conn : 10
    }
    CanvasParticle(config);
  }*/

$('#login-button').click(function (event) {
  event.preventDefault();
  $('form').fadeOut(500);
  $('.wrapper').addClass('form-success');
});
