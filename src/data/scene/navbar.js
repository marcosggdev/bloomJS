import nav from '@/data/nav.json'

function generateNavbar () {
    const navbar = [];
    navbar.push(
    {
        "name": "File",
        "dropdown": "true",
        "subLinks": [
            {
                "name": "New",
                "callback": "newFile"
            },
            {
                "name": "Open",
                "callback": "openFile"
            },
            {
                "name": "Save",
                "callback": "saveFile"
            },
            {
                "name": "Save As",
                "callback": "saveFileAs"
            }
        ]
    }
    );

    const navigate = {
        name: 'Navigate',
        dropdown: true,
        subLinks: []
    };

    Array.from(nav).forEach(navObj => {
        navigate.subLinks.push({
            name: navObj.name,
            callback: () => { $router.push(navObj.href) }
        });
    });

    navbar.push(navigate);

    return navbar;

}

export var navbar = generateNavbar();