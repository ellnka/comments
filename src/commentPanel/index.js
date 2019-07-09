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

        this._form = new Form({});
        this._$element = this._createElement(template, {});

        this._fetchComments();

        this._$element.querySelector("[data-component='form']").appendChild(this._form.$element);
        this._form.on('post-comment', this._postCommentHandler.bind(this));
    }


    _postCommentHandler({
                            detail: post
                        }) {
        this._renderFeed(post);
       // let empty = {"posts":[]};
        Services.update(url, this._formatPosts());
    }

    _removeCommentHandler() {
        Services.update(url, this._formatPosts());
    }

    _fetchComments() {
        Services.fetch(url)
            .then(data => {
                this._renderFeed(data);
            });
    }

    _renderFeed(data) {

        if(!this._feed) {
            this._initFeed(data);
        } else {
            this._feed.addComments(data.posts || [data]);
        }

    }

    _initFeed(data) {
        this._feed = new Feed(data);

        this._feed.on('remove-comment', this._removeCommentHandler.bind(this));

        const $element = this._$element.querySelector("[data-component='feed']");
        $element.appendChild(this._feed.$element);
    }

    _formatPosts() {
        return {
            posts: this._feed.getAllComments()
        };
    }

}
