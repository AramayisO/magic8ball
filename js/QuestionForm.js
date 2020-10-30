import Component from './Component.js';
import { parser } from './util.js';


class QuestionForm extends Component {

    /**
     * Required props:
     *     - None
     * 
     * Optional Props:
     *     - onSubmit: (promise) -> void
     *     - onReset: (void) -> void
     */
    constructor(container, props) {
        super(container, props);

        this.state = {
            label: 'Ask me anything!',
            question: '',
            submitted: false,
        };

        this.onKeyUp = this.onKeyUp.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onReset = this.onReset.bind(this);

        this.render();
    }

    onKeyUp(event) {
        event.preventDefault();
        this.state.question = event.target.value.trim();
    }

    onSubmit(event) {
        event.preventDefault();

        if (this.state.question) {
            // Update state
            this.state.label = this.state.question;
            this.state.submitted = true;

            // If a callback is provided, invoke the callback with a promise
            // that resolves to the input question.
            if (this.props.onSubmit) {
                this.props.onSubmit(Promise.resolve(this.state.question));
            }

            // Oly rerender the component if question submitted.
            this.render();
        } else {
            // If a callback is provided, invoke the callback with a rejected
            // promise that contains an error message.
            if (this.props.onSubmit) {
                this.props.onSubmit(Promise.reject('Please type in a question.'));
            }
        }
    }

    onReset(event) {
        event.preventDefault();
        this.state.label = 'Ask me anything!'
        this.state.question = '';
        this.state.submitted = false;
        // If a callback is provided, invoke the callback function.
        if (this.props.onReset) {
            this.props.onReset();
        }
        this.render();
    }

    render() {
        const { label, submitted } = this.state;

        let form = `
            <form class="text-center my-5 text-light">
                <div class="form-group">
                    <label for="question-input" class="d-block mb-4">${label}</label>
                    <div class="d-flex flex-column flex-md-row justify-content-center align-items-center">
                        <input type="text" id="question-input" class="form-control font-weight-bold mb-4 mb-md-0 ${submitted ? 'd-none' : 'd-inline-block'}">
                        <button type="submit" class="btn btn-outline-light btn-lg px-5 ml-md-3">
                            ${submitted ? 'Try again' : 'Ask!'}
                        </button>
                    </div>
                </div>
            </form>
        `;

        this.element = parser.parseFromString(form, 'text/html').querySelector('form');
        this.element.onkeyup = this.onKeyUp;
        this.element.onsubmit = submitted ? this.onReset : this.onSubmit;

        super.render();
    }
};

export default QuestionForm;