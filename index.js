/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).


const SHD = [
            'barbell shoulder press ',
            'dumbell shoulder press ',
            'one arm side laterals',
            'front dumbell raise',
            'face pulls',
        ],
        LEG = [
            'squat ',
            'leg press ',                
            'leg extension ',
            'hamstring curl ',
            'standing calve raise ',
        ],
        CHT = [
            'barbell flat bench press ',
            'incline dumbell bench press ',
            'decline barbell bench press ',
            'incline dumbell flies ',
            'decline cable flies ',
        ],
        BAC = [
            'deadlift ',
            'cable lat pull down ',
            'decline dumbell reverse fly ',
            'underhand cable pull down ',
            'dumbell incline row ',
        ],
        COR = [
            'plank ',
            'decline sit ups ',
            'mason twist ',
            'bottms ups ',
            'leg scissors ',
            'elbow to knees ',
        ],
        ARM = [
            'dumbell bicep curls ',
            'straight bar bicep curls ',
            'hammer curls ',
            'tricep cable pull downs ',
            'skull crushers ',
            'overhead cable tricept pull ',
        ];




const languageStrings = {
    'en': {
        translation: {
            BODY: [
                'shoulders ',
                'legs ',
                'chest ',
                'back ',
                'core ',
                'arms ',
            ],
            SKILL_NAME: 'Workout Planner',
            GET_BODY_MESSAGE: "Your workout will target ",
            GET_WORKOUT_MESSAGE: "Here's your workout: ",
            HELP_MESSAGE: 'You can say build my workout, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
};


const handlers = {
    'LaunchRequest': function () {
        this.emit('GetWorkout');
    },
    'GetNewWOIntent': function () {
        this.emit('GetWorkout');
    },
    'GetWorkout': function () {
        var c = this.event.request.intent.slots.LIST_OF_BODY.value;
        
        
        // Get desired workout area
        const bodyArr = this.t('BODY');
        const bodyIndex = Math.floor(Math.random() * bodyArr.length);
        const randomBody = bodyArr[bodyIndex];
        var speechOutput;
        speechOutput = this.t('GET_BODY_MESSAGE') + randomBody;
        var workoutArr = null;
       
        if (randomBody === bodyArr[0]) {
            workoutArr = SHD;
        }
        else if (randomBody === bodyArr[1]) {
            workoutArr = LEG;
        }
        else if (randomBody === bodyArr[2]) {
            workoutArr = CHT;
        }
        else if (randomBody === bodyArr[3]) {
            workoutArr = BAC;
        }
        else if (randomBody === bodyArr[4]) {
            workoutArr = COR;
        }
        else if (randomBody === bodyArr[5]) {
            workoutArr = ARM;
        }
        
        var randomWorkout = [];
        for (var i = 0; i < 4; i++)
        {
            var j = 0;
            var workoutIndex = Math.floor(Math.random() * workoutArr.length);
            while (j < i) {
                if(randomWorkout[j] === workoutArr[workoutIndex]) {
                    workoutIndex = Math.floor(Math.random() * workoutArr.length);
                    j = 0;
                }
                else {
                    j++;
                }
            }
            randomWorkout[i] = workoutArr[workoutIndex];
        }
            
        // Create speech output
        speechOutput += '<break time="0.7s"/> ' + this.t('GET_WORKOUT_MESSAGE') + randomWorkout[0] + '<break time="0.3s"/> ' + randomWorkout[1] + 
        '<break time="0.3s"/> ' + randomWorkout[2] + '<break time="0.3s"/> ' + randomWorkout[3];
       
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomBody);
    },
    'GetSHD': function () {
        const workoutArr = SHD;
        var speechOutput;
        speechOutput = this.t('GET_BODY_MESSAGE') + 'shoulders';
       
        var randomWorkout = [];
        for (var i = 0; i < 4; i++)
        {
            var j = 0;
            var workoutIndex = Math.floor(Math.random() * workoutArr.length);
            while (j < i) {
                if(randomWorkout[j] === workoutArr[workoutIndex]) {
                    workoutIndex = Math.floor(Math.random() * workoutArr.length);
                    j = 0;
                }
                else {
                    j++;
                }
            }
            randomWorkout[i] = workoutArr[workoutIndex];
        }
   
        // Create speech output
        speechOutput += '<break time="0.7s"/> ' + this.t('GET_WORKOUT_MESSAGE') + randomWorkout[0] + '<break time="0.3s"/> ' + randomWorkout[1] + 
        '<break time="0.3s"/> ' + randomWorkout[2] + '<break time="0.3s"/> ' + randomWorkout[3];
       
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), 'shoulders');
    },
    'GetLEG': function () {
        const workoutArr = LEG;
        var speechOutput;
        speechOutput = this.t('GET_BODY_MESSAGE') + 'legs';
       
        var randomWorkout = [];
        for (var i = 0; i < 4; i++)
        {
            var j = 0;
            var workoutIndex = Math.floor(Math.random() * workoutArr.length);
            while (j < i) {
                if(randomWorkout[j] === workoutArr[workoutIndex]) {
                    workoutIndex = Math.floor(Math.random() * workoutArr.length);
                    j = 0;
                }
                else {
                    j++;
                }
            }
            randomWorkout[i] = workoutArr[workoutIndex];
        }
   
        // Create speech output
        speechOutput += '<break time="0.7s"/> ' + this.t('GET_WORKOUT_MESSAGE') + randomWorkout[0] + '<break time="0.3s"/> ' + randomWorkout[1] + 
        '<break time="0.3s"/> ' + randomWorkout[2] + '<break time="0.3s"/> ' + randomWorkout[3];
       
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), 'legs');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
