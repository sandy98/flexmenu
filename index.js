
let flexmenu, hambutton, menuitems, maincontent;

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
        if (location.hash === '#all') {
            document.querySelector('menu-item[href="#all"]').select();
            showAllTemplates();
            return;
        }
        const template = document.querySelector(location.hash) ? document.querySelector(location.hash) : null;
        if (template) {
            maincontent.innerHTML = '';
            maincontent.appendChild(template.content.cloneNode(true));
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
});