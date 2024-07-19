//https://www.ncbi.nlm.nih.gov/pmc/articles/doi/10.3389/fpsyg.2014.00399/full// Returns a random integer between min (included) and max (excluded)


/*
Global variables

fixactionCrossTime: how much time (ms) should the fixation cross be presented
crossStimTime: how much time (ms) should pass between the fixation cross and the
  onset of the visually presented stimulus
stimCrossTime: how much time (ms) should pass between the stimulus and the next trial

If you want any of these times to differ for each trial, turn this into a function
and then call on the function in the script below
*/

fixationCrossTime = 500
crossStimTime = 100
stimCrossTime = 1000

/*

Group condition = determines which group in the latin square participant is in

stim_condition = determines which of experimental conditions stim appears in
- ident_a  = foca --> foca
- ident_o  = foco --> foco
- stem_a   = foco --> foca
- stem_o   = foca --> foco
- gender_a = lira --> foca
- gender_o = jugo --> foco
*/

group_condition = 1


/*

This function is super clunky.

INput: nothing
output: array of all words and nonwords as dictionaries

This function takes in the group that this participant is in
 and returns stimuli for each condition according to the
 latin square design. See XXX.csv for details of which
 condition each stimulus is added to.
*/
function make_stims_per_condition() {

  /*
  define the condition for every stem.
  e.g. the stems associated with "id 1" will fall into the
    ident_o condition if participant is part of group 1,
    gender_o and gender_a condition if participant is part of group 2,
    stem_a condition if part of group 3, etc.
  */

  if (group_condition == 1) {
    ident_o_array = [1, 6, 11, 16, 21, 26, 31, 36, 41];
    ident_a_array = [2, 7, 12, 17, 22, 27, 32, 37, 42];
    stem_o_array = [3, 8, 13, 18, 23, 28, 33, 38];
    stem_a_array = [4, 9, 14, 19, 24, 29, 34, 39];
    gender_array = [5, 10, 15, 20, 25, 30, 35, 40];
  } else if (group_condition == 2) {
    ident_o_array = [2, 7, 12, 17, 22, 27, 32, 37, 42];
    ident_a_array = [3, 8, 13, 18, 23, 28, 33, 38];
    stem_o_array = [4, 9, 14, 19, 24, 29, 34, 39];
    stem_a_array = [4, 9, 14, 19, 24, 29, 34, 39];
    gender_array = [1, 6, 11, 16, 21, 26, 31, 36, 41];
  } else if (group_condition == 3) {
    ident_o_array = [3, 8, 13, 18, 23, 28, 33, 38];
    ident_a_array = [4, 9, 14, 19, 24, 29, 34, 39];
    stem_o_array = [5, 10, 15, 20, 25, 30, 35, 40];
    stem_a_array = [1, 6, 11, 16, 21, 26, 31, 36, 41];
    gender_array = [2, 7, 12, 17, 22, 27, 32, 37, 42];
  } else if (group_condition == 4) {
    ident_o_array = [4, 9, 14, 19, 24, 29, 34, 39];
    ident_a_array = [5, 10, 15, 20, 25, 30, 35, 40];
    stem_o_array = [1, 6, 11, 16, 21, 26, 31, 36, 41];
    stem_a_array = [2, 7, 12, 17, 22, 27, 32, 37, 42];
    gender_array = [3, 8, 13, 18, 23, 28, 33, 38];
  } else if (group_condition == 5) {
    ident_o_array = [5, 10, 15, 20, 25, 30, 35, 40];
    ident_a_array = [1, 6, 11, 16, 21, 26, 31, 36, 41];
    stem_o_array = [2, 7, 12, 17, 22, 27, 32, 37, 42];
    stem_a_array = [3, 8, 13, 18, 23, 28, 33, 38];
    gender_array = [4, 9, 14, 19, 24, 29, 34, 39];
  }

  all_stims = [];

  master_stims = allStimuli;

  // Iterate through each stimulus
  for (var i = 0; i < master_stims.length; i++) {

    // check which condition this stimulus belongs to ass assgined
    // by group. Then add the stimulus accordingly.
    if (ident_o_array.includes(master_stims[i].id)) {
      // ident_o
      all_stims.push({id: master_stims[i].id,
                              prime: master_stims[i].target_o,
                              target: master_stims[i].target_o,
                              condition: "ident_o"});
    } else if (ident_a_array.includes(master_stims[i].id)) {
      // ident_a
      all_stims.push({id: master_stims[i].id,
                              prime: master_stims[i].target_a,
                              target: master_stims[i].target_a,
                              condition: "ident_a"});
    } else if  (stem_o_array.includes(master_stims[i].id)) {
      // stem_o
      all_stims.push({id: master_stims[i].id,
                              prime: master_stims[i].target_a,
                              target: master_stims[i].target_o,
                              condition: "stem_o"});
    } else if  (stem_a_array.includes(master_stims[i].id)) {
      // stem_a
      all_stims.push({id: master_stims[i].id,
                              prime: master_stims[i].target_o,
                              target: master_stims[i].target_a,
                              condition: "stem_a"});
    } else {
      // gender_a and gender_o
      all_stims.push({id: master_stims[i].id,
                              prime: master_stims[i].control_o,
                              target: master_stims[i].target_o,
                              condition: "gender_o"});
      all_stims.push({id: master_stims[i].id,
                              prime: master_stims[i].control_a,
                              target: master_stims[i].target_a,
                              condition: "gender_a"});
    }


    // Add non word stimuli


    // randomly decide whether the /o/ or /a/ word will be prime and which will be target
    distractors = [master_stims[i].distractor_o, master_stims[i].distractor_a].sort(() => Math.random() - 0.5);

    // add distractors
    all_stims.push({id: master_stims[i].id,
                        prime: distractors[0],
                        target: distractors[1],
                        condition: "distractor"});

  }

  // shuffle non-word stimuli

  // recreate non-word stimuli array, but having them in prime-target pairs
  // even though these pairs aren't real "prime-targets". this is just to parallel
  // the structure of the real prime-target pairs.

  console.log(all_stims);
  return all_stims;
}


/*
Input: object containing a .structure element, which is an array with the slide structures
Output: none

make_slides defines each type of slide. The function then creates each slide as defined
by the input f.structure.

Each slide must contain the following field:
  name: (string) name of the slide as referenced by f.structure

The slide may also contain the following information:
  start: (function) everything that must be exectued at the start of slide. This
    includes defining variables such as the start time of the block, and hiding all
    html elements from previous slides. Note that this does not change elements per trial,
    but rather per block.
  present: exp.prac_stims, exp.all_stims --> lets the stims be visiuble for present_handle
  present_handle: (function) defines what happens on the slide. Include everything
    that should appear on the slide, and code in dynamic elements (i.e. button presses)

The rest of the fields defined in each slide are functions that the above fields reference.
These may include the following:
  button: defines what the script should do once the "button" (i.e. an admissable
    response, whether that is a button press or input text, as defined in
    present_handle) is pressed. I.e. it says, save the responses, and either continue
    itterating through the stims, or if they are exhausted, go onto the next slide type
  log_responses: defines how to save participant response
  submit: defines how to save information from the post-experiment survey.

You can add your own functions as necessary.
*/

function make_slides(f) {
  var slides = {};

  // Consent slide: Show the consent slide (text defined in index.html)
  //  and save experiment start time.
  slides.consent = slide({
     name : "consent",
     start: function() {
      exp.startT = Date.now();
     }
  });

  // instructions slide: show the instructions (text defined in index.html)
  slides.instructions_1 = slide({
     name : "instructions_1",
     start: function() {
     }
  });

  // practice slides:
  slides.practicetrial = slide({
    name: "practicetrial",
    present: exp.prac_stims,
    present_handle: function(stim) {
        // hide feedback text
        $("#feedback").hide();
        $("#feedback").css("color", "red");

        console.log(stim);
        this.trial_start = Date.now();

        this.stim = stim;
        console.log(this.stim);

        // show the stim
        $("#practice_word").html(this.stim.word);

        // Flag to track if correct key has been pressed
        let correctKeyPressed = false;

        // define what to do when any key is pressed
        document.onkeypress = (e) => {
            if (!correctKeyPressed) {
              // Check if correct key has not been pressed yet
              checkKey.call(this, e);
            }
        };

        // function that checks whether a valid key has been pressed
        // 102 = f (fake word)
        // 106 = j (real word)
        function checkKey(e) {
            e = e || window.event;
            console.log(e);

            // Show feedback if no correct key was pressed
            if (e.keyCode != 102 && e.keyCode != 106) {
                $("#feedback").show();
                $("#feedback").html("Por favor pulse la tecla \'j\' o \'f\'");
            } // Show feedback if incorrect key was pressed
            else if (e.keyCode == 102 && this.stim.answer == 1) {
                $("#feedback").show();
                $("#feedback").html("¡" + this.stim.word + " es una palabra real! Por favor pulse la tecla \'j\'");
            } // Show feedback if incorrect key was pressed
            else if (e.keyCode == 106 && this.stim.answer == 0) {
                $("#feedback").show();
                $("#feedback").html("¡" + this.stim.word + " no es una palabra real! Por favor pulse la tecla \'f\'");
            } // Show feedback if correct key was pressed
            else if (e.keyCode == 102 || e.keyCode == 106) {
                console.log(e.key);
                $("#feedback").show();
                $("#feedback").html("¡Correcto!");
                $("#feedback").css("color", "green");
                correctKeyPressed = true; // Set flag to true after correct key is pressed
                _s.button(e.key);
                console.log(e.keyCode);
            }
        }
    },

    // After each practice stim, move onto the next one with a 1000 ms delay
    button: function(response) {
        setTimeout(() => {
            _stream.apply(this);
        }, 1000);
    }
  });

  // Begining Page with more instructions (text defined in index.html)
  slides.beginpage = slide({
     name : "beginpage",
     start: function() {
      exp.startT = Date.now();
     }
  });

  // Break page
  slides.break = slide({
   name : "break",
   start: function() {
    exp.startT = Date.now();

    // calculate percentage correct in this round
    percentage = Math.round((exp.feedback_numcorrect / exp.feedback_numtrials) * 100);
    $("#percentage").html("Ha acertado " + percentage + "% de las veces.");
   }
  });

  // objectrial: Main slides for experiment
  slides.objecttrial = slide({
    name : "objecttrial",
    present : exp.all_stims,
    start : function() {
      // Set the counters for total number of trials and number of correct trails to
      // 0, this will be reset for each block
      exp.feedback_numtrials = 0;
      exp.feedback_numcorrect = 0;
    },
    present_handle : function(stim) {

      // present fixation cross
      $("#target_word").hide();
      $("#fixation_cross").show();

      // set the new stim
      console.log("PHASE" + exp.phase);
    	this.trial_start = Date.now();
      this.stim = stim;
	    console.log(this.stim);
      $("#target_word").html(this.stim.item);

      // After set amount of time, hide fixation cross
      setTimeout(() => {
        $("#fixation_cross").hide();
      }, fixationCrossTime);

      // after set amount of time, show the stim
      setTimeout(() => {
        $("#target_word").show();
      }, fixationCrossTime + crossStimTime);


      document.onkeypress = (e) => {
        checkKey.call(this, e);
      };

      function checkKey(e) {

        e = e || window.event;
        console.log(e);
        // 102 = f
        // 106 = j
        if (e.keyCode == 102 || e.keyCode == 106) {

          // // update percent correct for participant feedback
          // exp.feedback_numtrials += 1;
          // if (this.stim.trial_type == "target" && e.keyCode ==106) {
          //   exp.feedback_numcorrect +=1
          // }
          // else if (this.stim.trial_type == "distractor" && e.keyCode == 102) {
          //   exp.feedback_numcorrect +=1
          // }

          console.log(e.key);
          _s.button(e.key);
          console.log(e.keyCode);
        }
      }
  	},

  	button : function(response) {
      this.log_responses(response);
      // if (exp.pause_trials.includes(exp.phase)){
      //   $("#target_word").hide();
      //   setTimeout(() => {
      //     exp.go();
      //   }, stimCrossTime);
      //   return;
      // } else {
      _stream.apply(this); },
      // }},

    log_responses : function(response) {
          exp.data_trials.push({
            "slide_number_in_experiment" : exp.phase,
            "item": this.stim.item,
            "trial_type": this.stim.trial_type,
            "id": this.stim.id,
            "response": response,
            "rt" : Date.now() - _s.trial_start
          });
      }
  });


  slides.subj_info =  slide({
    name : "subj_info",
    start : function(e){
      $(".err2").hide();
    },
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        prolific_ID : $("#prolific_ID").val(),
        gender : $("#gender").val(),
        age : $("#age").val(),
        education : $("#education").val(),
        assess : $('input[name="assess"]:checked').val(),
        spanish_country_years : $("#country").val(),
        spanish_family_years : $("#family").val(),
        spanish_schhol_work_years : $("#schoolwork").val(),
        otherLanguage : $("#otherLanguage").val(),
        culture : $('#culture').val(),
        problems: $("#problems").val(),
        comments : $("#comments").val()
      };

      // The second part of the questionaire is not optional throw an
      // error if any of the questions in the second part are left unanswered
      if (exp.subj_data.prolific_ID != "" &
        exp.subj_data.gender != "" &
        exp.subj_data.age != "" &
        exp.subj_data.education != "" &
        exp.subj_data.assess != "" &
        exp.subj_data.spanish_country_years != "" &
        exp.subj_data.spanish_family_years != "" &
        exp.subj_data.spanish_schhol_work_years != "" &
        exp.subj_data.otherLanguage != "" &
        exp.subj_data.culture != "") {
        $(".err2").hide();
        exp.go(); //use exp.go() if and only if there is no "present" data.
      } else {
        $(".err2").show();
      };
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          "condition" : exp.condition,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000,
      };
      proliferate.submit(exp.data);
    }
  });

  return slides;
}

/*
INIT
This function creates the stimuli list

allstimuli is an array from 'stimuli.js' that contains all the stimuli in the
study. Each entry in the array is in the following format:

Return:
Dictionary with entries:
  item: name of object, single word string
  label: string of format "color_object"
*/
function init() {
  console.log("enter init");

  all_stims = make_stims_per_condition();

  all_stims = _.shuffle(all_stims);


  function interweaveItems(allStims, interveners) {

    // later go back and define a set of intereveners to use if the number of pairs doesn't work
    if (allStims.length % (interveners + 1) != 0) {
      console.log("Number of stim pairs: " + allStims.length);
      console.log("Number of pairs is not divisible by numbe of interveners (" + (interveners + 1) + ")")
      throw new CustomError("Number of stims is not divisible by 4 which means sorting algorithm does not work!");
    }

    output_array = new Array(allStims.length * 2).fill(null);

    // loop through all stim pairs
    for (let i = 0; i < allStims.length; i++) {
      // loop through stim array until you find an empty slot
      for (let j = 0; j < output_array.length; j++) {
        if (output_array[j] == null) {
          // add in the prime
          output_array[j] = {item: allStims[i].prime,
                             id: allStims[i].id,
                             trial_type: allStims[i].condition};

          // add the target after intervener empty slots
          output_array[j + interveners + 1] = {item: allStims[i].target,
                             id: allStims[i].id,
                             trial_type: allStims[i].condition};

          // break out of this for loop
          break;
        }
      }
    }
    return output_array;
  }

  exp.all_stims = interweaveItems(all_stims, 1);

  //get allStimuli
  var items_target = _.shuffle(allStimuli);

  exp.prac_stims = [{'word': "fumo", 'answer': "1"},
                    {'word': "rudaba", 'answer': "0"},
                    {'word': "resultó", 'answer': "1"},
                    {'word': "remoptaste", 'answer': "0"}];

  // /*
  // exp.phase number (i.e. trial number + ?) that indicates when the break should occur. his must match the total number of breaks for the script to work
  // */
  // exp.pause_trials = [200, 400, 600, 800, 1000, 1200] //136, 265, 394, 523

  exp.trials = [];
  exp.catch_trials = [];
  exp.condition = {}; //can randomize between subject conditions here
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };


  //blocks of the experiment:
  exp.structure=["consent",
                 "instructions_1",
                 "practicetrial",
                 "beginpage",
                 'objecttrial',
                 'subj_info',
                 'thanks'];
  // 'break',
  // 'objecttrial', 'break',
  // 'objecttrial', 'break',
  // 'objecttrial', 'break',
  // 'objecttrial', 'break',
  // 'objecttrial', 'break',
  // 'objecttrial',
// "objecttrial1", "break1",

  // // two variables that will track participants % of correct repsonses
  // // to be displayed during each break
  // exp.feedback_numtrials = 0;
  // exp.feedback_numcorrect = 0;

  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = 1404;
  // utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined
  $(".nQs").html(exp.nQs);

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#consent_button").click(function() {
      exp.go();
  });

  $("#start_practice").click(function() {
      exp.go();
  });

  $("#start_button").click(function() {
      exp.go();
  });
  $("#continue_button").click(function() {
      exp.go();
  });

  exp.go(); //show first slide
}
