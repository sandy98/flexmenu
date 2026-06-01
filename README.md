# flexmenu

Menu web component with built-in flexibility to accommodate itself to mobile screens

**Provided Components**

* **`<color-label>`** **: Base presentation element utilizing the styling mixin pipeline.**
* **`<menu-item>`** **: Clickable, navigation-ready component designed to live inside menus.**
* **`<menu-list>`** **: ***(Documented in part 2)* Container element.
* **`<hamburger-button>`** **: ***(Documented in part 2)* Responsive trigger element.
* **`<flex-menu>`** **: ***(Documented in part 2)* The top-level responsive layout framework.

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
