import InputForm from './InputForm.js';
import Alert from './Alert.js';

class App {
    constructor() {
        this.state = {
            question: '',
            isQuestionAsked: false,
            alertMsg: '',
        };

        this.onQuestionInputChanged = this.onQuestionInputChanged.bind(this);
        this.onQuestionSubmitted = this.onQuestionSubmitted.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onAlertExpired = this.onAlertExpired.bind(this);

        this.render();
    }

    onQuestionInputChanged(event) {
        event.preventDefault();
        this.state.question = event.target.value.trim();
    }

    onQuestionSubmitted(event) {
        event.preventDefault();
        if (this.state.question) {
            this.state.isQuestionAsked = true;    
        } else {
            this.state.alertMsg = 'You must type in a question first.';
        }
        this.render();
    }

    onReset(event) {
        event.preventDefault();
        this.state.isQuestionAsked = false;
        this.state.question = '';
        this.render();
    }

    onAlertExpired() {
        this.state.alertMsg = '';
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
        
        if (this.state.alertMsg) {
            container.appendChild(
                Alert({
                    type: 'dark',
                    message: this.state.alertMsg,
                    expirationTime: 5000,
                    onExpired: this.onAlertExpired,
                })
            );
        }
    }
}

export default App;