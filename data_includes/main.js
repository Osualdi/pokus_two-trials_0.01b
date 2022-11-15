// Type code below this line.

// Remove command prefix
PennController.ResetPrefix(null);

// Turn off debugger
// DebugOff()
//
// Instructions
// code omitted in interest of space

newTrial("instructions",
    fullscreen()
    ,
    // Start calibrating the eye-tracker, allow for up to 2 attempts
    // 50 means that calibration succeeds when 50% of the estimates match the click coordinates
    // Increase the threshold for better accuracy, but more risks of losing participants
    //getEyeTracker("tracker").calibrate(50,2)
    //,
    defaultText
        .center()
        .print()
    ,
    defaultImage.size("40vw", "50vh")
    ,   

    newText("basic-boy-sentence", "Welcome!<p>In this experiment, you will hear and read a sentence, and see two images.</p><b>Select the image that better matches the sentence:</b><p>Press the <b>F</b> key to select the image on the left.<br>Press the <b>J</b> key to select the image on the right.</p>")
        .center()
    ,
    newImage("boy-basic", "mc.png").center().print()
    ,
	newButton("boyBasic-button", "Go to the first trial") //just checking to remove a button
        .center()
        .print()
        .wait()
	,
    getText("basic-boy-sentence").remove()
	,	
	getImage("boy-basic").remove()
	,
	getButton("boyBasic-button").remove()
	,
	
    newText("hello-boy-sentence", "Welcome!<p>In this experiment, you will hear and read a sentence, and see two images.</p><b>Select the image that better matches the sentence:</b><p>Press the <b>F</b> key to select the image on the left.<br>Press the <b>J</b> key to select the image on the right.</p>")
        .center()
    ,
    newImage("boy-hello", "mc_hello.png").center().print()
    ,
    newButton("boyHello-button", "Go to the first trial") //just checking to remove a button
        .center()
        .print()
		.wait()
	,	
    getText("hello-boy-sentence").remove()
	,
    getImage("boy-hello").remove()
	,
	getButton("boyHello-button").remove()
	,
	
	newText("happy-boy-sentence", "Student is happy and excited without any problem.")
        .center()
    ,
    newImage("boyExcited", "mc_excited.png").center().print()
    ,
	newButton("Go to the first trial")
        .center()
        .print()
        .wait() 
   );

// Experimental trial
Template("one_image.csv", row =>
    newTrial("experimental-trial_practice",
        // Check/recalibrate the tracker before every trial
        newEyeTracker("tracker").calibrate(50,2)
        ,
        // 250ms delay
        newTimer(250).start().wait()
        ,
        defaultImage.size("40vw", "50vh")
        ,
        newImage("singular", row.singular_image)
        ,
        newCanvas("side-by-side", "40vw", "50vh")
            .add( "0vw", "0vh", getImage("singular"))
            .center()
            .print()
            .log()
        ,
        /* Example of EyeTracker code;
        getEyeTracker("tracker")
            .add(   // We track the Canvas elements   
                getCanvas("some_name_of_canvas"),
                getCanvas("another_name_of_canvas") 
            )
            .log()  // If this line is missing, the eye-tracking data won't be sent to the server
            .start()
        ,
        */ 
        getEyeTracker("tracker")
            .add(   // We track the Canvas elements   
                getCanvas("side-by-side")
            )
            .log()  // If this line is missing, the eye-tracking data won't be sent to the server
            .start()
        ,
        newTimer("preview", 2000)
              .start()
            .wait()
        ,
        newAudio("audio", row.audio)
            .play()
        ,
        getAudio("audio")
            .wait("first")
        ,
        // Stop now to prevent collecting unnecessary data
        getEyeTracker("tracker")
            .stop()
        ,
        // Check/recalibrate the tracker before every trial
        newEyeTracker("tracker").calibrate(50,2)
        ,
        newTimer(250).start().wait() //timer before new image;
    )
);
SendResults() // here it will send results

Template("one_images_main.csv", row =>
    newTrial("experimental-trial_main",
        // Check/recalibrate the tracker before every trial
        newEyeTracker("tracker").calibrate(50,2)
        ,
        // 250ms delay
        newTimer(250).start().wait()
        ,
        defaultImage.size("40vw", "50vh")
        ,
        newImage("singular", row.singular_image)
        ,
        newCanvas("side-by-side", "40vw", "50vh")
            .add(  "0vw", "0vh", getImage("singular"))
            .center()
            .print()
            .log()
        ,
        getEyeTracker("tracker")
            .add(   // We track the Canvas elements   
                getCanvas("side-by-side")
            )
            .log()  // If this line is missing, the eye-tracking data won't be sent to the server
            .start()
        ,
        newTimer("preview", 2000)
              .start()
            .wait()
        ,
        newAudio("audio", row.audio)
            .play()
        ,
        getAudio("audio")
            .wait("first")
        ,
        // Stop now to prevent collecting unnecessary data
        getEyeTracker("tracker")
            .stop()
        ,
        // Check/recalibrate the tracker before every trial
        newEyeTracker("tracker").calibrate(50,2)
        ,
        newTimer(250).start().wait() //timer before new image;
    )
);
SendResults() // here it will send results

Template("two_images.csv", row =>
    newTrial("experimental-trial_two_images",
        // Check/recalibrate the tracker before every trial
        newEyeTracker("tracker").calibrate(50,2)
        ,
        // 250ms delay
        newTimer(250).start().wait()
        ,
        defaultImage.size("40vw", "50vh")
        ,
        newImage("plural", row.plural_image)
        ,
        newImage("singular", row.singular_image)
        ,
        newCanvas("side-by-side", "90vw", "50vh")
            .add( "0vw", "0vh", getImage("plural"))
            .add("45vw", "0vh", getImage("singular"))
            .center()
            .print()
            .log()
        ,
        getEyeTracker("tracker")
            .add(   // We track the Canvas elements   
                getCanvas("side-by-side")
            )
            .log()  // If this line is missing, the eye-tracking data won't be sent to the server
            .start()
        ,
        newTimer("preview", 2000)
              .start()
            .wait()
        ,
        newAudio("audio", row.audio)
            .play()
        ,
        getAudio("audio")
            .wait("first")
        ,
        getEyeTracker("tracker")
            .stop()
        ,
        // Stop now to prevent collecting unnecessary data
            getEyeTracker("tracker")
            .stop()
        ,
        // Check/recalibrate the tracker before every trial
        newEyeTracker("tracker").calibrate(50,2)
        ,
        newTimer(250).start().wait() //timer before new image;
    )
);
SendResults() // here it will send results