import { parser } from './util.js';

const InputForm = (props) => {
    let domString = `
        <form class="text-center mt-5">
            <div class="form-group">
                <label for="question" class="d-block">${props.label}</label>
                <input type="text" class="form-control w-75 ${props.isSubmitted ? 'd-none' : 'd-inline-block'}" id="question">
                <button type="submit" class="btn btn-outline-dark ml-2 mb-1 px-4 d-inline-block}">
                    ${props.isSubmitted ? 'Try again' : 'Ask!'}
                </button>
            </div>
        </form>
    `;

    let form = parser.parseFromString(domString, 'text/html')
                     .querySelector('form');

    form.onkeyup = props.onKeyUp;
    form.onsubmit = props.onSubmit;

    return form;
};

export default InputForm;