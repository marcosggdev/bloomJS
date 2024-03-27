/**
 * Adjusts the css right and left properties of a box to avoid overflow into his parent node
 * @param {*} box 
 * @param {*} parent 
 */
export function useAdjustBoxToParent(box, parent) {
    if (!boxIsContained(box, parent)) {
        adjustRight(box, parent);
    }
}

/**
 * Checks wether the a html element is contained or not into the b html element
 * @param {*} a HTML element
 * @param {*} b HTML element
 * @returns 
 */
function boxIsContained(a, b) {

    const innerBox = {
        top: a.getBoundingClientRect().top,
        bottom: a.getBoundingClientRect().bottom,
        left: a.getBoundingClientRect().left,
        right: a.getBoundingClientRect().right
    }

    const boundingBox = {
        top: b.getBoundingClientRect().top,
        bottom: b.getBoundingClientRect().bottom,
        left: b.getBoundingClientRect().left,
        right: b.getBoundingClientRect().right
    }

    if (innerBox.left > boundingBox.left && innerBox.right < boundingBox.right && innerBox.top > boundingBox.top 
        && innerBox.bottom < boundingBox.bottom) {
        return true;
    }

    return false;

}

/**
 * Checks intersection between 2 html elements
 * @param {*} a HTML element
 * @param {*} b Html element
 * @returns 
 */
function boxIntersection(a, b) {
    return (Math.abs((a.getBoundingClientRect().left + a.getBoundingClientRect().width / 2) - (b.getBoundingClientRect().left + b.getBoundingClientRect().width / 2)) * 2 < (a.getBoundingClientRect().width + b.getBoundingClientRect().width)) &&
        (Math.abs((a.getBoundingClientRect().top + a.getBoundingClientRect().height / 2) - (b.getBoundingClientRect().top + b.getBoundingClientRect().height / 2)) * 2 < (a.getBoundingClientRect().height + b.getBoundingClientRect().height));
}

/**
 * Adjusts the left and right css values of the inner box to avoid a bounding box overflow
 * @param {*} box Inner box 
 * @param {*} parent Bounding box
 */
function adjustRight (box, parent) {
    let diff = Math.abs(box.getBoundingClientRect().right - parent.getBoundingClientRect().right);
    if (diff < parent.getBoundingClientRect().width) {
        box.style.right = "auto";
        box.style.left = `-${diff}px`;
    }
}

/**
 * Unfolds a node and manages the adjustment neccesary to make sure the innerbox doesnt overflow the bounding one
 * @param {*} node Inner box 
 * @param {*} parent Bounding box
 */
export function useUnfold(node, parent) {
    node.classList.add('unfolded');
    setTimeout(() => { useAdjustBoxToParent(node, parent) }, 250 + 50); //50ms more than animation duration
}