export function useAdjustBoxToParent(box, parent) {
    boxIsContained(box, parent);
}

function boxIsContained(child, parent) {

    const innerBox = {
        top: child.getBoundingClientRect().top,
        bottom: child.getBoundingClientRect().bottom,
        left: child.getBoundingClientRect().left,
        right: child.getBoundingClientRect().right
    }

    const boundingBox = {
        top: parent.getBoundingClientRect().top,
        bottom: parent.getBoundingClientRect().bottom,
        left: parent.getBoundingClientRect().left,
        right: parent.getBoundingClientRect().right
    }

    console.log(innerBox);
    console.log(boundingBox);

    if (innerBox.left > boundingBox.left && innerBox.right < boundingBox.right && innerBox.top > boundingBox.top 
        && innerBox.bottom < boundingBox.bottom) {
        console.log('fully contained');
    } else {
        console.log('not fully contained');
    }

}

function boxIntersection(a, b) {
    return (Math.abs((a.getBoundingClientRect().left + a.getBoundingClientRect().width / 2) - (b.getBoundingClientRect().left + b.getBoundingClientRect().width / 2)) * 2 < (a.getBoundingClientRect().width + b.getBoundingClientRect().width)) &&
        (Math.abs((a.getBoundingClientRect().top + a.getBoundingClientRect().height / 2) - (b.getBoundingClientRect().top + b.getBoundingClientRect().height / 2)) * 2 < (a.getBoundingClientRect().height + b.getBoundingClientRect().height));
}

export function unfold(node, parent) {
    console.log(node.getBoundingClientRect().width);
    node.classList.add('unfolded');
    setTimeout(() => { useAdjustBoxToParent(node, parent) }, 260); //10ms more than animation duration
}