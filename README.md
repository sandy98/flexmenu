# flexmenu

Menu web component with built-in flexibility to accommodate itself to mobile screens

### Getting Started

Let's begin with a classic example of the flexible menu, to demonstrate its capabilities by outlining the navigation structure of the documentation for the flexible menu itself. The documentation is organized into several sections, each dedicated to a specific component of the flexible menu. You can navigate through these sections using the menu items below.

### I. Installation

The fastest way to get started with the flexible menu is to include the flexmenu.js script in your HTML file, like so:

    <script src="https://unpkg.com/@esavoretti/flexmenu" type="module"></script>

or

    <script type="module" src="https://cdn.jsdelivr.net/gh/sandy98/flexmenu/flexmenu.js"></script>

Of course, you can also download the flexmenu.js file and include it locally in your project. This includes intalling it via

     npm install @esavoretti/flexmenu 

and then copying it to your project folder and including it with a relative path, like so:

    <script src="path/to/flexmenu.js" type="module"></script>

  
In any case, always keep in mind that the flexmenu.js script must be included with the type="module" attribute, as it uses ES6 module syntax.

### II. Usage

Here's a typical structure showing flex-menu as the main component, with color-label, menu-item, menu-list, main-menu, and hamburger-button as its subcomponents. Each of these components has its own documentation section that you can access through the menu.  

    
                    <flex-menu>
                        <menu-item>
                            Home
                        </menu-item>
                        <menu-list menu-title="Documentation">
                            <menu-item href="#getting-started">Getting Started</menu-item>
                            <menu-separator></menu-separator>
                            <menu-item href="#color-label">Color Label</menu-item>
                            <menu-item href="#menu-item">Menu Item</menu-item>
                            <menu-item href="#menu-list">Menu List</menu-item>
                            <menu-item href="#main-menu">Main Menu</menu-item>
                            <menu-item href="#hamburger-button">Hamburger Button</menu-item>
                        </menu-list>
                        <menu-item href="#configuration">Configuration</menu-item>
                        <menu-item href="#about">About</menu-item>
                    </flex-menu>
                

The previous html code snippet illustrates how to structure the flexible menu with its various components. Each menu item corresponds to a section in the documentation, allowing you to easily navigate and learn

**Provided Components**

* **`<color-label>`: Base presentation element utilizing the styling mixin pipeline.**
* **`<menu-item>`: Clickable, navigation-ready component designed to live inside menus.**
* **`<menu-list>`: Container element.** *Accepts `<menu-item>`, `<menu-list>` and `<menu-separator>` elements.*
* **`<hamburger-button>`: Responsive trigger element.**
* **`<flex-menu>`: The top-level responsive layout framework**. **: Base presentation element utilizing the styling mixin pipeline.**

---

Global Styling System

All elements derived from the internal `ColorMixin` pipeline feature fully synchronized CSS custom properties, HTML attributes, and JavaScript DOM object properties.

Custom Styling Attributes / CSS Variables

Pass these as HTML attributes or set them in JS. The component dynamically translates them into matching CSS variables behind a Shadow DOM boundary.

| HTML Attribute | DOM Property | Default Value          | Description                     |
| -------------- | ------------ | ---------------------- | ------------------------------- |
| `fg-color`   | `fgColor`  | `aliceblue`          | Text/Foreground color           |
| `bg-color`   | `bgColor`  | `steelblue`          | Default state background color  |
| `sel-color`  | `selColor` | `rgb(190, 252, 190)` | Selected state background color |

---

Component Reference

1. `<color-label>`

A basic structural container that exposes the fundamental color theme mapping.

html

```
<color-label fg-color="white" bg-color="#333" sel-color="coral">
  Label Content
</color-label>
```

Properties & Methods

* **`selected`**  *(Boolean)* **: Gets or sets the visual active selection state.**
* **`select()`** **: Explicitly forces the component into the selected state.**
* **`unselect()`** **: Explicitly removes the selected state.**
* **`toggleSelected()`** **: Reverses the current selection state.**

---

2. `<menu-item>`

Extends `<color-label>` to provide navigation handling, interaction patterns, and parent-sibling awareness.

html

```
<menu-item href="#gallery" use-default-handler fg-color="yellow">
  Gallery
</menu-item>
```

Unique Attributes & Properties

* **`href`** / `href`  *(String, default: `'#'`)* **: Destination anchor link URL target.**
* **`use-default-handler`** / `useDefaultHandler`  *(Boolean, default: `false`)* **: When active, automatically transitions active sibling states and routes the page location automatically upon user click.**

Methods

* **`defaultHandler(force = false)`** **: Processes mutual exclusivity logic. Clears target states from matching sibling **`<menu-item>` elements, selects itself, and pushes changes to window location tracking.
* **`unselectSiblings()`** **: Manually queries parent nodes to strip **`.selected` classes from competing menu items.

Custom Events Emitted

* **`menu-item-click`** **: Fires on selection interaction. Bubbles outside the shadow root safely.**
* **`event.detail` structure** **:**
  javascript

  ``{       target: HTMLElement, // The specific menu-item instance       type: 'click',       srcEvent:      MouseEvent // Native mouse click details     }``

## Demo

[Demo Site](https://sandy98.github.io/flexmenu)

