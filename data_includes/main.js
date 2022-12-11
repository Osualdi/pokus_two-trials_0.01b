// Type code below this line.

// Remove command prefix
PennController.ResetPrefix(null);

// Turn off debugger
// DebugOff()
//
// Instructions
// code omitted in interest of space

newTrial("instructions",
    // Start calibrating the eye-tracker, allow for up to 2 attempts
    // 50 means that calibration succeeds when 50% of the estimates match the click coordinates
    // Increase the threshold for better accuracy, but more risks of losing participants
    //getEyeTracker("tracker").calibrate(50,2)
    //,
    fullscreen()
    ,
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
    newTimer("preview", 3000) // automatically move to next after 3s
            .start()
        .wait()
    ,
    getText("basic-boy-sentence").remove()
	,	
	getImage("boy-basic").remove()
	,
	
    newText("hello-boy-sentence", "지금부터 제가 이야기를 들려드릴 거예요.</p><b>제 이야기를 잘 듣고, 무엇을 말하는지 맞춰 보세요.</b><p>왼쪽 그림같으면 <b>F</b> 를 누르시고, <br>오른쪽 그림같으면 <b>J</b> 를 누르세요.</p>")
        .center() // Not sure if text about keyboard is needed anymore?
    ,
    newImage("boy-hello", "mc.png").center().print()
    ,
    newTimer("preview", 7000) // automatically move to next after 7s
            .start()
        .wait()
    ,
    getText("hello-boy-sentence").remove()
	,
    getImage("boy-hello").remove()
	,
	
	newText("happy-boy-sentence", "먼저 연습을 해 볼까요?")
        .center()
    ,
    newImage("boyExcited", "mc_happy.png").center().print()
    ,
    newTimer("preview", 3000) // automatically move to next after 3s
            .start()
        .wait()
    ,
    fullscreen() //changed position of fullscreen and still there is nothing happening so will have to chcek it or send them email;
   );

// Experimental trial *** NOT WORKING FROM HERE *** randomisation *** space/width between monitor & picture
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
        /* **Work in progress**
        // We positioning of the four images is random. 
        // This function is needed for the randomization. 
        // It makes an array of the four picture files, and shuffles this array.
        // While testing in different code it is working so far alright.
        images = [row.image1,row.image2,row.image3,row.image4].sort(v=>Math.random()-Math.random()) 
        ,
        */
       //images = [row.singular_image,row.plural_image].sort(v=>Math.random()-Math.random())
       //,
        newImage("plural", row.plural_image)
        ,
        newImage("singular", row.singular_image)
        ,
        newCanvas("side-by-side", "100vw", "50vh") // Should be canvas of 100% of the display size
            .add( "10vw", "0vh", getImage("plural")) // 10% of left; around image should be enough space for now;
            .add("60vw", "0vh", getImage("singular")) // 60% of left; around image should be enough space for now;
            .center()
            .print()
            .log()
        ,
        /*
        newCanvas("left_side", "50vw", "50vh") // Should be canvas of 50% of the display size
            .add( "center at 50%", "middle at 50%", newImage(images[0])) // *not sure* of left; around image should be enough space for now;
            .print("center at 25%", "middle at 50%")
            .log()
        ,
        newCanvas("right_side", "50vw", "50vh") // Should be canvas of 50% of the display size
            .add("center at 50%", "middle at 50%", newImage(images[1])) // *not sure* of right; around image should be enough space for now;
            .print("center at 75%", "middle at 50%")
            .log()
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
    /* **Work in progress**
    // save the required trial info in the results file 
    .log("Subject"              , getVar("Subject")         )
    .log( "image1"              , row.image1                )
    .log( "image2"              , row.image2                )            
    .log( "image3"              , row.image3                )   
    .log( "image4"              , row.image4                )
    .log( "toplefttimage"       , images[0]                 ) // save which image is printed here (since the array was shuffled)
    .log( "bottomleftimage"     , images[1]                 ) // save which image is printed here (since the array was shuffled)
    .log( "toprightimage"       , images[2]                 ) // save which image is printed here (since the array was shuffled)
    .log( "bottomrightimage"    , images[3]                 ) // save which image is printed here (since the array was shuffled)
    .log( "sentence"            , row.audio                 )           
    .log( "stimulustype"        , row.stimulustype          )  
    .log( "stimuluscondition"   , row.stimuluscondition     )     
    .log( "list"                , row.list                  )
    .log( "stimulusset"         , row.pair                  )
    .log( "ViewportWidth"       , window.innerWidth         ) // Screensize: width
    .log( "ViewportHeight"      , window.innerHeight        ) // Screensize: heigth 
    */
);
SendResults() // here it will send results

//***ending screen: picture (mc_excited.png) & text ("아주 잘 하셨어요!")