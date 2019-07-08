export default class Component {
    constructor() {
    }

    static hideElements(...$elements) {
        $elements.forEach(($element) => {
            if ($element && $element.classList && !$element.classList.contains("d-none")) {
                $element.classList.add("d-none");
            }
        });
    }

    static showElements(...$elements) {
        $elements.forEach(($element) => {
            if ($element && $element.classList && $element.classList.contains("d-none")) {
                $element.classList.remove("d-none");
            }
        });
    }


    on(eventName, handler) {
        this._$element.addEventListener(eventName, handler);
    }

    _trigger(eventName, detail) {
        const event = new CustomEvent(eventName, {detail});
        this._$element.dispatchEvent(event);
    }
    _createElement(template, view) {
        let tmp = document.createElement('div');
        tmp.innerHTML = template.render(view);
        this._$element = tmp.firstElementChild;
    }
}