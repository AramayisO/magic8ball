import QuestionForm from './QuestionForm.js';
import Magic8Ball from './Magic8Ball.js';

let ball = new Magic8Ball(
    document.querySelector('#answer'),
    null
);

new QuestionForm(
    document.querySelector('#question'),
    {
        onSubmit: (promise) => {
            promise.then(question => {
                ball.ask();
            }).catch(error => {
    
            });
        },

        onReset: () => {
            ball.reset();
        },
    }
);