// Main js file

const colours = {
  "aliceblue": "#f0f8ff",
  "antiquewhite": "#faebd7",
  "aqua": "#00ffff",
  "aquamarine": "#7fffd4",
  "azure": "#f0ffff",
  "beige": "#f5f5dc",
  "bisque": "#ffe4c4",
  "black": "#000000",
  "blanchedalmond": "#ffebcd",
  "blue": "#0000ff",
  "blueviolet": "#8a2be2",
  "brown": "#a52a2a",
  "burlywood": "#deb887",
  "cadetblue": "#5f9ea0",
  "chartreuse": "#7fff00",
  "chocolate": "#d2691e",
  "coral": "#ff7f50",
  "cornflowerblue": "#6495ed",
  "cornsilk": "#fff8dc",
  "crimson": "#dc143c",
  "cyan": "#00ffff",
  "darkblue": "#00008b",
  "darkcyan": "#008b8b",
  "darkgoldenrod": "#b8860b",
  "darkgray": "#a9a9a9",
  "darkgreen": "#006400",
  "darkgrey": "#a9a9a9",
  "darkkhaki": "#bdb76b",
  "darkmagenta": "#8b008b",
  "darkolivegreen": "#556b2f",
  "darkorange": "#ff8c00",
  "darkorchid": "#9932cc",
  "darkred": "#8b0000",
  "darksalmon": "#e9967a",
  "darkseagreen": "#8fbc8f",
  "darkslateblue": "#483d8b",
  "darkslategray": "#2f4f4f",
  "darkslategrey": "#2f4f4f",
  "darkturquoise": "#00ced1",
  "darkviolet": "#9400d3",
  "deeppink": "#ff1493",
  "deepskyblue": "#00bfff",
  "dimgray": "#696969",
  "dimgrey": "#696969",
  "dodgerblue": "#1e90ff",
  "firebrick": "#b22222",
  "floralwhite": "#fffaf0",
  "forestgreen": "#228b22",
  "fuchsia": "#ff00ff",
  "gainsboro": "#dcdcdc",
  "ghostwhite": "#f8f8ff",
  "gold": "#ffd700",
  "goldenrod": "#daa520",
  "gray": "#808080",
  "green": "#008000",
  "greenyellow": "#adff2f",
  "grey": "#808080",
  "honeydew": "#f0fff0",
  "hotpink": "#ff69b4",
  "indianred": "#cd5c5c",
  "indigo": "#4b0082",
  "ivory": "#fffff0",
  "khaki": "#f0e68c",
  "lavender": "#e6e6fa",
  "lavenderblush": "#fff0f5",
  "lawngreen": "#7cfc00",
  "lemonchiffon": "#fffacd",
  "lightblue": "#add8e6",
  "lightcoral": "#f08080",
  "lightcyan": "#e0ffff",
  "lightgoldenrodyellow": "#fafad2",
  "lightgray": "#d3d3d3",
  "lightgreen": "#90ee90",
  "lightgrey": "#d3d3d3",
  "lightpink": "#ffb6c1",
  "lightsalmon": "#ffa07a",
  "lightseagreen": "#20b2aa",
  "lightskyblue": "#87cefa",
  "lightslategray": "#778899",
  "lightslategrey": "#778899",
  "lightsteelblue": "#b0c4de",
  "lightyellow": "#ffffe0",
  "lime": "#00ff00",
  "limegreen": "#32cd32",
  "linen": "#faf0e6",
  "magenta": "#ff00ff",
  "maroon": "#800000",
  "mediumaquamarine": "#66cdaa",
  "mediumblue": "#0000cd",
  "mediumorchid": "#ba55d3",
  "mediumpurple": "#9370db",
  "mediumseagreen": "#3cb371",
  "mediumslateblue": "#7b68ee",
  "mediumspringgreen": "#00fa9a",
  "mediumturquoise": "#48d1cc",
  "mediumvioletred": "#c71585",
  "midnightblue": "#191970",
  "mintcream": "#f5fffa",
  "mistyrose": "#ffe4e1",
  "moccasin": "#ffe4b5",
  "navajowhite": "#ffdead",
  "navy": "#000080",
  "oldlace": "#fdf5e6",
  "olive": "#808000",
  "olivedrab": "#6b8e23",
  "orange": "#ffa500",
  "orangered": "#ff4500",
  "orchid": "#da70d6",
  "palegoldenrod": "#eee8aa",
  "palegreen": "#98fb98",
  "paleturquoise": "#afeeee",
  "palevioletred": "#db7093",
  "papayawhip": "#ffefd5",
  "peachpuff": "#ffdab9",
  "peru": "#cd853f",
  "pink": "#ffc0cb",
  "plum": "#dda0dd",
  "powderblue": "#b0e0e6",
  "purple": "#800080",
  "rebeccapurple": "#663399",
  "red": "#ff0000",
  "rosybrown": "#bc8f8f",
  "royalblue": "#4169e1",
  "saddlebrown": "#8b4513",
  "salmon": "#fa8072",
  "sandybrown": "#f4a460",
  "seagreen": "#2e8b57",
  "seashell": "#fff5ee",
  "sienna": "#a0522d",
  "silver": "#c0c0c0",
  "skyblue": "#87ceeb",
  "slateblue": "#6a5acd",
  "slategray": "#708090",
  "slategrey": "#708090",
  "snow": "#fffafa",
  "springgreen": "#00ff7f",
  "steelblue": "#4682b4",
  "tan": "#d2b48c",
  "teal": "#008080",
  "thistle": "#d8bfd8",
  "tomato": "#ff6347",
  "turquoise": "#40e0d0",
  "violet": "#ee82ee",
  "wheat": "#f5deb3",
  "white": "#ffffff",
  "whitesmoke": "#f5f5f5",
  "yellow": "#ffff00",
  "yellowgreen": "#9acd32"
}

let flexmenu, hambutton, menuitems, maincontent;


function reset_colours() {

    document.cookie = `--sel-color=aqua;max-age=60*60*24*30`;
    document.cookie = `--bg-color=steelblue;max-age=60*60*24*30`;
    document.cookie = `--fg-color=aliceblue;max-age=60*60*24*30`;
    setTimeout(() => {
        flexmenu.setAttribute('sel-color', 'aqua');
        flexmenu.setAttribute('bg-color', 'steelblue');
        flexmenu.setAttribute('fg-color', 'aliceblue');
        document.documentElement.style.setProperty('--sel-color', 'aqua');
        document.documentElement.style.setProperty('--bg-color', 'steelblue');
        document.documentElement.style.setProperty('--fg-color', 'aliceblue');
        const choices = ['cbo-menu-text-colour', 
        'cbo-header-footer-background', 
        'cbo-menu-background-colour'];
        document.querySelector(`#${choices[0]}`).value = colours['aliceblue'];
        document.querySelector(`#${choices[1]}`).value = colours['steelblue'];
        document.querySelector(`#${choices[2]}`).value = colours['aqua'];
    }, 10);
}

function get_cookieobj() {
    const obj = {};
    const keyvalues = document.cookie.split(/;\s*/);
    if (!keyvalues.length) {
        return obj;
    }
    keyvalues.forEach((kv) => {
        const arr = kv.split('=');
        if (arr.length !== 2) {
            return;
        }
        const [k, v] = arr;

        obj[k.trim()] = v.trim();
    });
    return obj;
}

function config() {
    const cookie_obj = get_cookieobj();

    if (cookie_obj['--sel-color']) {
        document.documentElement.style.setProperty('--sel-color', cookie_obj['--sel-color']);        
    }

    if (cookie_obj['--bg-color']) {
        document.documentElement.style.setProperty('--bg-color', cookie_obj['--bg-color']);        
    }

    if (cookie_obj['--fg-color']) {
        document.documentElement.style.setProperty('--fg-color', cookie_obj['--fg-color']);        
    }

    if (flexmenu) {
        flexmenu.setAttribute('sel-color', cookie_obj['--sel-color'] || 'aqua');
        flexmenu.setAttribute('bg-color', cookie_obj['--bg-color'] || 'steelblue');
        flexmenu.setAttribute('fg-color', cookie_obj['--fg-color'] || 'aliceblue');
    }

    const styles = getComputedStyle(document.documentElement);
    const selectedColour = styles.getPropertyValue('--sel-color');
    const backgroundColour = styles.getPropertyValue('--bg-color');
    const menuTitle = styles.getPropertyValue('--fg-color');
    const backgroundHover = styles.getPropertyValue('--sel-color');

    const cboHeaderFooterBackground = document.querySelector('#cbo-header-footer-background');
    // const cboSelectedColour = document.querySelector('#cbo-selected-item');
    const cboMenuTextColor = document.querySelector('#cbo-menu-text-colour');
    const cboMenuBackgroundColor = document.querySelector('#cbo-menu-background-colour');

    if (cboHeaderFooterBackground) {
        const elements = [/*[cboSelectedColour, selectedColour, '--selected'], */
        [cboHeaderFooterBackground, backgroundColour, '--bg-color'], 
        [cboMenuTextColor, menuTitle, '--fg-color'],
        [cboMenuBackgroundColor, backgroundHover, '--sel-color']
        ];

        elements.forEach( ([cbo, value, property]) => {
            // cbo.replaceChildren();
            for (const color of Object.keys(colours).sort()) {
                const newOption = document.createElement('option');
                newOption.value = colours[color];
                const span = `<span class="two-rem" style="background: ${colours[color]};"></span> `
                newOption.innerHTML = `${span}<span>${color[0].toUpperCase()}${color.slice(1).toLowerCase()}</span>`;
                cbo.appendChild(newOption);
            }
            for (let i = 0; i < cbo.children.length; i += 1) {
                const option = cbo.children[i];
                if (option.value === colours[value] || option.value === value) {
                    option.selected = true;
                    break;
                }
            }

            cbo.addEventListener('change', ev => {
                document.cookie = `${property}=${ev.target.value};max-age=60*60*24*30`;
                // console.log('Setting property', property, 'to value', ev.target.value);
                let strippedProp = property.replace('--', '');
                flexmenu.setAttribute(strippedProp, ev.target.value);
                document.documentElement.style.setProperty(property, ev.target.value);
                document.cookie = `${property}=${ev.target.value};max-age=60*60*24*30`;
            })
        });
    }
}


///////////////////////////////////////////////////////////////////////////////////////////



document.addEventListener("DOMContentLoaded", () => {
    console.log("Document loaded.");
    flexmenu = document.querySelector('#test-elem');
    hambutton = flexmenu?.shadowRoot.querySelector('hamburger-button');
    menuitems = document.querySelectorAll('menu-item');
    maincontent = document.querySelector('.main');
    hambutton?.addEventListener('hamburger-toggle', () => console.info(`Hamburger toggled: ${hambutton.isopen ? "open" : "closed"}`));
    menuitems.forEach(mi => mi.addEventListener('click', ev => {
        console.info(`Click on '${ev.currentTarget.textContent}'`);
        const href = ev.currentTarget.getAttribute('href');
        if (!href.startsWith('#all')) { 
            location.hash = href;
        } else {
            if (href === '#all') {
                showAllTemplates();
            }
        }
        menuitems.forEach(item => item.unselect());
        ev.currentTarget.select();
    }));
    const hashChange = () => {
        let hash = location.hash;
        if (!hash) {
            hash = '#home';
        }
        if (hash === '#all') {
            document.querySelector('menu-item[href="#all"]').select();
            showAllTemplates();
            return;
        }
        if (hash === '#configuration') {
            const configElement = document.querySelector('#configuration');
            maincontent.innerHTML = '';
            if (configElement) {
                maincontent.appendChild(configElement.content.cloneNode(true));
                config();
            }
            return;
        }

        const template = document.querySelector(hash) ? document.querySelector(hash) : null;
        if (template) {
            maincontent.innerHTML = '';
            maincontent.appendChild(template.content.cloneNode(true));
            if (location.hash === '#configuration') {
                config();
            }
        } else {
            maincontent.innerHTML = `<h3><span class="fgred bold">404&nbsp;</span>Content not found for: <span class="fgred bold">${location.hash.slice(1)}</span></h3>`;
        } 
        const selectedMenuItem = document.querySelector(`menu-item[href="${location.hash}"]`);
        if (selectedMenuItem) {
            menuitems.forEach(item => item.unselect());
            selectedMenuItem.select();
        }  
    };
    const showAllTemplates = () => {
        // alert("Showing all documentation together.");
        maincontent.innerHTML = '';
        const items = document.querySelectorAll('menu-list[menu-title="Docs"] menu-item:not([href="#all"])');
        let templatesToShow = [];
        items.forEach(item => {
            const href = item.getAttribute('href');
            const template = document.querySelector(href);
            if (template) {
                templatesToShow.push(template);
            }
        });
        templatesToShow.forEach(template => {
            const section = document.createElement('section');
            section.appendChild(template.content.cloneNode(true));
            maincontent.appendChild(section);
        });
        location.hash = '#all';
    };

    window.addEventListener('hashchange', hashChange);
    hashChange();
    config();
});