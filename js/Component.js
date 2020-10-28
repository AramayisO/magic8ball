class Component {

    constructor(rootElementId) {
        this.root = rootElementId;
        this.children = [];
    }

    render() {
        // Get the root element that the component will be attached to.
        let container = document.querySelector(`#${this.root}`);

        // Remove all the children.
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        // Re-append all the children.
        for (let child of this.children) {
            container.appendChild(child);
        }

        // Clear the childrens array so the render() method of the subclass
        // can be in control of adding the children that need to be rendered
        // the next time the function is called.
        this.children = [];
    }
};

export default Component;