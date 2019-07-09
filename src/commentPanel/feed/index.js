import Component from './../lib/component';
import Comment from './../comment';

import template from './feed.mustache';
import './feed.scss';


export default class Feed extends Component {
    get comments() {
        return this._comments;
    }

    get $element() {
        return this._$element;
    }

    constructor({
                    posts: comments
                }) {

        super();

        this._comments = [];

        this._$element = this._createElement(template);

        this.addComments(comments);

    }

    addComments(comments) {
        if(!comments) return;

        comments.forEach((comment) => this.addComment(comment));
    }

    addComment(post) {
        const comment = new Comment(post);
        this._comments.push(comment);

        this._renderComment(comment.$element);

        comment.on('remove-comment', this._removeCommentHandler.bind(this));
        comment.on('reply-comment', this._replyCommentHandler.bind(this));

        return comment;
    }

    removeComment(id) {
        const selector = "#" + id;
        const $comment = this._$element.querySelector(selector);

        this._comments = this._comments.filter((comment) => comment.comment.post.id !== id);
        this._$element.removeChild($comment);
    }

    getAllComments() {
        return this._comments.map((comment) => comment.comment);
    }

    _removeCommentHandler({
                              detail: item
                          }) {
        const id = item.id;
        this.removeComment(id);
        this._trigger('remove-comment', {
            id
        });
    }

    _replyCommentHandler({
                              detail: item
                          }) {
        this._trigger('reply-comment', {
            item
        });
    }

    _renderComment($comment) {
        this._$element.appendChild($comment);
    }



}