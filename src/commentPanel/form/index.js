import Component from './../lib/component';

import template from './form.mustache';
import './form.scss';

export default class Form extends Component {
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
        this._createElement(template);

        this._$name = this._$element.querySelector('[data-selector="name"]');
        this._$text = this._$element.querySelector('[data-selector="text"]');

        this._$element.addEventListener("submit", this._submitHandler.bind(this));
    }


    _submitHandler(event) {
        event.preventDefault();

        const post = {
            "id": this._generateId(),
            "time": this._getCurrentDateAndTime(),
            "text": this.text,
            "author": {
                "name": this.name
            }
        };

        this._trigger("post-comment", {post});
        console.log("post-comment");

    }

    _generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    _getCurrentDateAndTime() {
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        return date + ' ' + time;
    }
}