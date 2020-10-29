class Component {
    
    constructor(container, props) {
        this.container = container;
        this.props = props;
        this.element = null;
    }

    render() {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }

        this.container.appendChild(this.element);
    }
};

export default Component;