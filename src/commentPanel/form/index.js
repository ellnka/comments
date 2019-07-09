import Component from './../lib/component';

import template from './form.mustache';
import './form.scss';

export default class Form extends Component {
    set name(value) {
        this._$name.value = value;
    }

    set text(value) {
        this._$text.value = value;
    }
    get $element() {
        return this._$element;
    }

    get name() {
        return this._$name.value;
    }

    get text() {
        return this._$text.value;
    }

    constructor({}) {
        super();
        this._$element = this._createElement(template);

        this._$name = this._$element.querySelector('[data-selector="name"]');
        this._$text = this._$element.querySelector('[data-selector="text"]');

        this._$element.addEventListener("submit", this._submitHandler.bind(this));
    }

    static _generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    static _getCurrentDateAndTime() {
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        return date + ' ' + time;
    }

    _submitHandler(event) {
        event.preventDefault();

        const post = {
            "id": Form._generateId(),
            "time": Form._getCurrentDateAndTime(),
            "text": this.text,
            "author": {
                "name": this.name
            }
        };

        this._trigger("post-comment", {
            post
        });

        this.name = "";
        this.text = "";
    }

}