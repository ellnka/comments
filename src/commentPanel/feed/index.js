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
        console.log("add comments");
        console.log(comments);
        if(!comments) return;
        comments.forEach((comment) => this.addComment(comment));
    }

    addComment(post) {
        console.log("add comment");
        console.log(post);
        const comment = new Comment(post);
        this._comments.push(comment);
        this._renderComment(comment.$element);

        comment.on('remove-comment', this._removeCommentHandler.bind(this));

        return comment;
    }

    removeComment(id) {
        const selector = "#" + id;
        const $comment = this._$element.querySelector(selector);

        this._comments = this.comments.filter((comment) => comment.comment.post.id !== id);
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
        console.log(this._comments);
        this._trigger('remove-comment', {
            id
        });
    }

    _renderComment($comment) {
        this._$element.appendChild($comment);
    }



}