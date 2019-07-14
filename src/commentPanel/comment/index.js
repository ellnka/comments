import Component from './../lib/component';

import template from './comment.mustache';
import './comment.scss';


export default class Comment extends Component {
    get comment() {
        return this._comment;
    }

    get $element() {
        return this._$element;
    }

    constructor(comment) {
        super();

        this._comment = comment;

        this._init();
    }

    _init() {
        const view = {
            "post": this._comment.post,
            "id": function () {
                return this.post.id;
            },
            "name": function () {
                console.log(this);
                return this.post.author.name;
            },
            "text": function () {
                return this.post.text;
            },
            "time": function () {
                return Component.timeAgo(this.post.time);
            }
        };

        this._$element = this._createElement(template, view);

        this.$element.querySelector(".post #remove-comment").addEventListener("click", this._removeOnclickHandler.bind(this));
        this.$element.querySelector(".post #reply-comment").addEventListener("click", this._replyOnclickHandler.bind(this));
    }


    _removeOnclickHandler(event) {
        let $button = event.target;
        if ($button.tagName !== "BUTTON") {
            $button = $button.parentNode;
        }
        const id = $button.dataset.key;
        this._trigger('remove-comment', {
            id
        });

    }

    _replyOnclickHandler(event) {
        const $element = this.$element;
        console.log($element);
        this._trigger('reply-comment', {
            $element
        });
    }


}