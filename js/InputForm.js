import { parser } from './util.js';

const InputForm = (props) => {
    let domString = `
        <form class="text-center my-5 text-light">
            <div class="form-group">
                <label for="question" class="d-block mb-4">${props.label}</label>
                <input type="text" class="form-control font-weight-bold w-75 mb-2 ${props.isSubmitted ? 'd-none' : 'd-inline-block'}" id="question">
                <button type="submit" class="btn btn-outline-light btn-lg ml-2 mb-2 px-4 d-inline-block}">
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