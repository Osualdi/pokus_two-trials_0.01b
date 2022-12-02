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
    defaultImage.size("30vw", "50vh")
    ,   

    newText("basic-boy-sentence", "안녕하세요!<p>만나서 반가워요!</p>")
        .center()
    ,
    newImage("boy-basic", "mc_hello.png").center().print()
    ,
	newButton("boyBasic-button", "Go to the first trial") //***button no need; automatically move to next after 3s***
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
	
    newText("hello-boy-sentence", "지금부터 제가 이야기를 들려드릴 거예요.</p><b>제 이야기를 잘 듣고, 무엇을 말하는지 맞춰 보세요.</b><p>왼쪽 그림같으면 <b>F</b> 를 누르시고, <br>오른쪽 그림같으면 <b>J</b> 를 누르세요.</p>")
        .center()
    ,
    newImage("boy-hello", "mc.png").center().print()
    ,
    newButton("boyHello-button", "Go to the first trial") //***button no need; automatically move to next after 7s***
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
	
	newText("happy-boy-sentence", "먼저 연습을 해 볼까요?")
        .center()
    ,
    newImage("boyExcited", "mc_happy.png").center().print()
    ,
	newButton("Go to the first trial") //***button no need; automatically move to next after 3s***
        .center()
        .print()
        .wait() 
   );

// Experimental trial //***NOT WORKING FROM HERE***
Template("one_image.csv", row =>
    newTrial("experimental-trial_practice",
        // Check/recalibrate the tracker before every trial
        newEyeTracker("tracker").calibrate(50,2)
        ,
        // 250ms delay
        newTimer(250).start().wait()
        ,
        defaultImage.size("30vw", "50vh")
        ,
        newImage("singular", row.singular_image)
        ,
        newCanvas("side-by-side", "30vw", "50vh")
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
        defaultImage.size("30vw", "50vh")
        ,
        newImage("singular", row.singular_image)
        ,
        newCanvas("side-by-side", "30vw", "50vh")
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
        defaultImage.size("30vw", "50vh")
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