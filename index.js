/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

// Hubble Handler
const GetHubbleHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetHubbleIntent');
  },
  handle(handlerInput) {
    const speechOutput = data[0];

    // Hubble image
    const hubbleObj = {
         title: 'Edwin Hubble',
         url: 'https://s3.amazonaws.com/space-hubble/edwin-hubble.jpg'
    };

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, speechOutput, hubbleObj)
      .getResponse();
  },
};

// Moon Handler
const GetMoonHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetMoonIntent');
  },
  handle(handlerInput) {
    const speechOutput = data[1];
    
    // Moon image
    const moonObj = {
        title: 'Moon',
        url: 'https://s3.amazonaws.com/space-hubble/moon-one.jpg'
     };
    
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, speechOutput, moonObj)
      .getResponse();
  },
};


// Mars Handler
const GetMarsHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetMarsIntent');
  },
  handle(handlerInput) {
    const speechOutput = data[2];

    // Mars image
    const marsObj = {
         title: 'Mars',
         url: 'https://s3.amazonaws.com/space-hubble/mars.jpg'
    };

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, speechOutput, marsObj)
      .getResponse();
  },
};


const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const SKILL_NAME = 'Hubble';
const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const data = [
    'Edwin Hubble was an American astronomer. He played a crucial role in establishing the fields of extragalactic astronomy and observational cosmology and is regarded as one of the most important astronomers of all time..',
    'The lunar surface is divided into the mountainous highlands and the large, generally roughly circular plains called maria by early astronomers, who erroneously believed them to be bodies of water. ',
    'Liquid water cannot exist on the surface of Mars due to low atmospheric pressure, which is less than 1% that of Earth, except at the lowest elevations for short periods.'
];

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetHubbleHandler,
    GetMoonHandler,
    GetMarsHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
