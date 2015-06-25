var five = require("johnny-five");
var board = new five.Board();
var button, led, piezo, lcd;

//var count = 0;
board.on("ready", function() {

  var count = 0;

  button = new five.Button(2);
  led = new five.Led(11);
  //servo = new five.Servo(10);
  piezo = new five.Piezo(9);
  lcd = new five.LCD({
    // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
    // Arduino pin # 7    8   9   10  11  12
    pins: [3, 4, 5, 6, 12, 13],
    backlight: 5,
    rows: 2,
    cols: 16});

lcd.clear().print("hi");

  board.repl.inject({
    button: button,
    //servo: servo,
    piezo: piezo
  });




  //servo.min(-90);
  //servo.max(90);
  //servo.to(0);
  //servo.center();
  //servo.step(90);
  //servo.step(-180);
  //servo.step(90);

  button.on('down', function () {
    console.log('down');
    led.on();
    console.log(count, count % 2);
    //if (count % 2) {
    //  servo.to(-90);
    //}
    //servo.to(90);

    // Plays a song
    piezo.play({
      // song is composed by an array of pairs of notes and beats
      // The first argument is the note (null means "no note")
      // The second argument is the length of time (beat) of the note (or non-note)
      song: [
        ["C4", 1 / 4],
        ["D4", 1 / 4],
        ["F4", 1 / 4],
        ["D4", 1 / 4],
        ["A4", 1 / 4],
        [null, 1 / 4],
        ["A4", 1],
        ["G4", 1],
        [null, 1 / 2],
        ["C4", 1 / 4],
        ["D4", 1 / 4],
        ["F4", 1 / 4],
        ["D4", 1 / 4],
        ["G4", 1 / 4],
        [null, 1 / 4],
        ["G4", 1],
        ["F4", 1],
        [null, 1 / 2]
      ],
      tempo: 100
    });
  });

  button.on('hold', function () {
    led.pulse({
      easing: "linear",
      duration: 3000,
      cuePoints: [0, 0.2, 0.4, 0.6, 0.8, 1],
      keyFrames: [0, 10, 0, 50, 0, 255],
      onstop: function() {
        console.log("Animation stopped");
      }
    });
  });

  button.on('up', function () {
    console.log('up');
    led.stop().off();
    //servo.to(0);
    count++;
  });
  // Create an Led on pin 13
  //var led1 = new five.Led(13);
  // Blink every half second
  //led1.blink(500);
  //setTimeout(function(){
  //  var led2 = new five.Led(12);
  //  led2.blink(500);
  //}, 500)
});