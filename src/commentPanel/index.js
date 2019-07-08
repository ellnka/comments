'use strict';

import Services from './lib/services';
import Config from './lib/config';
import Component from './lib/component';

import Form from './form';
import Comments from './comments';

import template from './commentPanel.mustache';
import './commentPanel.scss';

const url = Config.apiUrl();

export default class CommentPanel extends Component {
    get $element() {
        return this._$element;
    }

    constructor() {
        super();
        this._createElement(template, {});

        this._comments = {posts: []};
        this._form = new Form({});
        this._form.on('post-comment', this._postCommentHandler.bind(this));



        this._init();
        this._$element.querySelector("[data-component='form']").appendChild(this._form.$element);
    }


    _init() {
        this._fetchComments();
    }

    _postCommentHandler({detail: post}) {
        console.log(post);
        this._comments.posts.push(post);
        Services.update(url, this._comments);


    }

    _fetchComments() {
        Services.fetch(url)
            .then(data => {
                this._comments = new Comments(data);
                this._$element.querySelector("[data-component='comments']").appendChild(this._comments.$element);
            });
    }

}


/*
menu.getElem().addEventListener('menu-select', function(event) {
    alert(event.detail.value);
});
*/