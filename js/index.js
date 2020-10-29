import QuestionForm from './QuestionForm.js';
import Magic8Ball from './Magic8Ball.js';

const onQuestionSubmitted = (promise) => {
    promise.then(question => {
        magic8Ball.ask();
    }).catch(error => {
        console.log('error:', error);
    });
};

const onQuestionReset = () => {
    magic8Ball.reset();
}

const magic8Ball = new Magic8Ball(
    document.querySelector('#answer'),
    null
);

new QuestionForm(
    document.querySelector('#question'),
    {
        onSubmit: onQuestionSubmitted,
        onReset: onQuestionReset,
    }
);