/**
 * Scans the whole document looking for nodes that have a class of the form scroll-control...
 * To that elements, the script removes that class and adds the effective animation class that is contained
 * only when the element appears on the screen. After doing the animation, the window scroll event is eliminated
 * to avoid waste of resources
 * @element Html container node within which we will look for animated elements
 */
export function useScrollControllers (element) {

    const nodes = element.querySelectorAll("*[class*='scroll-control']");

    Array.from(nodes).forEach(node => {

        const classes = node.classList.value.split(' ');

        Array.from(classes).forEach(c => {

            if (c.startsWith('scroll-control')) {

                const animationClass = c.split('scroll-control')[1].slice(1);
                node.classList.remove(c);
                useScrollControllerOnce(node, animationClass);

            }

        });

    });

}

export function useScrollControllerOnce (element, animationClass) {

    const callback = () => {

        if (element.getBoundingClientRect().top < window.innerHeight && element.getBoundingClientRect().bottom > 0) {
            element.classList.add(animationClass);
            window.removeEventListener('scroll', callback);
        }

    };

    //call once in case page was reloaded
    callback();
    window.addEventListener('scroll', callback);

}

export function useScrollController (element, animationClass) {

    window.addEventListener('scroll', () => {

        if (element.getBoundingClientRect().top < window.innerHeight && element.getBoundingClientRect().bottom > 0) {
            element.classList.add(animationClass);
        } else {
            element.classList.remove(animationClass);
        }
    });
}