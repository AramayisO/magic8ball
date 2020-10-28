import { parser } from './util.js';

const Alert = (props) => {
    let domString = `
        <div class="alert alert-${props.type ? props.type : 'light'} text-center" role="alert">
            ${props.message ? props.message : ''}
        </div>
    `;

    let alert = parser.parseFromString(domString, 'text/html')
                      .querySelector('div');

    return alert;
}

export default Alert;