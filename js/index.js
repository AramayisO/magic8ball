import QuestionForm from './QuestionForm.js'

new QuestionForm(
    document.querySelector('#question'),
    {
        onSubmit: (promise) => {
            promise.then(question => {
                console.log('question', question)
            }).catch(error => {
                console.log('error', error);
            });
        },
    }
);

// new App('app');