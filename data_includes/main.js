//Author: Jaroslav Martinec 

// Type code below this line.
// Remove command prefix
PennController.ResetPrefix(null);

// Turn off debugger
// DebugOff()
//
// Instructions
// code omitted in interest of space

//this will hide the progress bar  
var showProgressBar = false;

/* This will be good to keep in our changed version; -> rewrite it for our logical structure;
// Sequence of the elements in the experiment
Sequence("Preload", "Loading", "WebcamCheck", "ChromeCheck", "L1Check", "Welcome",
    "Consent", "WebcamSetUp", "FailedCalibrationLink", "AudioSetUp", "AudioCheck",
    "Instructions", "PractiseSession", "EndOfPractise", "Counter", randomize("Block1"),
    "BlinkBreak", "AudioSetUp2", randomize("Block2"), "LanguageQuestionnairePage",
    "WebcamQuestionnairePage", "Send", "FinalPage")
*/

/* 
// Original part of the code from expretiment; Some kind of loadind screen; (???)
// Below is a fake loading page. I added this because the first page was often a bit
// glitchy, and this way, there is more loading time. Note that this is a quick-'n-dirty
// fix though.
    newTrial("Loading",
    newText("Loading", "Loading...")
    .center()
    .print()
    ,
// After a 1000 ms, a continue button is printed.
    newTimer(1000)
    .start()
    .wait()
    ,
    getText("Loading")
    .remove()
    ,
    newText("Continue", "Click on the button below to start the experiment!")
    .center()
    .print()
    ,
    newButton("ContinueButton", "Continue to the experiment")
    .center()
    .print()
    .wait()
)
*/

/**
 * Permisson part
 * Some webcam check and maybe audio check;
 */


// And we present the task instructions.
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
	
    newText("hello-boy-sentence", "지금부터 제가 이야기를 들려드릴 거예요.</p><b>제 이야기를 잘 듣고, 무엇을 말하는지 맞춰 보세요.</b>") 
    //<p>왼쪽 그림같으면 <b>F</b> 를 누르시고, <br>오른쪽 그림같으면 <b>J</b> 를 누르세요.</p>")
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
        /**
         * // The callback commands lets us log the X and Y coordinates of the estimated
         * // gaze-locations at each recorded moment in time (Thanks to Jeremy Zehr for
         * // writing this function)
         * newEyeTracker("tracker",1).callback( function (x,y) {
         * if (this != getEyeTracker("tracker")._element.elements[0]) return;
         * getEyeTracker("tracker")._element.counts._Xs.push(x);
         * getEyeTracker("tracker")._element.counts._Ys.push(y);
         * })
         * ,
         * newFunction(()=>{
         * getEyeTracker("tracker")._element.counts._Xs = [];
         * getEyeTracker("tracker")._element.counts._Ys = [];
         * }).call()
         * ,
         * 
         * // Show the mouse cursor (needed if calibration fails)
         * newFunction( ()=>{
         * $("body").css({
         * width: '100vw',
         * height: '100vh',
         * cursor: 'default'
         * });
         * }).call()
         * ,
         * getEyeTracker("tracker")
         * .test.score(1) //.calibrate(50) // Each trial starts with a calibration
         * check to see whether the treshold of 50 is still reached.
         * .log() // log the calibration scores
         * ,
         * 
         * // Hide the mouse cursor
         * newFunction( ()=>{
         *  $("body").css({
         * width: '100vw',
         * height: '100vh',
         * cursor: 'none'
         * });
         * }).call()
         * ,  
        */    
    
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
    /* **Work in progress** -> those parts will be used for PHP collection of data;
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

/**
 * 
 * // And we show a clozing page.
 * newTrial("FinalPage",
 * newTimer(100)
 * .start()
 * .wait()
 * ,
 * getHtml("downloadspeed")
 * .remove()
 * ,
 * exitFullscreen()
 * ,
 * newText("Final","This is the end of the experiment. <br> Thank you for your
 * participation! If you have any questions or if you want to know more about the
 * results, please get in touch with me via mieke.slim@ugent.be")
 * ,
 * newCanvas("myCanvas", "60vw" , "60vh")
 * .settings.add(0,0, getText("Final"))
 * .print("center at 50%", "middle at 50%")
 * ,
 * newButton("waitforever").wait() // Not printed: wait on this page forever
 * )
 */