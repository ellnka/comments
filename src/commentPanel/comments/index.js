import Component from './../lib/component';

import template from './comments.mustache';
import './comments.scss';


export default class Comments extends Component {
    get posts() {
        return this._posts;
    }

    get $element() {
        return this._$element;
    }

    constructor({posts}) {
        super();
        this._posts = posts;
        const view = {
            "posts": this._posts,
            "name": function () {
                return this.post.author.name;
            },
            "text": function () {
                return this.post.text;
            },
            "time": function () {
                return "15 mins ago";
            }
        };
        console.log(view);
        this._createElement(template, view);
    }


}