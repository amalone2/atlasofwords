PennController.ResetPrefix(null); // Initiates PennController
PennController.DebugOff();

Sequence( "safariDetector", "intro", "trainingInstr" , randomize("trainingTrials"), randomize("trainingTrials"), randomize("trainingTrials"), randomize("testTrials"), "surveyInstr", "survey", SendResults(), "debriefing", "validation" )


newTrial("safariDetector",
  newFunction( () => navigator.userAgent.match(/Safari/i) )
    .testNot.is(null)
    .success(  
      newText("It looks like you may be attempting to access the experiment using Safari. Unfortunately, Safari is not supported. Please try again with a different browser.").print()
      ,
      newTimer(1).wait()
    )
  ,
  newButton("Start the experiment").print().wait()
)

newTrial("intro",
        defaultText
            .print()
        ,
        newText("<p>Welcome!</p>")
        ,
        newText("<p>Please make sure that you are wearing headphones adjusted to a comfortable volume, are using a desktop computer, and have a stable internet connection. Please read over the following information before continuing.</p><p>IN ORDER TO RECEIVE CREDIT FOR YOUR PARTICIPATION, PLEASE DO NOT CLOSE THIS WINDOW.<p>")
        ,
        newText("<p>The main goal of this project is to obtain more insight into the ways in which listeners understand language and music and to explore how adult-like auditory processing develops from early infancy to adulthood. In particular, we examine what knowledge listeners possess regarding the sound patterns, words, and combination of words in their language. We then assess how this knowledge is used in daily listening conditions where speakers sometimes make errors or speak in ways that deviate from the local standard, and how this relates to music processing. This eventually allows us to determine the developmental trajectory of speech processing from childhood into adulthood. By establishing a baseline for typical language development, we hope to eventually better help people with language issues.</p><p>This is a single-session study. Your participation will consist of listening to audio and looking at images while indicating your responses via keypress.</p><p>There are no known risks associated with these procedures. There are no known benefits to the participant associated with these procedures. Participation in this study is completely voluntary. If you have questions, concerns, or complaints, or think the research has hurt you, talk to the research team at 716 645 0238 or mariekev@buffalo.edu. You may also contact the research participant advocate at 716-888-4845 or researchadvocate@buffalo.edu.</p><p>There is no payment for participation in this study. You will, however, receive 0.5 research credit for your participation. You must follow the link at the conclusion of the study to receive your credit.")
        ,
        newText("<p>Click the button below if you have read the above information you and consent to participate.</p>")
        ,
        newButton("Start")
            .print()
            .wait()

           
    )

    
//training directions
newTrial("trainingInstr",
    newText("(Please read the directions carefully.)")
        .print()
    ,
    newText("<p>In the following study, you'll see a pair of images on-screen, and you'll hear one of them being labeled. You will have to select the image that you heard being labeled. To do this, press the F key for the image on the left, and the J key for the image on the right. Please pay close attention, as you will be encountering items that will be novel to you.</p>")
        .print()
    ,
    newText("<p>Once again: press F if you heard the image on the left being labeled, and J if you heard the image on the right being labeled. When you're ready, press the Y key to begin.</p>")
        .print()
    ,
    newKey("Y")
        .wait()
    )

//training
Template( PennController.defaultTable.filter("Block","training") ,
    variable => 
    newTrial("trainingTrials",
    newText("fixation","*")
        .print()
    ,
    newTimer("delay",2000)
        .start()
        .wait()
    ,
    getText("fixation")
        .remove()
    ,
    newImage("target", variable.target)
        .size(500,500)
        .log("target", variable.target)
    ,
    newImage("distractor", variable.distractor)
        .size(500,500)
        .log("distractor", variable.distractor)
    ,
    newCanvas(1400,680)
        .add(   50 , 0 , getImage("target") )
        .add( 800, 0 , getImage("distractor") )
        .print()
    ,
    newSelector("shuffler")
        .disableClicks()
        .add( getImage("target") , getImage("distractor") )
        .shuffle()
        .keys(          "F"    ,          "J"   )
        .log()
        .disable()
    ,
    newAudio("trainingAudio",variable.trialAudio)
        .play()
        .log("trainingAudio", variable.trialAudio)
        .wait()
    ,
    getSelector("shuffler").enable().wait()
    )
.log("ID",PennController.GetURLParameter("id"))
.log( "Group" , variable.Group )

)    


//test
Template( PennController.defaultTable.filter("Block","test") ,
    variable => 
    newTrial("testTrials",
    newText("fixation","*")
        .print()
    ,
    newTimer("delay",2000)
        .start()
        .wait()
    ,
    getText("fixation")
        .remove()
    ,
    newImage("target", variable.target)
        .size(500,500)
        .log("target", variable.target)
    ,
    newImage("distractor", variable.distractor)
        .size(200,200)
        .log("distractor", variable.distractor)
    ,
    newCanvas(1400,680)
        .add(   50 , 0 , getImage("target") )
        .add( 800, 0 , getImage("distractor") )
        .print()
    ,
    newSelector("shuffler")
        .disableClicks()
        .add( getImage("target") , getImage("distractor") )
        .shuffle()
        .keys(          "F"    ,          "J"   )
        .log()
        .disable()
    ,
    newAudio("testAudio",variable.trialAudio)
        .play()
        .log("testAudio", variable.trialAudio)
        .wait()
    ,
    getSelector("shuffler").enable().wait()
    )
.log("ID",PennController.GetURLParameter("id"))
.log( "Group" , variable.Group )

)    
    
newTrial("surveyInstr",
        newText("<p>In the next segment, you will be asked some questions about your language background. Please answer each as accurately as you can.</p><p>Enter your response for each question, and then press the Next button to continue.</p>")
            .print()
        ,
        newButton("Continue")
            .print()
            .wait()
)
    
//survey
Template(  PennController.GetTable("survey.csv") ,
    variable => 
    newTrial("survey",
        newText("surveyText", variable.Question)
            .print()
        ,
        newTextInput("surveyResp")
            .print()
            .wait()
            .log()
        ,
        newButton("Next")
            .print()
            .wait()
    )
)  

    newTrial("debriefing",
        newText("<p>Please read over the following information about the study you have just completed before continuing. PLEASE DO NOT CLOSE THIS WINDOW! WHEN YOU ARE FINISHED READING, CONTINUE TO THE NEXT PAGE TO RECEIVE CREDIT.</p><p>In today's world, we often interact with people who speak with accents different from our own. We might, for instance, learn course material from an accented professor or see a medical professional who was born abroad. Studying the ways in which such linguistic diversity affects language learning and processing can improve communication among people who speak with different accents. For this reason, the current study investigates how adults learn new words and to what extent this depends on inferences we draw. Research has shown that when we come across a new word, we tend to infer that this word refers to an object we don't already have a label for, rather than an object we do have a label for. This strategy is called <i>disambiguation</i>, and it occurs to a greater extent in monolingual infants than multilingual infants. The purpose of this study is to investigate how the background of the speaker (native vs. non-native) may affect these inferences.</p><p>Because disambiguation has been shown to occur to differing degrees in infants based on language background, the predictor variable in this study is the language background of the listener (monolingual vs. multilingual). The independent variable is the accent of the speaker. You were randomly assigned to either a native-accented condition (presenting you with a speaker who grew up in Buffalo) or a foreign-accented condition (presenting you with a native Dutch speaker who learned English later on in life and hence spoke with a foreign accent).</p><p>In the first part of the study, you were exposed to two images side-by-side on a screen: one depicting a familiar object and one depicting a novel object for which most people do not have a label. You simultaneously listened to new words, such as <i>crambo</i> or <i>danter</i>. If you display disambiguation, you will infer that the new word you are hearing is referring to the unfamiliar object, the object for which you do not already have a word in your vocabulary. In the second part of the study, you are tested on how well you learned the meanings of the new words. Because you are never explicitly told which new word maps onto which unfamiliar object, if you are able to learn these associations, you did so solely by making inferences. The proportion of correct target image selections in the test phase is the dependent variable.</p><p>We hypothesize that monolingual participants will have a larger proportion of selections of the target object than multilingual participants. We also hypothesize that there will be a larger proportion of selections of the target object when the speaker is native-accented than when the speaker is foreign-accented, which may suggest that learning new words based on inferences is easier when the speaker has a native rather than a foreign accent. The findings of this study will provide more insight into how speaker background affects our ability to learn new words based on inferences.</p><p>Thank you for your time and contribution to this research! If you have friends participating in experiments in this laboratory, please keep the purpose of this experiment confidential. If you have any further questions about this experiment, please feel free to contact Mariam Shafik at mishafik@buffalo.edu if you have questions that you wish to have answered. If you have any questions about your rights as a research participant, you can contact the research participant advocate at (716) 888-4845.</p><p>If you are interested in reading more about some of these issues, see the references given below.</p><p>Byers-Heinlein, K., & Werker, J.F. (2009). Monolingual, bilingual, trilingual: Infants' language experience influences the development of a word learning heuristic.<i>Developmental Science, 12</i>(5), 815-823. https://doi.org/10.1111/j.1467-7687.2009.00902.x</p><p>Yu, C., & Smith, L. B. (2007). Rapid word learning under uncertainty via cross-situational statistics. <i>Psychological Science, 18</i>(5), 414-420. https://doi.org/10.1111/j.1467-9280.2007.01915.x.</p>")
            .print()
        ,
        newButton("Continue")
            .print()
            .wait()
    )


newTrial("validation",
    newText("<p>Thank you for your participation!</p>")
        .print()
    ,
    newText("<p><a href='https://buffalo.sona-systems.com/webstudy_credit.aspx?experiment_id=1124&credit_token=ee29e04313964402b530b4859a571044&survey_code=XXXX"+PennController.GetURLParameter("id")+"'>Click here to receive credit for your participation.</a></p>")
        .print()
    ,
    newButton("void")
        .wait()
)    