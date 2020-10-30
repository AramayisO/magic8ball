class Component {
    
    /**
     * Initializes the component.
     * 
     * @param {*} container The container element to which the DOM element of
     *                      the component will be appended to.
     * 
     * @param {*} props Extra properties such a callback functions.
     */
    constructor(container, props) {
        this.container = container;
        this.props = props;
        this.element = null;
    }

    /**
     * Mounts the DOM element to the container.
     * 
     * Sub-classes of Component should set the this.element field to the DOM
     * element to be appended to the container.
     */
    render() {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }

        this.container.appendChild(this.element);
    }
};

export default Component;