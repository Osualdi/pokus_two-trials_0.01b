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
    defaultImage.size("20vh", "20vh")
    ,    
    newText("study-boy-sentence", "Welcome!<p>In this experiment, you will hear and read a sentence, and see two images.</p><b>Select the image that better matches the sentence:</b><p>Press the <b>F</b> key to select the image on the left.<br>Press the <b>J</b> key to select the image on the right.</p>")
        .center()
        //.unfold(2676)
    ,
    newImage("boy-basic", "mc.png")
        //.size(200, 200)
		.center()
		.print()
    ,
	newButton("boyBasic-button", "Go to the first trial") //just checking to remove a button
        .center()
        .print()
        .wait()
	,	
	getImage("boy-basic").remove()
	,
	getText("study-boy-sentence").remove()
	,
	getButton("boyBasic-button").remove()
	,
    
	newImage("boy-hello", "mc_hello.png")
        //.size(200, 200)
		.center()
		.print()
    ,
	newButton("boyHello-button", "Go to the first trial") //just checking to remove a button
        .center()
        .print()
		.wait()
	,	
	getImage("boy-hello").remove()
	,
	getButton("boyHello-button").remove()
	,
	
	newText("happy-boy-sentence", "Student is happy and excited without any problem.")
        .center()
        .unfold(2676)
    ,

    newImage("boyExcited", "mc_excited.png")
        //.size(200, 200)
		.center()
		.print()
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
        newImage("singular", row.singular_image)
            .size(200, 200)
        ,
        newCanvas("side-by-side", 200,200)
            .add(  0, 0, getImage("singular"))
            //.add(250, 0, getImage("singular"))
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
        /*newKey("keypress", "FJ")
            .log()
            .wait()
            ,*/
        newAudio("audio", row.audio)
            .play()
        ,
        /*
        // Stop now to prevent collecting unnecessary data
        getEyeTracker("tracker")
            .stop()
        ,*/
        getAudio("audio")
            .wait("first")
        ,
        // Check/recalibrate the tracker before every trial
        //newEyeTracker("tracker").calibrate(50,2)
        //,
        newTimer(250).start().wait() //timer before new image;
    )
);
SendResults() // here it will send results

/*
getEyeTracker("tracker")
            .add(   // We track the Canvas elements   
                getCanvas("topFemaleIA"),
                getCanvas("bottomFemaleIA"),
                getCanvas("topMaleIA"),
                getCanvas("bottomMaleIA") 
            )
            .log()  // If this line is missing, the eye-tracking data won't be sent to the server
            .start()
        ,
*/

Template("one_images_main.csv", row =>
    newTrial("experimental-trial_main",
        /*newAudio("audio", row.audio)
            .play()
        ,*/
        // Check/recalibrate the tracker before every trial
        newEyeTracker("tracker").calibrate(50,2)
        ,
        // 250ms delay
        newTimer(250).start().wait()
        ,
        newImage("singular", row.singular_image)
            .size(200, 200)
        ,
        newCanvas("side-by-side", 200,200)
            .add(  0, 0, getImage("singular"))
            //.add(250, 0, getImage("singular"))
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
        /*newKey("keypress", "FJ")
            .log()
            .wait()
            ,*/
        newAudio("audio", row.audio)
            .play()
        ,
        getAudio("audio")
            .wait("first")
        ,
        // Check/recalibrate the tracker before every trial
        //newEyeTracker("tracker").calibrate(50,2)
        //,
        newTimer(250).start().wait() //timer before new image;
    )
);
SendResults() // here it will send results

Template("two_images.csv", row =>
    newTrial("experimental-trial_two_images",
        /*newAudio("audio", row.audio)
            .play()
        ,*/
        // Check/recalibrate the tracker before every trial
        newEyeTracker("tracker").calibrate(50,2)
        ,
        // 250ms delay
        newTimer(250).start().wait()
        ,
        newImage("plural", row.plural_image)
            .size(200, 200)
        ,
        newImage("singular", row.singular_image)
            .size(200, 200)
        ,
        newCanvas("side-by-side", 450,200)
            .add(  0, 0, getImage("plural"))
            .add(250, 0, getImage("singular"))
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
        /*newKey("keypress", "FJ")
            .log()
            .wait()
            ,*/
        newAudio("audio", row.audio)
            .play()
        ,
        getAudio("audio")
            .wait("first")
        ,
        // Check/recalibrate the tracker before every trial
        //newEyeTracker("tracker").calibrate(50,2)
        //,
        newTimer(250).start().wait() //timer before new image;
    )
);
SendResults() // here it will send results