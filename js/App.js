import Component from './Component.js';
import InputForm from './InputForm.js';
import Alert from './Alert.js';
import Magic8Ball from './Magic8Ball.js';
import { getRandomMagic8BallImgPath } from './util.js';

class App extends Component {
    constructor(rootElementId) {
        super(rootElementId);

        this.state = {
            question: '',
            isQuestionAsked: false,
            alertMsg: '',
            imgPath: '',
            imgAltText: '',
            imgAnimation: '',
            timeoutTimers: [],
        };

        this.onQuestionInputChanged = this.onQuestionInputChanged.bind(this);
        this.onQuestionSubmitted = this.onQuestionSubmitted.bind(this);
        this.onReset = this.onReset.bind(this);

        this.initializeState();
        this.render();
    }

    initializeState() {
        this.state.isQuestionAsked = false;
        this.state.question = '';
        this.state.alertMsg = '';
        this.state.imgPath = 'img/magic/magic8ball_start.png';
        this.state.imgAltText = 'Image of a magic 8 ball.';
        this.state.imgAnimation = '';
        this.state.timeoutTimers.forEach(timer => clearTimeout(timer));
        this.state.timeoutTimers = [];
    }

    onQuestionInputChanged(event) {
        event.preventDefault();
        this.state.question = event.target.value.trim();
    }

    onQuestionSubmitted(event) {
        event.preventDefault();
        if (this.state.question) {
            this.state.isQuestionAsked = true;
            this.state.alertMsg = '';
            this.ask();
        } else {
            this.state.alertMsg = 'You must type in a question first.';
        }
        this.render();
    }

    onReset(event) {
        event.preventDefault();
        this.initializeState();
        this.render();
    }

    ask() {
        this.state.imgAnimation = 'shake';

        this.state.timeoutTimers.push(
            setTimeout(() => {
                this.state.imgAnimation = 'blink';
                this.state.imgAltText = 'Blinking magic 8 ball';
                this.render();
            }, 1000)
        );

        this.state.timeoutTimers.push(
            setTimeout(() => {
                this.state.imgPath = getRandomMagic8BallImgPath();
                this.state.imgAnimation = '';
                this.state.imgAltText = 'Magic 8 ball with random answer.'
                this.render();
            }, 6800)
        );
    }   

    render() {
        if (this.state.alertMsg) {
            this.children.push(
                Alert({
                    type: 'danger',
                    message: this.state.alertMsg,
                })
            );
        }

        this.children.push(
            InputForm({
                label: this.state.isQuestionAsked ? this.state.question : 'Ask me anything!',
                isSubmitted: this.state.isQuestionAsked,
                onKeyUp: this.onQuestionInputChanged,
                onSubmit: this.state.isQuestionAsked ? this.onReset : this.onQuestionSubmitted,
            })
        );

        this.children.push(
            Magic8Ball({
                imgPath: this.state.imgPath,
                altText: this.state.imgAltText,
                animation: this.state.imgAnimation,
            })
        );

        super.render();
    }
}

export default App;