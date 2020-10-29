import QuestionForm from './QuestionForm.js';
import Magic8Ball from './Magic8Ball.js';
import Alert from './Alert.js';

// Sound that will be played when magic 8 ball is asked a question
let audio = new Audio('audio/twilight_zone.mp3');

// --------------------------------------------------------------
// Callback functions that will be passed as props to components
// --------------------------------------------------------------
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
    audio.currentTime = 0;
    audio.play();
}

const onAnswerEnded = () => {
    audio.pause();
}

// ---------------------------------------------------
// Create components that will be rendered to the DOM
// ---------------------------------------------------
let alert = new Alert(
    document.querySelector('#alert')
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