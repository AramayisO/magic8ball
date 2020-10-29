import Component from './Component.js';
import { parser, getRandomNumberInRange, getRandomMagic8BallImg } from './util.js';

class Magic8Ball extends Component {

    constructor(container, props) {
        super(container, props);

        this.state = {
            imgPath: 'img/magic/magic8ball_start.png',
            altText: 'Image of a magic 8 ball.',
            animation: '',
        };

        this.render();
    }

    ask() {
        setTimeout(() => {
            this.state.animation = 'shake';
            this.render();
        }, 0);

        setTimeout(() => {
            this.state.animation = 'blink';
            this.render();
        }, 1500);

        setTimeout(() => {
            this.state.animation = '';
            this.state.imgPath = getRandomMagic8BallImg();
            this.render();
        }, getRandomNumberInRange(5000, 10000));   
    }

    reset() {
        this.state = {
            ...this.state,
            imgPath: 'img/magic/magic8ball_start.png',
            altText: 'Blank magic 8 ball.',
            animation: '',
        };

        this.render();
    }

    render() {
        const { animation, imgPath, altText } = this.state;
        
        let answer = `
            <div class="text-center ${animation}">
                <img src="${imgPath}" class="img-fluid w-50" alt="${altText}">
            </div>
        `;
    
        this.element = parser.parseFromString(answer, 'text/html').querySelector('div');
    
        super.render();
    }
};

export default Magic8Ball;