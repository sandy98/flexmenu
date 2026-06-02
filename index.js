
let flexmenu, hambutton;

document.addEventListener("DOMContentLoaded", () => {
    console.log("Document loaded.");
    flexmenu = document.querySelector('#test-elem');
    hambutton = flexmenu?.shadowRoot.querySelector('hamburger-button');
    menuitem = document.querySelectorAll('menu-item')[0];
    hambutton?.addEventListener('hamburger-toggle', () => console.info(`Hamburger toggled: ${hambutton.isopen ? "open" : "closed"}`));
    document.querySelectorAll('menu-item').forEach(mi => mi.addEventListener('click', ev => {
        console.info(`Click on '${ev.currentTarget.textContent}'`);
    }));
    const hashChange = () => {
        const content = location.hash.length > 1 ? 
            `${location.hash[1].toUpperCase()}${location.hash.slice(2)}` : "#";
        document.querySelector('#loc-hash').textContent = content;
        // document.querySelector('menu-item').unselect();
        // if (content === "#") document.querySelectorAll('menu-item').forEach(mi => mi.unselect());
    };

    window.addEventListener('hashchange', hashChange);
    hashChange();
});