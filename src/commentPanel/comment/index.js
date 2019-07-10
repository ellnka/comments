import Component from './../lib/component';

import template from './comment.mustache';
import retemplate from './recomment.mustache';
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

        this.$element.addEventListener('click', this._onclickHandler.bind(this));
    }

    _init() {
        const view = {
            "post": this._comment.post,
            "id": function() {
                return this.post.id;
            },
            "name": function() {
                console.log(this);
                return this.post.author.name;
            },
            "text": function() {
                return this.post.text;
            },
            "time": function() {
                return Component.timeAgo(this.post.time);
            }
        };

        this._$element = this._createElement(this.post.reid? template : retemplate, view);
    }


    _onclickHandler(event) {
        if (event.target.tagName !== 'BUTTON') return;

        if (event.target.id === "remove-comment") {
            const id = this._comment.post.id;
            this._trigger('remove-comment', {
                id
            });
        }

        if (event.target.id === "reply-comment") {
            const $element = this.$element;
            this._trigger('reply-comment', {
                $element
            });
        }
    }


}