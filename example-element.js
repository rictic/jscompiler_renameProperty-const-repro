
import { LitElement, html } from 'lit-element';

class ExampleElement extends LitElement {
    static get properties() {
        return {
            name: { type: String }
        };
    }

    constructor() {
        super();

        /**
         * Label to show in the template.
         *
         * @type {!string}
         */
        this.name = 'World';
    }

    render() {
        return html`<p>Hello, ${this.name}!</p>`;
    }
}

customElements.define('example-element', ExampleElement);


