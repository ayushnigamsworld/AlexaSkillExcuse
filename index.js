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

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = 'amzn1.ask.skill.7bf6638b-5ca2-4370-befd-e37b3b89759b';

const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';


const data = [
    "I am suffering from Food Poisoning.",
    "Suffering from flu",
    "The doctor gave me a lead prosthetic foot.",
    "No that’s not alcohol on my breath, it’s the car air freshener.",
    "The stomach is very upset. I think I have diarrhoea",
    "I think I have a bladder infection",
    "Really bad cramps",
    "Locked my keys in my car",
    "The roads have been completely blocked due to a major accident in the neighbourhood",
    "Need to pickup mom from airport",
    "Need to pickup father from airport",
    "Need to pickup sister from airport",
    "Need to pickup aunt from airport",
    "Need to pickup mom from airport",
    "Need to get my mother from rehab",
    "Need to get my father from rehab",
    "That wasn’t me, that was my parrot who said that."
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

function generateSafeRandomExcuse () {
    
    let randomIndex = Math.floor( Math.random() * 12 );
    return data[randomIndex];
}

function generateExcuseOfCategory (excuseCategory) {
    
    let excuse = "I am having "+ excuseCategory + " and won't be able to come to office today ";
    return excuse;
}

function generateExcuseOfLevel (excuseLevel) {
    
    let excuse = "I am having excuse level "+ excuseLevel + " and won't be able to come to office today ";
    return excuse;
}

const handlers = {
    'LaunchRequest': function () {
        this.response.speak("Excuse master is here to help. Should I just generate an excuse or would you like to send an excuse to someone ? ").listen("Sorry can you repeat ?");
        this.emit(':responseReady');
    },
    
    'PersonIntent': function () {
        
        let personName = this.event.request.intent.slots.person.value;
        
        if(personName != undefined && personName != null) {
            
            let personNameConfirm = "The person to send excuse to is, your "+ personName + ".";
            let excuseQuestion = " Should I generate a safe random excuse ?";
            personNameConfirm = personNameConfirm.concat(excuseQuestion);
            this.emit(':ask', personNameConfirm);
        } 
        else {
            
            this.response.speak("Can you repeat the person to send to ?").listen("Sorry once more ..");
            this.emit(':responseReady');
        }
    },
    
    'RandomExcuseIntent' : function () {
        
        let generatedExcuse = generateSafeRandomExcuse();
        generatedExcuse = "The excuse is  ".concat(generatedExcuse).concat(". Please say Ok confirm to confirm !!");
        
        this.emit(':tell', generatedExcuse);
    },
    
    'CategoricalExcuseIntent' : function () {
        
        let inputExcuseCategory = this.event.request.intent.slots.excuseSlot.value;
        let inputExcuseLevel = this.event.request.intent.slots.excuseLevel.value;
        
        let generatedExcuse = "";
        
        if ( inputExcuseCategory != undefined && inputExcuseCategory != null ) {
             
             generatedExcuse = generatedExcuse.concat( generateExcuseOfCategory(inputExcuseCategory) ); 
        } 
        else if ( inputExcuseLevel != undefined && inputExcuseLevel != null ) {
             
             generatedExcuse = generatedExcuse.concat( generateExcuseOfLevel(inputExcuseLevel) ); 
        } 
        else {
            this.response.speak("Couldn't get try again");
            this.emit(":responseReady");
        }
        
        generatedExcuse = "The excuse is  ".concat(generatedExcuse).concat(". Please say Ok confirm to confirm !!");
        this.emit(':tell', generatedExcuse);
    },
    
    'OnlyGenerateIntent' : function () {
        
        let generatedExcuse = "generated excuse is "+ generateSafeRandomExcuse();
        this.emit(':tell', generatedExcuse);
    },
    
    'ConfirmIntent' : function () {
        
        this.response.speak("The excuse has been send.");
        this.emit(':responseReady');
    },
    
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
