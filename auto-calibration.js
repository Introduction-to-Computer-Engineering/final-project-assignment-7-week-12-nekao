//In this auto-calibration project it uses the micro:bit manual-calibration program, 
//but instead it will automatically store the soil moister values. 
//It starts by displaying a south icon, then prompts the users to take three samples of the low and three of the high ranges. 
//The micro:bit auto-calibration will recorded the results. 
//It will take the average of the low and set it to the minimum range.
// it will also take the high average and set it to the max. 
//It will perform the mapping, exit the calibration, 
//then will display "calibration success," and finally it the program will operate as normal.

// the main function that handles countdown and
// sampling used for averaging
function sampleSoil (direction: number) {
    // the countdown loop
    for (let index = 3; index > 0; index--) {

        basic.showArrow(direction) //chooses which direction the arrow points 0 = up, 4 = down 




        //next two lines help with visual timing 

        basic.clearScreen()

        basic.pause(100)

    }
// sampling phase - shows user that sampling is
    // "beginning" with square-dot icon
    for (let index = 0; index < 3; index++) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . # . #
            # . . . #
            # # # # #
            `)
        basic.clearScreen()
        basic.pause(100)
    }
    basic.pause(10)
    // after flashing 3 times, soil moisture sensor
    // measured
    pins.digitalWritePin(DigitalPin.P6, 1)
    basic.pause(30)
    sample.push(pins.analogReadPin(AnalogPin.P0))
    pins.digitalWritePin(DigitalPin.P6, 0)
    basic.pause(200)
    basic.showIcon(IconNames.Happy)
    basic.pause(500)
}
let sample: number[] = []
let moistureReading: number = 0
let lowAverage = 1
let highAverage = 100
// main program creates 6 rounds of moisture sampling
for (let sampleRound = 0; sampleRound <= 6 - 1; sampleRound++) {
    if (sampleRound % 2 == 0) {
        sampleSoil(4)
    } else {
        sampleSoil(0)
    }
}
// averaging of 6 samples into two averages for high
// and low Adds the three low readings and divides by
// three to get an average
lowAverage = Math.round((sample[0] + sample[2] + sample[4]) / 3)
// Adds the three high readings and divides by three
// to get an average
highAverage = Math.round((sample[1] + sample[3] + sample[5]) / 3)
// displays the unmapped averages for user reference
// purposes
basic.showString("low")
basic.showNumber(lowAverage)
basic.showString("high")
basic.showNumber(highAverage)
// moisture level program with led level display
basic.forever(function () {
    pins.digitalWritePin(DigitalPin.P6, 1)
    // reads data from sensor maps sensor values from
    // "lowAverage" - "highAverage" ranges to new values 0
    // - 4
    moistureReading = Math.map(pins.analogReadPin(AnalogPin.P0), lowAverage, highAverage, 0, 4)
    // switching between the 5 possible values of
    // moistureReading i.e 0,1..4
    switch (Math.round(moistureReading)) {
        case 0:
            basic.showIcon(IconNames.Chessboard) //displays checkerboard meaning no reading or dry 
            basic.pause(100)
            basic.clearScreen()

            break;

        case 1:

            for (let x = 0; x < 5; x++) {

                led.plotBrightness(x, 4, 255) //displays single bar 

            }

            break;

        case 2:

            for (let y = 4; y > 2; y--) { //displays 2 bars 

                for (let z = 0; z < 5; z++) {

                    led.plotBrightness(z, y, 255)

                }

            }

            break;

        case 3:

            for (let a = 4; a > 1; a--) { //displays 3 bars 

                for (let b = 0; b < 5; b++) {

                    led.plotBrightness(b, a, 255)

                }

            }

            break;

        case 4:

            for (let c = 4; c > 0; c--) { //displays 4 bars 

                for (let d = 0; d < 5; d++) {

                    led.plotBrightness(d, c, 255)

                }

            }

            break;

    }
pins.digitalWritePin(DigitalPin.P6, 0)
    basic.pause(2000)
    basic.clearScreen()
})
// the main function that handles countdown and
// sampling used for averaging
function sampleSoil (direction: number) {
    // the countdown loop
    for (let index = 3; index > 0; index--) {

        basic.showArrow(direction) //chooses which direction the arrow points 0 = up, 4 = down 




        //next two lines help with visual timing 

        basic.clearScreen()

        basic.pause(100)

    }
// sampling phase - shows user that sampling is
    // "beginning" with square-dot icon
    for (let index = 0; index < 3; index++) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # . # . #
            # . . . #
            # # # # #
            `)
        basic.clearScreen()
        basic.pause(100)
    }
    basic.pause(10)
    // after flashing 3 times, soil moisture sensor
    // measured
    pins.digitalWritePin(DigitalPin.P6, 1)
    basic.pause(30)
    sample.push(pins.analogReadPin(AnalogPin.P0))
    pins.digitalWritePin(DigitalPin.P6, 0)
    basic.pause(200)
    basic.showIcon(IconNames.Happy)
    basic.pause(500)
}
let sample: number[] = []
let moistureReading: number = 0
let lowAverage = 1
let highAverage = 100
// main program creates 6 rounds of moisture sampling
for (let sampleRound = 0; sampleRound <= 6 - 1; sampleRound++) {
    if (sampleRound % 2 == 0) {
        sampleSoil(4)
    } else {
        sampleSoil(0)
    }
}
// averaging of 6 samples into two averages for high
// and low Adds the three low readings and divides by
// three to get an average
lowAverage = Math.round((sample[0] + sample[2] + sample[4]) / 3)
// Adds the three high readings and divides by three
// to get an average
highAverage = Math.round((sample[1] + sample[3] + sample[5]) / 3)
// displays the unmapped averages for user reference
// purposes
basic.showString("low")
basic.showNumber(lowAverage)
basic.showString("high")
basic.showNumber(highAverage)
// moisture level program with led level display
basic.forever(function () {
    pins.digitalWritePin(DigitalPin.P6, 1)
    // reads data from sensor maps sensor values from
    // "lowAverage" - "highAverage" ranges to new values 0
    // - 4
    moistureReading = Math.map(pins.analogReadPin(AnalogPin.P0), lowAverage, highAverage, 0, 4)
    // switching between the 5 possible values of
    // moistureReading i.e 0,1..4
    switch (Math.round(moistureReading)) {
        case 0:
            basic.showIcon(IconNames.Chessboard) //displays checkerboard meaning no reading or dry 
            basic.pause(100)
            basic.clearScreen()

            break;

        case 1:

            for (let x = 0; x < 5; x++) {

                led.plotBrightness(x, 4, 255) //displays single bar 

            }

            break;

        case 2:

            for (let y = 4; y > 2; y--) { //displays 2 bars 

                for (let z = 0; z < 5; z++) {

                    led.plotBrightness(z, y, 255)

                }

            }

            break;

        case 3:

            for (let a = 4; a > 1; a--) { //displays 3 bars 

                for (let b = 0; b < 5; b++) {

                    led.plotBrightness(b, a, 255)

                }

            }

            break;

        case 4:

            for (let c = 4; c > 0; c--) { //displays 4 bars 

                for (let d = 0; d < 5; d++) {

                    led.plotBrightness(d, c, 255)

                }

            }

            break;

    }
pins.digitalWritePin(DigitalPin.P6, 0)
    basic.pause(2000)
    basic.clearScreen()
})
