export default class Component {
    constructor() {}

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

    static timeAgo(dateParam) {
        if (!dateParam) {
            return null;
        }
        const MONTH_NAMES = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
        const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
        const today = new Date();
        const yesterday = new Date(today - DAY_IN_MS);
        const seconds = Math.round((today - date) / 1000);
        const minutes = Math.round(seconds / 60);
        const isToday = today.toDateString() === date.toDateString();
        const isYesterday = yesterday.toDateString() === date.toDateString();
        const isThisYear = today.getFullYear() === date.getFullYear();

        function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
            const day = date.getDate();
            const month = MONTH_NAMES[date.getMonth()];
            const year = date.getFullYear();
            const hours = date.getHours();
            let minutes = date.getMinutes();

            if (minutes < 10) {
                minutes = `0${ minutes }`;
            }

            if (prefomattedDate) {
                return `${ prefomattedDate } at ${ hours }:${ minutes }`;
            }

            if (hideYear) {
                return `${ day }. ${ month } at ${ hours }:${ minutes }`;
            }

            return `${ day }. ${ month } ${ year }. at ${ hours }:${ minutes }`;
        }


        if (seconds < 5) {
            return 'now';
        } else if (seconds < 60) {
            return `${ seconds } seconds ago`;
        } else if (seconds < 90) {
            return 'about a minute ago';
        } else if (minutes < 60) {
            return `${ minutes } minutes ago`;
        } else if (isToday) {
            return getFormattedDate(date, 'Today'); // Today at 10:20
        } else if (isYesterday) {
            return getFormattedDate(date, 'Yesterday'); // Yesterday at 10:20
        } else if (isThisYear) {
            return getFormattedDate(date, false, true); // 10. January at 10:20
        }

        return getFormattedDate(date); // 10. January 2017. at 10:20
    }

    on(eventName, handler) {
        this._$element.addEventListener(eventName, handler);
    }

    _trigger(eventName, detail) {
        const event = new CustomEvent(eventName, {
            detail
        });
        this._$element.dispatchEvent(event);
    }

    _createElement(template, view) {
        let tmp = document.createElement('div');
        tmp.innerHTML = template.render(view);
        return tmp.firstElementChild;
    }


}