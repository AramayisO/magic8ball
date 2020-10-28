import { parser } from './util.js';

const Magic8Ball = (props) => {
    let domString = `
        <div id="answer" class="text-center ${props.animation ? props.animation : ''}">
            <img src="${props.imgPath}" class="img-fluid w-75" alt="${props.altText}">
        </div>
    `;

    let div = parser.parseFromString(domString, 'text/html')
                    .querySelector('div');

    return div;
};

export default Magic8Ball;