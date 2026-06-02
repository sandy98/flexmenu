
const baseStyle = `
    <style>
        :host {
            display: inline-flex;
            width: 10rem;
            max-width: 15rem;
            height: 1.5rem;
            min-height: 1.5rem;
            position: relative;
            z-index: 0;
        }

        /* The container takes care of all styling */
        .wrapper {
            
            /* Reads the value from the host style attribute seamlessly */
            color: var(--fg-color, aliceblue);
            background-color: var(--bg-color, steelblue);
            position: relative;
            display: flex;
            width: 100%;
            /* height: 100%; */
            justify-content: center;
            align-items: center;
            /* gap: 0.5rem; */
            user-select: none;
            touch-action: none;
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        /* When the host gets the class, change the inner wrapper's background */
        :host(.selected) .wrapper {
            background-color: var(--sel-color, rgb(190, 252, 190));
        }
    </style>
`;

const baseHtml = (slotContent = 'DIV') => `
    <div class="wrapper">
        <slot>${slotContent}</slot>
    </div>
`;

//

const ColorMixin = function(elementType = HTMLElement) {
    const customClass = class extends elementType {
        constructor() {
            super();
            this.attachShadow({mode: 'open'});
        }

        static get observedAttributes() {
            return ['fg-color', 'bg-color', 'sel-color'];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            console.log(`Attribute ${name} has changed from ${oldValue} to ${newValue}`);
            this.style.setProperty(`--${name}`, newValue);
        }

        connectedCallback() {
            this.shadowRoot.innerHTML = `${baseStyle}${baseHtml(this.tagName)}`
        }

        getAttribute(name) {
            switch(name) {
                case 'fg-color':
                    return this.style.getPropertyValue('--fg-color') || 'aliceblue';
                    break;
                case 'bg-color':
                    return this.style.getPropertyValue('--bg-color') || 'steelblue';
                    break;
                case 'sel-color':
                    return this.style.getPropertyValue('--sel-color') || 'rgb(190, 252, 190)';
                    break;
                default:
                    return super.getAttribute(name);
            }
        }

        toggleSelected() {
            this.classList.toggle('selected');
        }

        select() {
            this.classList.toggle('selected', true);
        }

        unselect() {
            this.classList.toggle('selected', false);
        }
        
        get selected() { return this.classList.contains('selected');}
        set selected(bselected) {
            if (!!bselected) {
                this.select();
            } else {
                this.unselect();
            }
        }

        get fgColor() { return this.getAttribute('fg-color');}
        set fgColor(newColor) {this.setAttribute('fg-color', newColor);}
        // set fgColor(newColor) {this.style.setProperty('--fg-color', newColor);}

        get bgColor() { return this.getAttribute('bg-color');}
        set bgColor(newColor) {this.setAttribute('bg-color', newColor);}
        // set bgColor(newColor) {this.style.setProperty('--bg-color', newColor);}

        get selColor() { return this.getAttribute('sel-color');}
        set selColor(newColor) {this.setAttribute('sel-color', newColor);}
        // set selColor(newColor) {this.style.setProperty('--sel-color', newColor);}
    };

    return customClass;
};

// const ColorLabel = ColorMixin();
export class ColorLabel extends ColorMixin() {}

window.customElements.define('color-label', ColorLabel);

// 

const menuItemStyle = `
    <style>
        :host {
            cursor: pointer;
        }
        .wrapper {
            padding-top: 3px;
            padding-bottom: 3px;
        }
        .wrapper:hover {
            color: var(--bg-color, steelblue);
            background-color: var(--fg-color, aliceblue);
            border: dotted 1px var(--bg-color, steelblue);
        }

        :host(.selected) .wrapper {
            color: var(--bg-color, steelblue);
            background-color: var(--sel-color, rgb(190, 252, 190));
            border: dotted 1px var(--bg-color, steelblue);
        }

        :host(.selected) .wrapper:hover {
            color: var(--sel-color, rgb(190, 252, 190));
            background-color: var(--bg-color, steelblue);
            border: dotted 1px var(--sel-color, rgb(190, 252, 190));
        }

    </style>
`;

export class MenuItem extends ColorMixin() {

        constructor() {
            super();
            this._href = '#';
            this._use_default_handler = false;
            this.boundClick = this.onClick.bind(this);
        }

        static get observedAttributes() {
            return ["href", "use-default-handler", ...super.observedAttributes];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            switch (name) {
                case "href":
                    this.href = newValue;
                    break;
                case "use-default-handler":
                    let realvalue = newValue === '' || !!newValue ? true : false;
                    this.useDefaultHandler = realvalue;
                    break;
                default:
                    super.attributeChangedCallback(name, oldValue, newValue);
            }
        }

        connectedCallback() {
            this.shadowRoot.innerHTML = `${baseStyle}${menuItemStyle}${baseHtml(this.tagName)}`;
            this.addEventListener('click', this.boundClick);
            if (location.href.endsWith(this.href) && this.useDefaultHandler) this.select();
        }

        disconnectedCallback() {
            this.removeEventListener('click', this.boundClick);
        }

        getAttribute(name) {
            switch(name) {
                case 'href':
                    return this.href;
                    break;
                case 'use-default-handler':
                    return this.useDefaultHandler;
                    break;
                default:
                    return super.getAttribute(name);
            }
        }

        removeAttribute(name) {
            if (name === 'use-default-handler') {
                this.useDefaultHandler = false;
            } else {
                super.removeAttribute(name);
            }
        }

        get href() {return this._href;}
        set href(newHref) {this._href = newHref;}
        
        get useDefaultHandler() {return this._use_default_handler;}
        set useDefaultHandler(newDefault) {this._use_default_handler = !!newDefault;}

        unselectSiblings() {
            const parent = this.parentElement;
            const siblings = parent.querySelectorAll('menu-item');
            siblings.forEach(menuitem => { if (menuitem !== this) menuitem.unselect(); });
        }

        defaultHandler(force = false) {
            if (!force && !this.useDefaultHandler) return;
            this.unselectSiblings();
            this.select();
            location.href = this.href;
        }

        onClick(evt) {
            // console.log("Click on menuItem");
            const options = {detail: {target: this, type: 'click', srcEvent: evt}, composed: true, bubbles: true};
            const clickEvent = new CustomEvent('menu-item-click', options);
            this.dispatchEvent(clickEvent);
            this.defaultHandler();
            return true;
        }
}

window.customElements.define('menu-item', MenuItem);

// 

const menuListStyle = `
    <style>
        :host {
            display: flex;
            width: 10rem;
            max-width: 15rem;
            margin-top: 0;
            margin-left: 0;
            position: relative;
            z-index: 0;
        }

        /* The container takes care of all styling */
        .wrapper {
            
            /* Reads the value from the host style attribute seamlessly */
            color: var(--fg-color, aliceblue);
            background-color: var(--bg-color, steelblue);
            position: relative;  
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
            user-select: none;
            z-index: 1;
        }

        .wrapper color-label {
            cursor: pointer;
            /* border-bottom: solid 1px var(--fg-color, aliceblue); */
        }

        .wrapper color-label::after {
            content: "\\25BC"; 
            font-size: 0.75rem;
            transition: transform 0.3s ease;
            display: inline-flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 3px;
            color: var(--fg-color, aliceblue);
            background-color: transparent;
        }

        .wrapper:hover color-label::after {
            transform: rotate(180deg);
        }

        .item-container {
            margin: 0;
            position: absolute;
            top: 0;
            left: -100vw;
            display: flex;
            flex-direction: column;
            justify-content: stretch;
            align-items: center;
            width: 10rem;
            max-width: 15rem;
            gap: 0;
            transition: left 0.3s fade-in-out;
            z-index: 2;
        }
        .wrapper:hover .item-container {
            top: 0;
            left: 99%;
            z-index: 10;
            @media screen and (orientation: landscape) {
                top: calc(1.5rem + 0px);
                left: 0;
            } 
        }
        ::slotted(*) {
            display: none;
        }
        ::slotted(menu-item), ::slotted(menu-list) {
            display: inherit;
            padding: 5px;
        }
        ::slotted(span) {
            content: "";
            display: inline-block;
            background-color: var(--fg-color);
            color: var(--bg-color);
            width: 100%;
            min-width: 100%;
            height: 1px;
            max-height: 1px;
            min-height: 1px;
        }
    </style>
    `;

function menuListHtml(menuTitle = "MENU-LIST") {
    return `
    <div class="wrapper">
        <color-label>${menuTitle}</color-label>
        <div class="item-container">
            <slot></slot>
        </div>
    </div>
    
    `;
}

export class MenuList extends ColorMixin() {
    constructor() {
        super();
        this._menuTitle = this.tagName;
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `${menuListStyle}${menuListHtml(this.menuTitle)}`;
    }

    static get observedAttributes() {
        return ['menu-title', ...super.observedAttributes];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'menu-title') {
            this.menuTitle = newValue;
        } else {
            super.attributeChangedCallback(name, oldValue, newValue);
        }
    }

    getAttribute(attrName) {
        if (attrName === 'menu-title') return this.menuTitle;
        return super.getAttribute(attrName);
    }

    get menuTitle() { return this._menuTitle};
    set menuTitle(newTitle) {
        this._menuTitle = newTitle;
        this.showTitle();
    }

    showTitle() {
        const label = this.shadowRoot.querySelector('color-label');
        if (!label) return;
        label.textContent = this.menuTitle; 
    }
}

window.customElements.define('menu-list', MenuList);

//

const mainMenuStyle = `
    <style>
        .item-container {
            display: flex;
            flex-direction: column;
            gap: 0;
            justify-content: flex-start;
            align-items: left;
            width: fit-content;
            @media screen and (orientation: landscape)  {
                    flex-direction: row;
                    align-items: center;
            }
        }     
    </style>
`;

function mainMenuHtml() {
    return `
    <div class="wrapper">
        <nav class="item-container">
            <slot></slot>
        </nav>
    </div>
    `;
}

export class MainMenu extends MenuList {
    connectedCallback() {
        // this.shadowRoot.innerHTML = `${menuListStyle}${mainMenuStyle}${mainMenuHtml()}`;
        this.shadowRoot.innerHTML = `${mainMenuStyle}${mainMenuHtml()}`;
    }

    getAttribute(attrName) {
        if (attrName === 'menu-title') return this.menuTitle;
        return super.getAttribute(attrName);
    }

    get menuTitle() { return ""};
    set menuTitle(newTitle) {
        // No title for main menu
    }

    showTitle() {
        // No title for main menu
    }
}

window.customElements.define('main-menu', MainMenu);

//


const hamburgerStyle = `
    <style>
        :host {
            width: calc(1.5rem + 0px);
            min-width: calc(1.5rem + 0px);
            height: calc(1.5rem + 0px);
            min-height: calc(1.5rem + 0px);
            color: var(--fg-color, aliceblue);
            background-color: var(--bg-color, steelblue);
        }   
        .wrapper {
            width: calc(1.5rem + 0px);
            min-width: calc(1.5rem + 0px);
            height: calc(1.5rem + 0px);
            min-height: calc(1.5rem + 0px);
            color: var(--fg-color, aliceblue);
            background-color: var(--bg-color, steelblue);
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            padding: 0.2rem;
            display: flex;
            position: fixed;
            top: 0;;
            right: 0;
            z-index: 100;
            cursor: pointer;
            @media screen and (orientation: landscape) {
                display: none;
            }
        }
        .wrapper span    {
            position: absolute;
            width: 80%;
            height: 0.25rem;
            background-color: var(--fg-color, aliceblue);
            border-radius: 0.125rem;
            transition: all 0.3s ease;
        }
        .wrapper span:nth-child(1) {
            top: 25%;
        }
        .wrapper span:nth-child(2) {
            top: 50%;
        }
        .wrapper span:nth-child(3) {
            top: 75%;
        }
        :host(.open) .wrapper span:nth-child(1) {
            top: 50%;
            transform: rotate(45deg);
        }
        :host(.open) .wrapper span:nth-child(2) {
            opacity: 0;
        }
        :host(.open) .wrapper span:nth-child(3) {
            top: 50%;
            transform: rotate(-45deg);
        }
    </style>
`;

function hamburgerHtml() {
    return `
    <div class="wrapper">
        <span></span>
        <span></span>
        <span></span>
    </div>
    `;
}

export class HamburgerButton extends ColorMixin() {
    constructor() {
        super();
        this.boundClick = this.onClick.bind(this);
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `${hamburgerStyle}${hamburgerHtml()}`;
        this.shadowRoot.querySelector('.wrapper').addEventListener('click', this.boundClick);
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('.wrapper').removeEventListener('click', this.boundClick);
    }

    onClick(evt) {
        this.toggle();
    }

    toggle() {
        this.classList.toggle('open');
        this.dispatchToggleEvent();
    }

    open() {
        this.classList.toggle('open', true);
        this.dispatchToggleEvent();
    }

    close() {
        this.classList.toggle('open', false);
        this.dispatchToggleEvent();
    }

    dispatchToggleEvent() {
        const options = {detail: {isOpen: this.isopen}, composed: true, bubbles: true};
        const toggleEvent = new CustomEvent('hamburger-toggle', options);
        this.dispatchEvent(toggleEvent);
    }

    get isopen() {
        return this.classList.contains('open');
    }  
}

window.customElements.define('hamburger-button', HamburgerButton);

//

const flexMenuStyle = `
    <style>
        :host {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 50;
            width: 33vw;
            min-width: 33vw;
            height: calc(1.5rem +0px);
            min-height: calc(1.5rem + 0px);
            color: var(--fg-color, aliceblue);
            background-color: transparent;
            @media screen and (orientation: landscape) {
                width: 100%;
                min-width: 100%;
                background-color: var(--bg-color, steelblue);
            }
        }

        .wrapper {
            position: relative;
            top: 0;
            left: 0;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: left;
            width: 33vw;
            min-width: 10rem;
            height: 100%;
            /* color: var(--fg-color, aliceblue);
            background-color: transparent; */
            @media screen and (orientation: landscape) {
                flex-direction: row;
                align-items: center;
                width: 100%;
                min-width: 100%;
                height: 1.5rem;
                /* background-color: var(--bg-color, steelblue); */
            }
        }
        .wrapper hamburger-button {
            position: fixed;
            top: 0;
            right: 0;
            z-index: 100;
            display: inherit;
            @media screen and (orientation: landscape) {
                display: none;
            }
        }
        .wrapper main-menu {
            position: fixed;
            top: 0;
            left: 0;
            display: none;
            @media screen and (orientation: landscape) {
                display: inherit;
            }
        }
        .wrapper:has(hamburger-button.open) main-menu {
            display: inherit;
        }
    </style>
`;

function flexMenuHtml() {
    return `
    <div class="wrapper">
        <main-menu>
            <slot></slot>
        </main-menu>
        <hamburger-button></hamburger-button>
    </div>
    `;
}

export class FlexMenu extends ColorMixin() {
    constructor() {
        super();
    }
    
    connectedCallback() {
        this.shadowRoot.innerHTML = `${flexMenuStyle}${flexMenuHtml()}`;
    }

}

window.customElements.define('flex-menu', FlexMenu);

//
