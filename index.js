
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
        location.hash = ev.currentTarget.getAttribute('href');
        menuitems.forEach(item => item.unselect());
        ev.currentTarget.select();
    }));
    const hashChange = () => {
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

    window.addEventListener('hashchange', hashChange);
    hashChange();
});