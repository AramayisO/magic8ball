import Component from './Component.js';
import { parser, getRandomNumberInRange, getRandomMagic8BallImg } from './util.js';

class Magic8Ball extends Component {

    /**
     * Required props:
     *     - None
     * 
     * Optional props:
     *     - onAnswerStart: (void) -> void 
     *     - onAnswerEnd: (void) -> void
     *     - onReset: (void) -> void
     */
    constructor(container, props) {
        super(container, props);

        this.state = {
            imgPath: 'img/magic/magic8ball_start.png',
            altText: 'Image of a magic 8 ball.',
            animation: '',
        };

        // Used to keep track out timers from setTimeout so we can clear timers
        // in case the component is reset before timers expire.
        this.timers = [];

        this.onAnswerStart = this.onAnswerStart.bind(this);
        this.onAnswerEnd = this.onAnswerEnd.bind(this);
        this.onReset = this.onReset.bind(this);

        this.render();
    }

    onAnswerStart() {
        if (this.props.onAnswerStart) {
            this.props.onAnswerStart();
        }
    }

    onAnswerEnd() {
        if (this.props.onAnswerEnd) {
            this.props.onAnswerEnd();
        }
    }

    onReset() {
        if (this.props.onReset) {
            this.props.onReset();
        }

        this.timers.forEach(timer => clearTimeout(timer));
        this.timers = [];

        this.state = {
            ...this.state,
            imgPath: 'img/magic/magic8ball_start.png',
            altText: 'Blank magic 8 ball.',
            animation: '',
        };
    }

    ask() {
        this.timers.push(
            setTimeout(() => {
                this.onAnswerStart();
                this.state.animation = 'shake';
                this.render();
            }, 0)
        );

        this.timers.push(
            setTimeout(() => {
                this.state.animation = 'blink';
                this.render();
            }, 1500)
        );

        this.timers.push(
            setTimeout(() => {
                this.onAnswerEnd();
                this.state.animation = '';
                this.state.imgPath = getRandomMagic8BallImg();
                this.render();
            }, 9500)   
        );
    }

    reset() {
        this.onReset();
        this.render();
    }

    render() {
        const { animation, imgPath, altText } = this.state;
        
        let answer = `
            <div class="text-center ${animation}">
                <img src="${imgPath}" class="img-fluid" alt="${altText}">
            </div>
        `;
    
        this.element = parser.parseFromString(answer, 'text/html').querySelector('div');
    
        super.render();
    }
};

export default Magic8Ball;