import InputForm from './InputForm.js';

class App {
    constructor() {
        this.state = {
            question: '',
            isQuestionAsked: false,
        };

        this.onQuestionInputChanged = this.onQuestionInputChanged.bind(this);
        this.onQuestionSubmitted = this.onQuestionSubmitted.bind(this);
        this.onReset = this.onReset.bind(this);

        this.render();
    }

    onQuestionInputChanged(event) {
        event.preventDefault();
        this.state.question = event.target.value;
    }

    onQuestionSubmitted(event) {
        event.preventDefault();
        this.state.isQuestionAsked = true;
        this.render();
    }

    onReset(event) {
        event.preventDefault();
        this.state.isQuestionAsked = false;
        this.state.question = '';
        this.render();
    }

    render() {
        let container = document.querySelector('#app');

        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        container.appendChild(
            InputForm({
                label: this.state.isQuestionAsked ? this.state.question : 'Ask me anything!',
                isSubmitted: this.state.isQuestionAsked,
                onKeyUp: this.onQuestionInputChanged,
                onSubmit: this.state.isQuestionAsked ? this.onReset : this.onQuestionSubmitted,
            })
        );
    }
}

export default App;