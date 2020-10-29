import QuestionForm from './QuestionForm.js';
import Magic8Ball from './Magic8Ball.js';
import Alert from './Alert.js';

// Sound that will be played when magic 8 ball is asked a question
let askSound = new Audio('audio/twilight_zone.mp3');
let alertSound = new Audio('audio/alert.mp3');

// --------------------------------------------------------------
// Callback functions that will be passed as props to components
// --------------------------------------------------------------
const onAlertShowed = () => {
    alertSound.currentTime = 0;
    alertSound.play();
};

const onAlertClosed = () => {
    alertSound.pause();
};

const onQuestionSubmitted = (promise) => {
    promise.then(question => {
        alert.close();
        magic8Ball.ask();
    }).catch(error => {
        alert.show({ type: 'danger', message: error });
    });
};

const onQuestionReset = () => {
    magic8Ball.reset();
}

const onAnswerStarted = () => {
    askSound.currentTime = 0;
    askSound.play();
}

const onAnswerEnded = () => {
    askSound.pause();
}

// ---------------------------------------------------
// Create components that will be rendered to the DOM
// ---------------------------------------------------
let alert = new Alert(
    document.querySelector('#alert'),
    {
        onShow: onAlertShowed,
        onClose: onAlertClosed,
    }
);

let magic8Ball = new Magic8Ball(
    document.querySelector('#answer'),
    {
        onAnswerStart: onAnswerStarted,
        onAnswerEnd: onAnswerEnded,
        onReset: onAnswerEnded,
    }
);

let questionForm = new QuestionForm(
    document.querySelector('#question'),
    {
        onSubmit: onQuestionSubmitted,
        onReset: onQuestionReset,
    }
);