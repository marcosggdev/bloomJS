import nav from '@/data/nav.json'

function generateNavbar() {

    const windowTools =         {
        name: "File",
        dropdown: "true",
        subLinks: [
            {
                name: "New",
                callback: {
                    identifier: "newFile",
                    args: {

                    }
                }
            },
            {
                name: "Open",
                callback: {
                    identifier: "openFile",
                    args: {

                    }
                }
            },
            {
                name: "Save",
                callback: {
                    identifier: "saveFile",
                    args: {

                    }
                }
            },
            {
                name: "Save As",
                callback: {
                    identifier: "saveFileAs",
                    args: {

                    }
                }
            }
        ]
    };

    const navigation = {
        name: 'Navigate',
        dropdown: true,
        subLinks: []
    };

    Array.from(nav).forEach(navObj => {
        navigation.subLinks.push({
            name: navObj.name,
            callback: {
                identifier: 'nav',
                args: {
                    path: navObj.href
                }
            }
        });
    });

    const navbar = [];
    navbar.push(windowTools);
    navbar.push(navigation);
    return navbar;

}

export var navbar = generateNavbar();