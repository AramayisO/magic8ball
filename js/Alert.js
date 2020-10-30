import Component from './Component.js';
import { parser } from './util.js';

class Alert extends Component {

    /**
     * Required props:
     *     - None
     * 
     * Optional props:
     *     - onShow: (void) -> void
     *     - onClose: (void) -> void
     */
    constructor(container, props) {
        super(container, props);

        this.state = {
            type: 'info',
            message: '',
            hidden: true,
        };

        this.defaultExpTime = 5000;
        this.timers = [];

        this.onShow  = this.onShow.bind(this);
        this.onClose = this.onClose.bind(this);
        this.close   = this.close.bind(this);

        this.render();
    }

    onShow() {
        if (this.props.onShow) {
            this.props.onShow();
        }
    }

    onClose() {
        if (this.props.onClose) {
            this.props.onClose();
        }

        // Reset state
        this.state = {
            ...this.state,
            type: 'info',
            message: '',
            hidden: true,
        };

        // Clear all timers
        this.timers.forEach(timer => clearTimeout(timer));
        this.timers = [];
    }

    /**
     * Show the alert message.
     * 
     * @param {string} type One of the Bootstrap alert-* classes.
     * @param {string} message The message to display in the allert.
     * @param {number} expTime Time in milliseconds before alert closes.
     */
    show({ type, message, expTime }) {
        // Close the previous alert if there is one.
        this.onClose();

        // Set state
        this.state = {
            ...this.state,
            type,
            message,
            hidden: false,
        };

        this.render();
        this.onShow();

        // Set a timer to close the alert after some elapsed time.
        this.timers.push(
            setTimeout(this.close, expTime || this.defaultExpTime)
        );
    }

    /**
     * Close the alert message.
     */
    close() {
        this.onClose();
        this.render();
    }

    render() {
        const { type, message, hidden } = this.state;

        let alert = `
            <div class="alert alert-${type} ${hidden ? 'd-none' : ''} text-center wobble" role="alert">
                ${message}
            </div>
        `;
    
        this.element = parser.parseFromString(alert, 'text/html').querySelector('div');
    
        super.render()
    }
}

export default Alert;