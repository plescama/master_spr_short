function Pick(set,n) {
    assert(set instanceof Object, "First argument of pick cannot be a plain string" );
    n = Number(n);
    if (isNaN(n) || n<0) n = 0;
    this.args = [set];
    set.remainingSet = null;
    this.run = function(arrays){
        if (set.remainingSet===null) set.remainingSet = arrays[0];
        const newArray = [];
        for (let i = 0; i < n && set.remainingSet.length; i++)
            newArray.push( set.remainingSet.shift() );
        return newArray;
    }
}
function pick(set, n) { return new Pick(set,n); }



PennController.AddHost("https://amor.cms.hu-berlin.de/~plescaan/Master/")
PennController.ResetPrefix(null);
//PennController.DebugOff() // use for the final version
PennController.Sequence( "welcome",
                         "instructions",
                         "practice", "end_practice",
                         pick(list = seq("experiment_trial"),16), "break1", //30
                         pick(list,16), "break2", //60
                         pick(list,16), "break3", //90
                         pick(list,16), "end_exp", //120
                         "post-ques", "send", "final");


// create dashed function
// Splits the sentence according to * boundaries and then creates blanks by splitting words with spaces and then takes the chunks and transforms them to underscores.
// All are joined by spaces
dashed = (sentence, remove) => {
    let words = sentence.split('*'),  blanks = words.map(w=>w.split('').map(c=>'_').join('') ); // 'sentence.spilot('*')' = '*' defines the chunk boundaries (in the .csv)
    let textName = 'dashed'+words.join('');
    // We'll return cmds: the first command consists in creating (and printing) a Text element with dashes
    let cmds = [ newText(textName, blanks.join(' ')).print()
    .settings.css("font-family","courier")
    .settings.css("font-size", "20px")
  //.settings.css("font-size", "2em")  
    .settings.center()
    .cssContainer({
    "width": "90vw"})
    ]; // COURIER as font
    // We'll go through each word, and add two command blocks per word
    for (let i = 0; i <= words.length; i++)
    cmds = cmds.concat([ newKey('dashed'+i+words[i], " ").log().wait() , // Wait for (and log) a press on Space
    getText(textName).text(blanks.map((w,n)=>(n==i?words[n]:w)).join(' ')) ]); // Show word
    if (remove)  // Remove the text after the last key.wait() is parameter specified
    cmds.push(getText(textName).remove());
    return cmds;
};

// create cumulative function
cumulative = (sentence, remove) => {
    let words = sentence.split('*'),  blanks = words.map(w=>w.split('').map(c=>'_').join('') ); // 'sentence.split('*')' = '*' defines the chunk boundaries (in the .csv)
    let textName = 'cumulative'+words.join('');
    // We'll return cmds: the first command consists in creating (and printing) a Text element with dashes
    let cmds = [ newText(textName, blanks.join(' ')).print() .settings.css("font-family","courier") .settings.css("font-size", "25px") .print("20vw","50vh")]; // COURIER as font
    // We'll go through each word, and add two command blocks per word
    for (let i = 0; i <= words.length; i++)
    cmds = cmds.concat([ newKey('cumulative'+i+words[i], " ").log().wait() , // Wait for (and log) a press on Space
    getText(textName).text(blanks.map((w,n)=>(n<=i?words[n]:w)).join(' ')) ]); // Show word
    if (remove)  // Remove the text after the last key.wait() is parameter specified
    cmds.push(getText(textName).remove());
    return cmds;
};

// create cumulative function
cumulative_ctxt = (sentence, remove) => {
    let words = sentence.split('*'),  blanks = words.map(w=>w.split('').map(c=>'_').join('') ); // 'sentence.split('*')' = '*' defines the chunk boundaries (in the .csv)
    let textName = 'cumulative'+words.join('');
    // We'll return cmds: the first command consists in creating (and printing) a Text element with dashes
    let cmds = [ newText(textName, blanks.join(' '))
    //.print()
    .settings.css("font-family","courier")
    .settings.css("font-size", "25px")
    .print(50,240)
    //.settings.css("font-size", "0.5em")  
    // .cssContainer({"width": "90vw"})
    ];
    // COURIER as font
    // We'll go through each word, and add two command blocks per word
    for (let i = 0; i <= words.length; i++)
    cmds = cmds.concat([ newKey('context'+i+words[i], " ").log().wait() , // Wait for (and log) a press on Space
    getText(textName).text(blanks.map((w,n)=>(n<=i?words[n]:w)).join(' ')) ]); // Show word
    if (remove)  // Remove the text after the last key.wait() is parameter specified
    cmds.push(getText(textName).remove());
    return cmds;
};




// create cumulative function
cumulative_crit = (sentence, remove) => {
    let words = sentence.split('*'),  blanks = words.map(w=>w.split('').map(c=>'_').join('') ); // 'sentence.split('*')' = '*' defines the chunk boundaries (in the .csv)
    let textName = 'cumulative'+words.join('');
    // We'll return cmds: the first command consists in creating (and printing) a Text element with dashes
    let cmds = [ newText(textName, blanks.join(' ')).print() .settings.css("font-family","courier") .settings.css("font-size", "25px").print(50,340)]; // COURIER as font
    // We'll go through each word, and add two command blocks per word
    for (let i = 0; i <= words.length; i++)
    cmds = cmds.concat([ newKey('critical'+i+words[i], " ").log().wait() , // Wait for (and log) a press on Space
    getText(textName).text(blanks.map((w,n)=>(n<=i?words[n]:w)).join(' ')) ]); // Show word
    if (remove)  // Remove the text after the last key.wait() is parameter specified
    cmds.push(getText(textName).remove());
    return cmds;
};


//*********************************************************************************************************************************************************************************************
// INTRO & DEMOGRAPHICS
//*********************************************************************************************************************************************************************************************
PennController("welcome",
        fullscreen()
        ,
        defaultText
            .print()
        ,       
        newText("text2", "<p>Humboldt Universit&auml;t zu Berlin, Institut f&uuml;r Deutsche Sprache und Linguistik </p>")
        .settings.center()
        .settings.css("font-style","italic")
       
        ,
        newText("text1", "<h2>Willkommen und Danke, dass Du Dir die Zeit nimmst, an unserem Experiment teilzunehmen!</h2>")
        .settings.center()
        .settings.css("font-size", "large")

        ,
        newText("browser_info", "<br> Bitte stelle sicher, dass Du das Experiment <b>nur mit Mozilla Firefox oder Google Chrome</b> durchf&uuml;hrst.")
        .settings.css("font-size", "large")
       .settings.center()
        ,
        newText("bi", "Versuche bitte <b>nicht</b>, das Experiment auf dem Tablet oder auf dem Mobiltelefon auszuf&uuml;hren, sondern nur am Laptop oder PC.")
        .settings.center()
        .settings.css("font-size", "large")
        ,
        newText("bi2", "Stelle au&szlig;erdem sicher, dass Dein Browserfenster im Vollbildmodus ist.")
        .settings.center()
        .settings.css("font-size", "large")
        ,
        newText("bi3", "W&auml;hle einen bequemen und ruhigen Platz f&uuml;r die n&auml;chsten 20 Minuten! Vielen Dank!")
        .settings.center()
        .settings.css("font-size", "large")
        ,        
                
        newText("br", "<br>")
        .print()
        ,        
        newButton("button1", "Start")
            .settings.center()
            .print()
            .wait()
        ,
        getText("text1")
            .remove()
       
        ,
        getText("browser_info")
        .remove()
        ,
        getText("text2")
        .remove()
        ,
        getText("bi")
        .remove()
        ,
         getText("bi2")
        .remove()
        ,
        getText("bi3")
        .remove()
        ,
        getText("br")
        .remove()
        ,       
        getButton("button1")
          .remove()
        ,
         // Demographics begin
        fullscreen()
               ,
        newText("demo", "<p><small><i> Bevor es losgeht, brauchen wir noch ein paar Informationen von Dir. Alle personenbezogenen Angaben werden anonymisiert gespeichert und eine sp&auml;tere Zuordnung der angegebenen Daten zu Versuchspersonen wird den Forschenden nicht mehr m&ouml;glich sein."
        +" Bitte lies mehr &uuml;ber den Umgang mit den Daten in dem Informationsblatt nach (siehe unten).</i></small><p>")  
         .settings.css("font-size", "20px")
        .settings.center()
        ,
        newCanvas("democanvas", 1000, 125)
        .settings.add(0,0, getText("demo"))
        .settings.center()
        .print()
        ,
        newDropDown("age", "Bitte eine Option ausw&auml;hlen")
        .settings.add("18" , "19" , "20", "21" , "22" , "23", "24" , "25" , "26", "27" , "28" , "29", "30" , "31")
        ,
        newText("agetext", "Alter:")
        .settings.css("font-size", "20px")
        .settings.bold()
        ,
        newCanvas("agecanvas", 1000, 40)
        .settings.add(0,0,getText("agetext"))
        .settings.add(600,2, getDropDown("age"))
        .settings.center()
        .print()
       
        ,
        newText("dominanteh", "Dominante Hand:")
        .settings.css("font-size", "20px")
        .settings.bold()
        ,
        newDropDown("domhand","Bitte eine Option ausw&auml;hlen")
        .settings.add("rechte Hand", "linke Hand", "Ich bin beidh&auml;ndig")
        ,
        newCanvas("domhand", 1000, 40)
        .settings.add(0, 0, getText("dominanteh"))
        .settings.add(600,2, getDropDown("domhand"))
        .settings.center()
        .print()       
        ,       
        newText("sex", "Geschlecht:")
        .settings.css("font-size", "20px")
        .settings.bold()
        ,
        newDropDown("sex", "Bitte eine Option ausw&auml;hlen")
        .settings.add("weiblich", "m&auml;nnlich", "divers")
        ,
        newCanvas("sexcanvas", 1000, 40)
        .settings.add(0, 0, getText("sex"))
        .settings.add(600,3, getDropDown("sex"))
        .settings.center()
        .print()
        ,
        newText("abschluss", "H&ouml;chster Bildungsabschluss:")
        .settings.css("font-size", "20px")
        .settings.bold()
        ,
        newDropDown("abschluss", "Bitte eine Option ausw&auml;hlen")
        .settings.add("kein Abschluss","Schulabschluss","Abitur oder gleichwertiger Abschluss","Studium ohne Abschluss","Ausbildung","Bachelor", "Master", "Promotion")     // MAYBE ADD QUESTIONS ABOUT DIALECT AND DOMINANT HAND
        ,
         newCanvas("abschlusscanvas", 1000, 40)
        .settings.add(0, 0, getText("abschluss"))
        .settings.add(600,4, getDropDown("abschluss"))
        .settings.center()
        .print()
              
        ,      
        newText("nativeDE", "<b>Du bist monolingual mit Deutsch aufgewachsen.</b><br><small>(keine weitere Sprache wurde vor dem 6. Lebensjahr erworben)</small>")
        .settings.css("font-size", "20px")
        ,
        newTextInput("L2", "")
        .settings.size(200,30)
        .settings.hidden()
        ,
        newText("label input", "")
        .settings.after(getTextInput("L2"))
        ,
        newDropDown("language", "Bitte eine Option ausw&auml;hlen")
        .settings.log()
        .settings.add("Ja", "Nein, und zwar auch mit:")
        .settings.after(getText("label input"))
        .settings.callback(
            getDropDown("language")
            .test.selected("Nein, und zwar auch mit:")
            .success( getTextInput("L2").settings.visible())
            .failure( getTextInput("L2").settings.hidden())
        )
        ,
        
        newCanvas("languagecanvas", 1000, 45)
        .settings.add(0, 0, getText("nativeDE"))
        .settings.add(600, 10, getDropDown("language"))
        .settings.center()
        .print()
        ,
       
        newText("dialect", "<b>Mit welcher Variet&auml;t der deutschen Sprache bist Du zuhause aufgewachsen?</b><br><small>(ggf. bitte Dialekt angeben)</small>")
        .settings.css("font-size", "20px")
     
        ,
        newTextInput("dial", "")
        .settings.size(200,30)
        .settings.hidden()
        ,
        newText("dial input", "")
        .settings.after(getTextInput("dial"))
        ,
        newDropDown("dialect", "Bitte eine Option ausw&auml;hlen")
        .settings.log()
        .settings.add("Dialekt","(Gepflegtes) Hochdeutsch", "Beides")
        .settings.after(getText("dial input"))
        .settings.callback(
            getDropDown("dialect")
            .test.selected("Dialekt")
            .success(getTextInput("dial").settings.visible()
                     )
            .failure(getTextInput("dial").settings.hidden())
            .test.selected("Beides")
            .success(getTextInput("dial").settings.visible())
        )
        ,
         newCanvas("dialectcanvas", 1000, 60)
        .settings.add(0, 40, getText("dialect"))
        .settings.add(750,30, getDropDown("dialect"))
        .settings.center()
        .print()   
        ,
        newText("alltag", "<b>Was verwendest Du am meisten aktuell?</b> <br><small>(ggf. bitte Dialekt o.&Auml; angeben)</small>")
        .settings.css("font-size", "20px")
      
        ,
        newTextInput("allt", "")
        .settings.size(200,30)
        .settings.hidden()
        ,
        newText("allt input", "")
        .settings.after(getTextInput("allt"))
        ,
        newDropDown("alltag", "Bitte eine Option ausw&auml;hlen")
        .settings.log()
        .settings.add("Dialekt","Umgangssprache","(Gepflegtes) Hochdeutsch", "Sonstiges")
        .settings.after(getText("allt input"))
        .settings.callback(
            getDropDown("alltag")
            .test.selected("Dialekt")
            .success(getTextInput("allt").settings.visible())
            .failure(getTextInput("allt").settings.hidden())
            .test.selected("Beides")
            .success(getTextInput("allt").settings.visible())
            .test.selected("Sonstiges")
            .success(getTextInput("allt").settings.visible())
        )
        ,
         newCanvas("dialectcanvas", 1000, 50)
        .settings.add(0, 50, getText("alltag"))
        .settings.add(750,50, getDropDown("alltag"))
        .settings.center()
        .print()   
      
        
        ,
               
        newText("<p> ,<br>")
        .print()
               ,    
               newText("information", "<p>Bevor Du das Experiment startest, lies bitte die folgenden Dokumente"
                       +" <a href='https://amor.cms.hu-berlin.de/~plescaan/Master/DE_probanden_info_ONLINE.pdf' target='_blank' >Probanden-Informationsblatt</a> and"
                       +" <a href='https://amor.cms.hu-berlin.de/~plescaan//Master/DE_einverst%C3%A4ndnis_ONLINE.pdf' target='_blank'>Einwilligungserkl&auml;rung</a>.<p>")    
               .settings.css("font-size", "20px")
               ,
               newCanvas("infocanvastwo", 1000, 80)
               .settings.add(0, 0, getText("information") )
               .settings.center()
               .print()
               
               ,
               newText("consent", "Indem ich auf <b>Best&auml;tigen und Fortsetzen</b> clicke, erkl&auml;re ich, dass ich das Probanden-Informationsblatt und die Einwilligungserkl&auml;rung gelesen und verstanden habe.<p>")
               .settings.css("font-size", "15px")
               .settings.italic()  
               .settings.center()      
               .print()
               ,
               newButton("consent","Best&auml;tigen und Fortsetzen")
               .settings.center()
               .print()
               .wait()
               ,
               getDropDown("age")
               .test.selected()
               .success()
               .failure(
                   newText("ageerror","Bitte gib Dein Alter an.")
                   .settings.color("red")
                   .print())   
               ,
               getDropDown("sex")
               .test.selected()
               .success()
               .failure(
                   newText("sexerror","Bitte gib Dein Geschlecht an.")
                   .settings.color("red")
                   .print())
               ,
               getDropDown("language")
               .test.selected()
               .success()
               .failure(
                   newText("langerror","Bitte antworte auf die Frage bez&uuml;glich Deines sprachlichen Hintergrunds.")                   
                   .settings.color("red")
                   .print())      
               ,
                getDropDown("dialect")
               .test.selected()
               .success()
               .failure(
                   newText("dialecterr","Bitte antworte auf die Frage bez&uuml;glich Deines sprachlichen Hintergrunds")
                   .settings.color("red")
                   .print())
               ,
               getDropDown("alltag")
               .test.selected()
               .success()
               .failure(
                   newText("alltagerrr","Bitte antworte auf die Frage bez&uuml;glich Deines sprachlichen Hintergrunds")
                   .settings.color("red")
                   .print())
               ,
               getDropDown("domhand")
               .test.selected()
               .success()
               .failure(
                   newText("domhanderr","Bitte gebe Informationen &uuml;ber Deine dominante Hand an")
                   .settings.color("red")
                   .print())
               ,
               getDropDown("age").wait("first")
               ,
               getDropDown("sex").wait("first")
               ,
               getDropDown("language").wait("first")
               ,
               getDropDown("domhand").wait("first")
               ,
               getDropDown("dialect").wait("first")
               ,
               getDropDown("alltag").wait("first")
               
               ,
               getButton("consent")
               .remove()
               
               ,
               getText("consent")
               .remove()
               ,
               getCanvas("infocanvastwo")
               .remove()
               ,
               newText("<p>")
               .print()  
               ,
               // Create new variables from input
               newVar("IDage")
               .settings.global()
               .set( getDropDown("age") )
               ,
               newVar("IDsex")
               .settings.global()
               .set( getDropDown("sex") )
               ,
               newVar("IDling")
               .settings.global()
               .set( getDropDown("language") )
               ,
               newVar("whichL2")
               .settings.global()
               .set( getTextInput("L2") )
               ,
               newVar("IDdomhand")
               .settings.global()
               .set(getDropDown("domhand"))
               ,
               newVar("IDdialect")
               .settings.global()
               .set(getDropDown("dialect"))
               ,
                newVar("IDalltag")
               .settings.global()
               .set(getDropDown("alltag"))     
               ,
                    // set 'E' and 'I'  "X" "M" keys for condiditionals (accuracy)
               // set E key
               newVar("E_upperleft")
               .settings.global()
               .set( "E" )
              
               ,
               // set 'I' key; this is necessary for the conditional in the practice round (for feedback)
               newVar("I_upperright")
               .settings.global()
               .set( "I" ) // for F-version
              
               ,
               // set 'X' key; this is necessary for the conditional in the practice round (for feedback)
               newVar("x_lowerleft")
               .settings.global()
               .set( "X" ) // for F-version
               ,
               // set 'M' key; this is necessary for the conditional in the practice round (for feedback)
               newVar("M_lowerright")
               .settings.global()
               .set( "M" ) // for F-version
   
)
.log("age", getVar("IDage"))
.log("sex", getVar("IDsex"))
.log("L2", getVar("IDling"))
.log("dom_hand", getVar("IDdomhand"))
.log("IDdialect", getVar("IDdialect"))
.log("sprache_alltag", getVar("IDalltag"))

.setOption("countsForProgressBar", false)   // no need to see the progress bar in the intro phase
.setOption("hideProgressBar", true);



//*******************************************************************************************************************************************************************
// HOW TO BEHAVE & INSTRUCTIONS
//******************************************************************************************************************************************
PennController("instructions",

        newText("intro", "Vielen Dank f&uuml;r Deine Teilnahme an diesem Experiment! So leistest Du einen Beitrag zu einer Masterarbeit, sowie zur psycholinguistischen Forschung. Das folgende Experiment besteht aus 3 Teilen: eine kurze &Uuml;bungsrunde, das tats&auml;chliche Experiment und ein Post-Experiment Fragebogen. Insgesamt wird es ca. 20 Minuten in Anspruch nehmen (inkl. 4 Pausen je 1 Minute).")
        .settings.css("font-size", "20px")
        ,
               
        newText("Remember", "Bitte denke daran, dass Du dieses Experiment <b>nur auf Deinem PC/Laptop mit Mozilla Firefox oder Google Chrome durchf&uuml;hren kannst</b>. Dein Fenster sollte im <b>Vollbildmodus</b> sein.<br> <br> Dr&uuml;cke die <b>Leertaste um fortzufahren</b>...")
        .settings.css("font-size", "20px")     
        ,
        newCanvas("introc", 900, 450)
        .settings.add(40,0, getText("intro"))
        .settings.add(40,120, getText("Remember"))
        .settings.center()
        .print()
        
        ,        
        newKey("intro", " ")
        .wait()
        ,
        getCanvas("introc")
        .remove()
        ,
        newText("precau", "<p>Weil <b>dies ein Experiment ist,</b> w&uuml;rden wir es sehr sch&auml;tzen, wenn Du die folgenden Schritte unternehmen k&ouml;nntest, um Deine Konzentration zu gew&auml;hrleisten: <p><t>&nbsp;&nbsp;&nbsp;&bull; <b>schalte jegliche Musik/Audio aus</b>, die Du vielleicht h&ouml;rst<p>&nbsp;&nbsp;&nbsp;&bull; <b>verzichte darauf, w&auml;hrend des Experiments zu chatten</B> oder jede andere Handlung au&szlig;er des Experiments vorzunehmen<p><t>&nbsp;&nbsp;&nbsp;&bull; Stell Dein <b>Handy auf lautlos</b> und lass es mit dem Screen nach unten oder au&szlig;er Reichweite liegen<p><t>&nbsp;&nbsp;&nbsp;&bull; k&uuml;mmere Dich um das Experiment, bis es vorbei ist (es gibt kurze Pausen)<p><t>&nbsp;&nbsp;&nbsp;&bull; verhalte Dich generell so, als w&auml;rst Du in unserem Labor! <p>Diese Schritte werden dazu beitragen, dass die Daten, die wir von dir sammeln, von hoher Qualit&auml;t sind. Bitte <b>dr&uuml;cke die Leertaste</b>, wenn Du diesen Schritten zustimmst.")
        .settings.css("font-size", "20px")
        ,
        newCanvas("preccanvas",900, 450)
        .settings.add(20,0, getText("precau"))
        .settings.center()        
        .print()   
        ,
        newKey("set-up"," ")
        .wait()
        ,     
        getCanvas("preccanvas")
        .remove()
        ,
                 
         newText("instructions_a", "<b>Deine Aufgaben w&auml;hrend des Experiments:</b><p>"
                        + "In diesem Experiment wirst Du S&auml;tze &uuml;ber Menschen, Handlungen und Berufe lesen, sowie Bilder ausw&auml;len. Dabei wird die Verarbeitung sozialer Informationen w&auml;hrend des Sprachverstehens untersucht."
                        + "<p>(1) <b>Als erstes siehst Du einen Kontextsatz.</b> Lies ihn Wort f&uuml;r Wort, indem Du die Leertaste dr&uuml;ckst. "
                        + "<p>Sobald Du jeden Satzteil (Wort) gelesen hast, dr&uuml;cke die <b>Leertaste</b>, um den n&auml;chsten Satzteil zu enth&uuml;llen."
                        + "Wenn Du das Ende des Satzes erreicht hast, dr&uuml;cke erneut die Leertaste."
                        + "<p><b>Versuche die Leertaste erst dann zu dr&uuml;cken, wenn Du jeden Satzteil vollst&auml;ndig gelesen hast</b>. "
                        + " Bitte vermeide es, wiederholt die Leertaste zu dr&uuml;cken, um den Satz schneller zu lesen. Das widerspricht dem ganzen Sinn des Experiments. Danke!"
                        
                       )
                .settings.css("font-size", "20px")
               ,
                newText("bio_example", "e.g, <i>'_______ __________ _______ _____'</i>")
                .settings.css("font-size", "15px")
                .settings.css("font-family","courier")
                ,
                newText("bio_example1", "e.g, <i>'Elegant __________ _______ _____'</i>")
                .settings.css("font-size", "15px")
                .settings.css("font-family","courier")
                ,
                newText("bio_example2", "e.g, <i>'Elegant angezogen _______ _____  '</i>")
                .settings.css("font-size", "15px")
                .settings.css("font-family","courier")
                ,
                newText("bio_example3", "e.g, <i>'Elegant angezogen erkl&auml;rt _____ '</i>")
                .settings.css("font-size", "15px")
                .settings.css("font-family","courier")
                ,
                newText("bio_example4", "e.g, <i>'Elegant angezogen erkl&auml;rt Petra:'</i>")
                .settings.css("font-size", "15px")
                .settings.css("font-family","courier")

                ,
                
                newCanvas("instruccanvas",900, 450)
                .settings.add(20,0, getText("instructions_a"))
                .settings.add(30,420, getText("bio_example"))
                .settings.center()
                .print()   
                ,
                newKey("con"," ")
                .wait()
                ,
                getCanvas("instruccanvas")
                .remove( getText("bio_example"))
                .settings.add(30,420, getText("bio_example1"))
                .settings.center()
                .print()  
                ,
                newKey("con1"," ")
                .wait()
                ,
    
                getCanvas("instruccanvas")
                .remove(getText("bio_example1"))
                .settings.add(30,420, getText("bio_example2"))
                .settings.center()
                ,
                newKey("con2"," ")
                .wait()
                ,
                getCanvas("instruccanvas")
                .remove(getText("bio_example2"))
                .settings.add(30,420, getText("bio_example3"))
                .settings.center()
                
                ,
                newKey("con3"," ")
                .wait()
                ,
                getCanvas("instruccanvas")
                .remove(getText("bio_example3"))
                .settings.add(30,420, getText("bio_example4"))
                .settings.center()
               
                //,
                //getCanvas("instruccanvas")
               // .remove(getText("bio_example4"))
                ,
                newKey("instr_a", " ")
                .wait()
                ,
                getCanvas("instruccanvas")
                .remove(getText("instructions_a"))
                ,
                newText("instructions_b", "<p>(2)Du wirst einen <b> zweiten Satz </b> sehen, der eine Aktivit&auml;t beschreibt."
                 +"<p>Lies Dir den Satz durch, indem Du die Leertaste dr&uuml;ckst, um jeden Satzteil aufzudecken. Die Vorgehensweise ist die gleiche wie zuvor. Wenn Du das Ende des Satzes erreicht hast, dr&uuml;cke erneut die Leertaste." )
                .settings.css("font-size", "20px")
                .settings.center()
                ,
                newText("example",  "<p><i>'___ ____ _____ _____________ ____________'</i>")
                .settings.css("font-size", "15px")
                .settings.css("font-family","courier")
                ,
                newText("example1",  "<p><i>'Ich ____ _____ _____________ ____________'</i>")
                .settings.css("font-size", "15px")
                .settings.css("font-family","courier")
                ,
                newText("example2", "<p><i>'Ich esse _____ _____________ ____________'</i>")
                .settings.css("font-size", "15px")
                .settings.css("font-family","courier")
                ,
                newText("example3", "<p><i>'Ich esse jetzt _____________ ____________'</i>")
                .settings.css("font-size", "15px")
                .settings.css("font-family","courier")
                ,
                newText("example4", "<p><i>'Ich esse jetzt meinen Joghurt ____________'</i>")
                .settings.css("font-size", "15px")
                .settings.css("font-family","courier")
                ,
                newText("example5", "<p><i>'Ich esse jetzt meinen Joghurt in der K&uuml;che.'</i>")
                .settings.css("font-size", "15px")
                .settings.css("font-family","courier")
                ,
                getCanvas("instruccanvas")
                .settings.add(20,0, getText("instructions_b"))
                .settings.add(70,440, getText("example"))
                .print()  
                ,
                newKey("ex"," ")
                .wait()
                ,
                getCanvas("instruccanvas")
                .remove(getText("example"))
                .settings.add(70,440, getText("example1"))
                ,
                newKey("ex1"," ")
                .wait()
                ,
                getCanvas("instruccanvas")
                .remove(getText("example1"))
                .settings.add(70,440, getText("example2"))
                .print()  
                ,                
                newKey("ex2"," ")
                .wait()
                ,
                getCanvas("instruccanvas")
                .remove(getText("example2"))
                .settings.add(70,440, getText("example3"))
                .print()  
                 ,                
                newKey("ex3"," ")
                .wait()
                ,
                getCanvas("instruccanvas")
                .remove(getText("example3"))
                .settings.add(70,440, getText("example4"))
                .print()  
                ,
      
                newKey("ex4"," ")
                .wait()
                ,
                getCanvas("instruccanvas")
                .remove(getText("example4"))
                .settings.add(70,440, getText("example5"))
                .print()  
                ,                

                newKey("instr_c", " ")
                .wait()
                ,
                getCanvas("instruccanvas")
                .remove(getText("instructions_b"))
                .remove(getText("example5"))
                .remove(getText("bio_example4"))
                ,
                newText("instructions_c", "<p>(3) Nachdem Du diesen Satz zu Ende gelesen hast, wirst Du vier Bilder sehen."
                        + " Deine n&auml;chste Aufgabe ist es, das Bild zu w&auml;hlen, das am besten zu dem letzten Satz passt, den Du gelesen hast."
                        + " Bei der Bildauswahlaufgabe bitten wir Dich: <ul><li>den <b>rechten Zeigefinger auf die Taste E</b> zu legen -> Dr&uuml;cke auf <b>'E'</b> f&uuml;r das Bild <i>oben links</i> </li> <li>den <b>rechten Daumen auf die Taste X </b>zu legen. -> Dr&uuml;cke auf <b>'X'</b>  f&uuml;r das Bild <i>unten links</i>.</li>"
                        + " <li>den <b>linken Zeigefinger auf die Taste I</b> zu legen. -> Dr&uuml;cke auf <b>'I'</b> f&uuml;r das Bild <i>oben rechts</i> </li> <li>den <b>linken Daumen auf die Taste M </b> zu legen. -> Dr&uuml;cke auf <b>'M'</b>  f&uuml;r das Bild <i>unten rechts</i>.</li> </ul>"
                      )
                .settings.css("font-size", "20px")
                .settings.center()
                ,
                //getCanvas("instruccanvas", 1500, 900)
                //.settings.add(20,0, getText("instructions_c"))
                //.print()  
                //,
                
                newImage("instructions_fingers", "instructions.jpg")
                .settings.size(400,400)
                
                ,
                newText("additional_fing_instr", "Dr&uuml;cke die <b>Leertaste</b> f&uuml;r weitere Anleitungen")
                .settings.css("font-size", "20px")
                .settings.center()
                ,
                getCanvas("instruccanvas")
                .settings.add(20,0, getText("instructions_c"))
                .settings.add (200,200, getImage("instructions_fingers"))
                .settings.add (220,600, getText("additional_fing_instr"))
                .print()
                ,
                newKey("next_instructions"," ")
                .wait()       
               ,
               getCanvas("instruccanvas")
                .remove(getText("instructions_c"))
                .remove(getImage("instructions_fingers"))
                .remove(getText("additional_fing_instr"))
               ,
               newText("last_instructions", "Es ist sehr wichtig, die folgenden Tatsachen zu beachten:"
                  +"<ul><li>W&auml;hrend des Experiments werden die S&auml;tze jedoch verschwinden, bevor Du eine Bildauswahl treffen kannst, also beachte dies, wenn Du das Ende der S&auml;tze erreichst.</li>"
                 + "<li><p>Sobald Du Deine Entscheidung getroffen hast, f&auml;hrst Du mit dem n&auml;chsten Satz fort.</li>"        
                 + "<li>Du hast nur ein paar Sekunden Zeit, um diese Auswahl zu treffen, sonst l&auml;uft die Zeit ab.</li></ul>"
                 + "<br><x-large>Als n&auml;chstes kommt eine kurze <b>&Uuml;bungsrunde</b>.Wenn Du bereit bist, das Experiment zu starten, dr&uuml;cke die <b>Leertaste</b>.</x-large>")
               .settings.css("font-size", "20px")
               .settings.center()
               ,
               getCanvas("instruccanvas")
               .settings.add(20,0, getText("last_instructions"))
               ,
               newKey("begin"," ")
                .wait()
              ,
              getCanvas("instruccanvas")
              .remove(getText("last_instructions"))
              ,
              newTimer("30_before_exp", 3000)
              .start()
              .wait()
              
              );
//*******************************************************************************************************************************************************************
// PRACTICE ITEMS
//******************************************************************************************************************************************

PennController.Template( PennController.GetTable("master_spr1_short.csv")
                         .filter("type" , "practice")
                         ,  
                         variable => ["practice",
                                      "PennController", PennController(
                                       fullscreen()
                                       ,
                                       defaultText
                                       .settings.css("font-family","courier")
                                       ,
                                       // dots
                                       newText("start", "...")
                                       .print(50,240)
                                       ,
                                       newTimer("start", 500)
                                       .start()
                                       .wait()
                                       ,
                                       getText("start")
                                       .remove()
                                       ,
                                       // context sentence
                                       newText ("read_ctxt","<i>Lies bitte den Kontextsatz und dr&uuml;cke die Leertaste um fortzufahren</i>")
                                      .settings.css("font-size", "15px")
                                      .settings.center()
                                      .settings.css("font-family","times new roman")
                                      .settings.color("red")
                                      .print(50,200)
                                          
                                      ,
                                      
                                      // context sentence in SPR
                                      cumulative_ctxt(variable.context, "remove")
    
                                      
                                      ,
                                      getText("read_ctxt") //add full context sentence again because it was removed after using the cumulative_ctxt function
                                      .remove()
                                      ,
                                      newText("ctxt", variable.context_norm) // prints the context sentence again
                                      .print()
                                      .settings.css("font-size", "25px")
                                      .settings.css("font-family","courier")
                                      .print(50,240)
                                      ,
                                      newText ("read_crit","<i>Dr&uuml;cke die Leertaste um den n&auml;chsten Satz zu enth&uuml;llen.</i>")
                                      .settings.css("font-size", "15px")
                                      .settings.center()
                                      .settings.css("font-family","times new roman")
                                      .settings.color("red")
                                      .print(50,300)
                                      ,
                                      
                                      //critical sentence
                                      cumulative_crit(variable.critical, "remove")    
                                      ,
                                      // clear ctxt and crit sentences
                                      getText("read_crit")
                                      .remove()
                                      ,
                                      getText("ctxt")
                                      .remove()         
                                      ,
                                      //introducing pictures
                                      newText("sentence", variable.sentence)
                                      .settings.center()
                                      .settings.css("font-size", "large")
                                      .settings.css("font-weight", "bold")
                                      .print()
                                     ,
                                     defaultImage
                                     .size(250,250)
     
                                     ,
                                     newText("frame1", "Dr&uuml;cke auf <b>E</b> f&uuml;r das Bild <b>oben links</b>")
                                    .settings.css("font-size", "18px").settings.color("red")
                                    .print("right at 43vw","bottom at 25vh")

                                     ,
                                     newText("frame2", "Dr&uuml;cke auf <b>I</b> f&uuml;r das Bild <b>oben rechts</b>")
                                    .settings.css("font-size", "18px").settings.color("red")
                                    .print("left at 57vw","bottom at 25vh")

                                     ,
                                     newText("frame3", "Dr&uuml;cke auf <b>X</b> f&uuml;r das Bild <b>unten links</b>")
                                    .settings.css("font-size", "18px").settings.color("red")
                                    .print("right at 43vw","top at 58vh")

                                     ,
                                     newText("frame4", "Dr&uuml;cke auf <b>M</b> f&uuml;r das Bild <b>unten rechts</b>")
                                    .settings.css("font-size", "18px").settings.color("red")
                                    .print("left at 57vw","top at 58vh")

                                     ,
                                     newTimer("WaitForPhotos",1800)
                                     .start()
                                     .log()
                                     .wait("first")
                                     ,
                                     newImage("picture1", variable.picture1).css("border", "solid 1px black").print("right at 39vw","bottom at 55vh")
                                     ,
                                     newImage("picture2", variable.picture2).css("border", "solid 1px black").print("left at 62vw","bottom at 55vh")
                                     ,
                                     newImage("picture3", variable.picture3).css("border", "solid 1px black").print("right at 39vw","top at 62vh")
                                     ,
                                     newImage("picture4", variable.picture4).css("border", "solid 1px black").print("left at 62vw","top at 62vh")
                                     //,
                                     
    
                                 /*   newTooltip("E", "Dr&uuml;cke auf <i> E</i> f&uuml;r das Bild <i> oben links</i>")
                                    .position("middle left")
                                    .size(55,110)
                                    .print( getImage("picture1") )
                                    
                                     ,
                                    newTooltip("I", "Dr&uuml;cke auf <i> I</i> f&uuml;r das Bild <i> oben rechts</i>")
                                    .position("middle right")
                                    .size(55,110)
                                    .print( getImage("picture2") )
                                   
                                     ,
                                    newTooltip("X", "Dr&uuml;cke auf <i> X</i> f&uuml;r das Bild <i> unten links</i>")
                                    .position("middle left")
                                    .size(55,110)
                                    .print( getImage("picture3") )
                                   
                                     ,
                                     newTooltip("M", "Dr&uuml;cke auf <i> M</i> f&uuml;r das Bild <i> unten rechts </i>")
                                    .position("middle right")
                                    .size(55,110)
                                    .print( getImage("picture4") )
                                  
                                    */,
                                      newTimer("timeout", 5000)
                                      .start()
                                       
                                      ,
                                     newSelector("shapes")
                                     .disableClicks()
                                     .once()
                                     .add(getImage("picture1") , getImage("picture2"), getImage("picture3"), getImage("picture4") )
                                     .shuffle()
                                     .keys(            "E"           ,        "I"     ,         "X"         ,         "M"          )
                                     .log()                                 
                                      .callback(getTimer("timeout").stop())

                                     ,
                                     getTimer("timeout")
                                     .wait()
                                     ,
                                     newVar("selection")
                                     .set(getSelector("shapes"))
                                     , //check if the timer timed out
                                     getSelector("shapes")
                                     .test.selected()
                                     .failure(
                                       getSelector("shapes")
                                       .remove()
                                       ,
                                       getText("sentence")
                                       .remove()
                                       ,
                                       getText("frame1")
                                       .remove()
                                       ,
                                       getText("frame2")
                                       .remove()
                                       ,
                                       getText("frame3")
                                       .remove()
                                       ,
                                       getText("frame4")
                                       .remove()
                                       ,
                                       getImage("picture1")
                                       .remove()
                                       ,
                                       getImage("picture2")
                                       .remove()
                                       ,
                                       getImage("picture3")
                                       .remove()
                                       ,
                                       getImage("picture4")
                                       .remove()
                                       ,
                                       newText("timedout","Die Zeit ist um! Sei bitte schneller!")
                                      .settings.css("font-size", "25px")
                                      .settings.css("font-family","courier")
                                      .settings.color("red")
                                      .settings.center()
                                      .print("right at 66vw", "top at 45vh" )
                                      ,
                                      
                                      newText("continue", "<i>Dr&uuml;cke die Leertaste um fortzufahren</i>")
                                      .settings.css("font-size", "25px")
                                      .settings.css("font-family","courier")
                                      .print("right at 65vw", "top at 65vh" )
                                      ,
                                      newKey("Continue", " ")
                                      .wait()
                                      .log()
                                     )
                                     .success(
                                      newText("continue", "<i>Dr&uuml;cke die Leertaste um fortzufahren</i>")
                                      .print("right at 61vw", "top at 95vh" )
                                      ,
                                      newKey("Continue", " ")
                                      .wait()
                                      .log()
                                     )
                                     ,
                                     
                                     getSelector("shapes")
                                     .remove()
                                     ,
                                      getText("sentence")
                                     .remove()
                                     
                                      )
                                      
                                      //log stuff
                                      
                                     ]
                         
                        );


//*******************************************************************************************************************************************************************
// END of PRACTICE
//******************************************************************************************************************************************
PennController( "end_practice" ,
                 
                newText("end_practice", "<p> <i>Das ist das Ende der &Uuml;bungsphase! Das Experiment beginnt, sobald Du die Leertaste dr&uuml;ckst!</i> </p>")
                         .settings.css("font-family","times new roman") .settings.css("font-size", "25px")
                         .settings.center()
                         .print()

                ,
                
                newKey("end_pract", " ")
                .wait()
                .log()
                ,  
               
                getText("end_practice")
                .remove()
                          
               )   
    
 

    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);



//*******************************************************************************************************************************************************************
// EXPERIMENTAL TRIALS : CRITICALS + FILLERS (already pseudo-randomized) //
//******************************************************************************************************************************************


PennController.Template( PennController.GetTable("master_spr1_short.csv")
                         .filter("type" , (/^(critical|filler)$/))
                         ,  
                         variable => ["experiment_trial",
                                      "PennController", PennController(
                                       defaultText
                                       .settings.css("font-family","courier")
                                       ,
                                       // dots
                                       newText("start", "...")
                                       .print(50,240)
                                       ,
                                       newTimer("start", 500)
                                       .start()
                                       .wait()
                                       ,
                                       getText("start")
                                       .remove()
                                      ,
                                      
                                      // context sentence in SPR
                                      cumulative_ctxt(variable.context, "remove")
                                      
                                      ,
                                    
                                      newText("ctxt", variable.context_norm) // prints the context sentence again
                                      .print()
                                      .settings.css("font-size", "25px")
                                      .settings.css("font-family","courier")
                                      .print(50,240)
                                      ,
                                   
                                      
                                      //critical sentence
                                      cumulative_crit(variable.critical, "remove")    
                                 
                                      ,
                                      getText("ctxt")
                                      .remove()         
                                      ,
                                      //introducing pictures
                                      newText("sentence", variable.sentence)
                                      .settings.center()
                                      .settings.css("font-size", "large")
                                      .settings.css("font-weight", "bold")
                                      .print()
                                     ,
                                     defaultImage
                                     .size(220,220)
     
                                     ,
                                     newImage("picture1", variable.picture1).css("border", "solid 1px black").print("right at 45vw","bottom at 55vh")
                                     ,
                                     newImage("picture2", variable.picture2).css("border", "solid 1px black").print("left at 55vw","bottom at 55vh")
                                     ,
                                     newImage("picture3", variable.picture3).css("border", "solid 1px black").print("right at 45vw","top at 62vh")
                                     ,
                                     newImage("picture4", variable.picture4).css("border", "solid 1px black").print("left at 55vw","top at 62vh")
                                     ,
                                     newTimer("timeout", 5000)
                                     .start()
                                       
                                      ,
                                     newSelector("shapes")
                                     .disableClicks()
                                     .once()
                                     .add(getImage("picture1") , getImage("picture2"), getImage("picture3"), getImage("picture4") )
                                     .shuffle()
                                     .keys(            "E"           ,        "I"     ,         "X"         ,         "M"          )
                                     .log()                                 
                                      .callback(getTimer("timeout").stop())

                                     ,
                                     getTimer("timeout")
                                     .wait()
                                     ,
                                     newVar("selection")
                                     .set(getSelector("shapes"))
                                     , //check if the timer timed out
                                     getSelector("shapes")
                                     .test.selected()
                                     .failure(
                                       getSelector("shapes")
                                       .remove()
                                       ,
                                       getText("sentence")
                                       .remove()
                                       ,
                                       getImage("picture1")
                                       .remove()
                                       ,
                                       getImage("picture2")
                                       .remove()
                                       ,
                                       getImage("picture3")
                                       .remove()
                                       ,
                                       getImage("picture4")
                                       .remove()
                                       ,
                                       newText("timedout","Die Zeit ist um! Sei bitte schneller!")
                                      .settings.css("font-size", "25px")
                                      .settings.css("font-family","courier")
                                      .settings.color("red")
                                      .settings.center()
                                      .print("right at 66vw", "top at 45vh" )
                                      ,
                                      
                                      newText("continue", "<i>Dr&uuml;cke die Leertaste um fortzufahren</i>")
                                      .settings.css("font-size", "25px")
                                      .settings.css("font-family","courier")
                                      .print("right at 65vw", "top at 65vh" )
                                      ,
                                      newKey("Continue", " ")
                                      .wait()
                                      .log()
                                     )
                                     .success(
                                      newText("continue", "<i>Dr&uuml;cke die Leertaste um fortzufahren</i>")
                                      .print("right at 61vw", "top at 95vh" )
                                      ,
                                      newKey("Continue", " ")
                                      .wait()
                                      .log()
                                     ),
                                     
                                     getSelector("shapes")
                                     .remove()
                                     ,
                                      getText("sentence")
                                     .remove()
                                      )
                                      
                                     .log("item_number",variable.item_no)
                                     .log("item_id", variable.item_id)
                                     .log("type", variable.type)
                                     .log("condition",variable.condition)
                                     .log("social_context",variable.social_context)
                                     .log("target_register",variable.target_context)
                                     .log("register_match",variable.register_match)
                                     .log("grammatical",variable.grammatical)
                                     .log("expset", variable.expset)
                                      
                                      
                                     ]
                         
                        );



//*******************************************************************************************************************************************************************
// TAKE A BREAK - 1/3
//******************************************************************************************************************************************
PennController( "break1" ,
               
                newText("break_text", "<p><b>Zeit f&uuml;r die erste Pause!</b><br><p>Sie dauert etwa 1 Minute, aber wenn Du sie &uuml;berspringen oder fr&uuml;her beenden m&ouml;chtest, <b>dr&uuml;cke auf die Leertaste</b></p>Es wird empfohlen, diese Zeit zu nutzen, um Dich ein wenig zu entspannen.Wir bedanken uns bei Dir f&uuml;r Deine Aufmerksamkeit und Geduld!")
                .settings.css("font-size", "20px")
                .settings.center()
                .print()    
                ,
           
                newTimer("break_timer", 60000)
                .start()                
                ,
                newKey("continue_exp", " ")                 
                .callback( getTimer("break_timer").stop() )   
                ,
                getTimer("break_timer")
                .wait("first")
                ,
                getText("break_text")
                .remove()                
                ,

                getKey("continue_exp")
                .remove()   
                ,
                newText("continue_exp_final", "Lege bitte Deine Finger auf die Tastatur, so wie es in der Anleitung beschrieben wurde. Das Bild unten dient als Erinnerung."
                        +" Lies jeden Satz, indem Du auf die Leertaste dr&uuml;ckst. Dr&uuml;cke nicht auf die Leertaste, bevor Du den jeweiligen Satzteil fertiggelesen hast.<br>"
                        +"<br><br>W&auml;hle die Bilder aus, idem du auf die Tasten :<ul><li><b>E </b> (<i>f&uuml;r das Bild oben links</>),</li> <li><b>X </b>(<i>f&uuml;r das Bild unten links</>),</li><li> <b>I </b>(<i>f&uuml;r das Bild oben rechts</>),</li> <li><b>M </b> (<i>f&uuml;r das Bild unten rechts </>) dr&uuml;ckst.</li></ul>"
                        +"<br><br><br><br>Dr&uuml;cke die <b>Leertaste</b>, um das Experiment zu starten."
                       )
               .settings.css("font-size", "20px")
               .settings.center()  
                ,
                newImage("instr", "instructions.jpg")
                .settings.size(400,400)
                ,
                newCanvas("pre_end_break", 900, 600)
                .settings.add(40, 20, getText("continue_exp_final"))
                .settings.add(500, 65, getImage("instr"))
                .settings.center()
                .print()
                ,
                newKey("end_break", " ")
                .wait()
                .log()              
                ,
                getCanvas("pre_end_break")
                .remove(getText("continue_exp_final"))
                .remove(getImage("instr"))
                ,
                newTimer(5000)
                .start()
                .wait()             
               )   
    
    .log("type", "break")
   

    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//*******************************************************************************************************************************************************************
// TAKE A BREAK 2/3
//******************************************************************************************************************************************
PennController( "break2" ,
                
                
                newText("break_text", "<p><b>Zeit f&uuml;r die zweite Pause!</b><br><p>Sie dauert etwa 1 Minute, aber wenn Du sie &uuml;berspringen oder fr&uuml;her beenden m&ouml;chtest, <b>dr&uuml;cke auf die Leertaste</b></p>Es wird empfohlen, diese Zeit zu nutzen, um Dich ein wenig zu entspannen.Wir bedanken uns bei Dir f&uuml;r Deine Aufmerksamkeit und Geduld!")
                .settings.css("font-size", "20px")
                .settings.center()
                .print()    
                ,
     
                newTimer("break_timer", 60000)
                .start()                
                ,
                newKey("continue_exp", " ")                 
                .callback( getTimer("break_timer").stop() )   
                ,
                getTimer("break_timer")
                .wait("first")
                ,
                getText("break_text")
                .remove()                
                ,

                getKey("continue_exp")
                .remove()   
                ,
                newText("continue_exp_final", "Lege bitte Deine Finger auf die Tastatur, so wie es in der Anleitung beschrieben wurde. Das Bild unten dient als Erinnerung."
                        +" Lies jeden Satz, indem Du auf die Leertaste dr&uuml;ckst. Dr&uuml;cke nicht auf die Leertaste, bevor Du den jeweiligen Satzteil fertiggelesen hast.<br>"
                        +"<br><br>W&auml;hle die Bilder aus, idem du auf die Tasten :<ul><li><b>E </b> (<i>f&uuml;r das Bild oben links</>),</li> <li><b>X </b>(<i>f&uuml;r das Bild unten links</>),</li><li> <b>I </b>(<i>f&uuml;r das Bild oben rechts</>),</li> <li><b>M </b> (<i>f&uuml;r das Bild unten rechts </>) dr&uuml;ckst.</li></ul>"
                        +"<br><br><br><br>Dr&uuml;cke die <b>Leertaste</b>, um das Experiment zu starten."
                       )
               .settings.css("font-size", "20px")
               .settings.center()  
                ,
                newImage("instr", "instructions.jpg")
                .settings.size(400,400)
                ,
                newCanvas("pre_end_break", 900, 600)
                .settings.add(40, 20, getText("continue_exp_final"))
                .settings.add(500, 65, getImage("instr"))
                .settings.center()
                .print()
                ,
                newKey("end_break", " ")
                .wait()
                .log()              
                ,
                getCanvas("pre_end_break")
                .remove(getText("continue_exp_final"))
                .remove(getImage("instr"))
                ,
                newTimer(5000)
                .start()
                .wait()                 
               )   
    
    .log("type", "break")
     

    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//*******************************************************************************************************************************************************************
// TAKE A BREAK 3/3
//******************************************************************************************************************************************
PennController( "break3" ,
                
               
                newText("break_text", "<p><b>Zeit f&uuml;r die letzte Pause!</b><br><p>Sie dauert etwa 1 Minute, aber wenn Du sie &uuml;berspringen oder fr&uuml;her beenden m&ouml;chtest, <b>dr&uuml;cke auf die Leertaste</b></p>Es wird empfohlen, diese Zeit zu nutzen, um Dich ein wenig zu entspannen.Wir bedanken uns bei Dir f&uuml;r Deine Aufmerksamkeit und Geduld!")
                .settings.css("font-size", "20px")
                .settings.center()
                .print()    
                ,
                 newTimer("break_timer", 60000)
                .start()                
                ,
                newKey("continue_exp", " ")                 
                .callback( getTimer("break_timer").stop() )   
                ,
                getTimer("break_timer")
                .wait("first")
                ,
                getText("break_text")
                .remove()                
                ,

                getKey("continue_exp")
                .remove()   
                ,
                newText("continue_exp_final", "Lege bitte Deine Finger auf die Tastatur, so wie es in der Anleitung beschrieben wurde. Das Bild unten dient als Erinnerung."
                        +" Lies jeden Satz, indem Du auf die Leertaste dr&uuml;ckst. Dr&uuml;cke nicht auf die Leertaste, bevor Du den jeweiligen Satzteil fertiggelesen hast.<br>"
                        +"<br><br>W&auml;hle die Bilder aus, idem du auf die Tasten :<ul><li><b>E </b> (<i>f&uuml;r das Bild oben links</>),</li> <li><b>X </b>(<i>f&uuml;r das Bild unten links</>),</li><li> <b>I </b>(<i>f&uuml;r das Bild oben rechts</>),</li> <li><b>M </b> (<i>f&uuml;r das Bild unten rechts </>) dr&uuml;ckst.</li></ul>"
                        +"<br><br><br><br>Dr&uuml;cke die <b>Leertaste</b>, um das Experiment zu starten."
                       )
               .settings.css("font-size", "20px")
               .settings.center()  
                ,
                newImage("instr", "instructions.jpg")
                .settings.size(400,400)
                ,
                newCanvas("pre_end_break", 900, 600)
                .settings.add(40, 20, getText("continue_exp_final"))
                .settings.add(500, 65, getImage("instr"))
                .settings.center()
                .print()
                ,
                newKey("end_break", " ")
                .wait()
                .log()              
                ,
                getCanvas("pre_end_break")
                .remove(getText("continue_exp_final"))
                .remove(getImage("instr"))
                ,
                newTimer(5000)
                .start()
                .wait()                   
               )   
    
    .log("type", "break")
    

    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//*******************************************************************************************************************************************************************
// End of Experiment
//******************************************************************************************************************************************
PennController( "end_exp" ,
                 newText("end_exp","<p> Das ist das Ende der Experimentphase! Als n&auml;chstes kommt einen kurzen Post-Experiment Fragebogen. </p>")
                         .settings.css("font-family","times new roman") .settings.css("font-size", "25px")
                         .settings.center()
                         .print()

                ,
                
                newKey("end_exp", " ")
                .wait()
                .log()
                ,  
                
                getText("end_exp")
                .remove()
                           
               )   
    
 

    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);
//*******************************************************************************************************************************************************************
// POST EXPERIMENT QUESTIONNAIRE
//******************************************************************************************************************************************

PennController("post-ques",
               newText("post-instruc", "Wir m&ouml;chten Dich darum bitten, noch ein Paar Fragen zum Experiment zu beantworten. <br>Deine Antworten sollten kurz, aber informativ sein.<p><p>")
               .settings.center()
               .settings.bold()
               .print()
               ,
               // Q1
               newText("notice", "1. Gibt es etwas, das Dir w&auml;hrend des Experimentes aufgefallen ist? (Irgendwelches Muster/Regelm&auml;&szlig;igkeiten/etwas Seltsames oder &Uuml;berrrachendes)")
               .settings.center()
               .print()
              
               ,
               newTextInput("notice")
               .size(600,50)
               .settings.center()
               .print()
               .log()
               ,
               newText("blank", "<p>")
               .settings.center()
               .print()
               ,
               newButton("next1", "N&auml;chste Frage")
               .settings.center()
               .print()
               .wait()
               ,
               getButton("next1")
               .remove()
               ,
               // Q2
               newText("about", "2. K&ouml;nntest Du erraten, worum es bei dem Experiment ging?")
               .settings.center()
               .print()
               ,
               newTextInput("about")
               .size(600, 50)
               .settings.center()
               .print()
               .log()
               ,   
               newText("blank", "<p>")
               .settings.center()
               .print()
               ,            
               newButton("next2", "N&auml;chste Frage")
               .settings.center()
               .print()
               .wait()
               ,
               getButton("next2")
               .remove()
               ,
               //Q3
               newText("hard", "3. Gab es etwas besonders Schwieriges an dem Experiment?")
               .settings.center()
               .print()
               ,
               newTextInput("hard","")
               .size(600, 50)
               .settings.center()
               .print()
               .log()
               ,     
               newText("blank", "<p>")
               .print()
               ,            
               newButton("next3", "N&auml;chste Frage")
               .settings.center()
               .print()
               .wait()
               ,
               getButton("next3")
               .remove()
               ,
               // Q4
               newText("strategy", "4. Hast Du w&auml;hrend des Experiments irgendwelche Strategien entwickelt? Wenn ja, bitte erl&auml;utern.")
               .settings.center()
               .print()
               ,
               newTextInput("strategy","")
               .size(600, 50)
               .settings.center()
               .print()
               .log()
               ,   
               newText("blank", "<p>")
               .print()
               ,              
               newButton("next4", "Fertig!")
               .settings.center()
               .print()
               .wait()
               ,
               // create Vars
               newVar("notice") // this will create a new variable "ID"; MUST be after the 'Start' button click
               .settings.global()
               .set(getTextInput("notice") )
               ,
               newVar("about") // this will create a new variable "ID"; MUST be after the 'Start' button click
               .settings.global()
               .set(getTextInput("about") )
               ,
               newVar("hard") // this will create a new variable "ID"; MUST be after the 'Start' button click
               .settings.global()
               .set(getTextInput("hard") )
               ,
               newVar("strategy") // this will create a new variable "ID"; MUST be after the 'Start' button click
               .settings.global()
               .set(getTextInput("strategy") )
              )
    
//*******************************************************************************************************************************************************************
// SEND THE RESULTS TO THE SERVER
//******************************************************************************************************************************************
                            
    PennController.SendResults( "send" ); // send results to the server before participants see the actual end of the experiment
                            
                            
//*******************************************************************************************************************************************************************
// THKS & BYE
//******************************************************************************************************************************************                      
                            
  PennController.Template(PennController.GetTable( "validation.csv")// change this line for the appropriate experimental list
                          ,
                         variable => PennController( "final"
                         ,
                         
                         newText("<p> Das ist das Ende des Experimentes. Vielen Dank f&uuml;r Deine Teilnahme! </p>")
                         .settings.css("font-family","times new roman") .settings.css("font-size", "18px")
                         .settings.center()
                         .print()
                         ,
                         newText ("<p>Bitte kopiere den folgenden Code und gebe ihn in dem Clickworker-Formular ein, um Deine Teilnahme zu best&auml;tigen und die Bezahlung zu erhalten: </p>")
                         .settings.css("font-family","times new roman") .settings.css("font-size", "18px")
                         .settings.center()
                         .print()
                         ,
                         newText ("<p>Wichtig: Behandle diesen Code vertraulich und gebe ihn nicht an einer anderen Person weiter! </p>")
                         .settings.css("font-family","times new roman") .settings.css("font-size", "18px")
                         .settings.center()
                         .print()
                         ,
                         newText ("<p><b>"+variable.val_code+".</b></p>")
                         .settings.css("font-family","times new roman") .settings.css("font-size", "30px")
                         .settings.center()
                         .print()
                         ,
                         
        
                        newButton("void")
                         .wait()                            
                                                  
                         )   
                        .setOption("countsForProgressBar", false)    //overrides some default settings, such as countsForProgressBar
                        .setOption("hideProgressBar", true)
                            );




