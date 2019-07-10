'use strict';

import Services from './lib/services';
import Config from './lib/config';
import Component from './lib/component';

import Form from './form';
import Feed from './feed';

import template from './commentPanel.mustache';
import './commentPanel.scss';

const url = Config.apiUrl();

export default class CommentPanel extends Component {
    get $element() {
        return this._$element;
    }

    constructor() {
        super();

        this._$element = this._createElement(template, {});
        this._$form = this._$element.querySelector("[data-component='form']");

        this._fetchComments();
    }

    _fetchComments() {
        Services.fetch(url)
            .then(data => {
                this._renderFeed(data);
                this._initForm();
                this._removeLoader();
            });
    }

    _initForm() {
        this._form = new Form({});
        this._$form.appendChild(this._form.$element);
        this._form.on('post-comment', this._postCommentHandler.bind(this));
    }

    _removeLoader() {
        const $loader = this._$element.querySelector(".loader");
        $loader.parentNode.removeChild($loader);
    }

    _renderFeed(data) {
        if(!this._feed) {
            this._initFeed(data);
        } else {
            this._feed.addComments(data.posts || [data]);
        }
    }

    _rerenderForm($newParent) {
        this._form.$element.parentNode.removeChild(this._form.$element);
        $newParent.appendChild(this._form.$element);
    }

    _initFeed(data) {
        this._feed = new Feed(data);

        this._feed.on('reply-comment', this._replyCommentHandler.bind(this));
        this._feed.on('remove-comment', this._removeCommentHandler.bind(this));

        const $element = this._$element.querySelector("[data-component='feed']");
        $element.appendChild(this._feed.$element);
    }

    _postCommentHandler({
                            detail: post
                        }) {
        this._renderFeed(post);
// let empty = {"posts":[]};
        this._rerenderForm(this._$form);
        Services.update(url, this._formatPosts());
    }

    _replyCommentHandler({
                             detail: item
                         }) {
        console.log(item.item.$element);
        this._rerenderForm(item.item.$element);
    }

    _removeCommentHandler() {
        Services.update(url, this._formatPosts());
    }

    _formatPosts() {
        return {
            posts: this._feed.getAllComments()
        };
    }

}