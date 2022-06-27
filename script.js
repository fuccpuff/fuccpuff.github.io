function e(selector) {
    return document.querySelector(selector);
}

function setAnimated(el) {
    // Sets class .animated to one element(you can pass selector either element)
    if (el instanceof Element)
        el.classList.add('animated')
    else
        e(el).classList.add('animated')
}

function setAnimatedList(selectors) {
    // You pass here an array like this: [['.example', 200], '#example2', ['#example3', 400]]
    // This function will set class .animated to all elements, if it is in array, then
    // first element is selector, second is delay, if element is not an array, then delay
    // is set to zero
    selectors.forEach(el => {
        if (el instanceof Array)
            setTimeout(() => e(el[0]).classList.add('animated'), el[1])
        else
            e(el).classList.add('animated')
    })
}

let poss_elements = document.querySelectorAll('.possibility_element');
let length = poss_elements.length

poss_elements.forEach((item, index) => {
    item.addEventListener('mouseover', e => {
        item.classList.add('hovered')
        focus(item, index);
    })
    item.addEventListener("mouseleave", (e) => {
        poss_elements.forEach((item) => {
            item.classList.remove('hovered')
            item.style.transform = "scale(1) translateY(0px)";
            item.style.margin = '0 10px';
        });
    });
});

function focus(elem, index) {
    let prev = index - 1;
    let prev1 = index - 2;
    let next = index + 1;
    let next2 = index + 2;

    elem.style.transform = "scale(1.7)";
    try {
        poss_elements[prev].style.transform = "scale(1.3)";
        poss_elements[prev].style.margin = '0 40px';
    } catch {}
    try {
        poss_elements[prev1].style.transform = "scale(1.1)";
    } catch {}
    try {
        poss_elements[next].style.transform = "scale(1.3)";
        poss_elements[next].style.margin = '0 40px';
    } catch {}
    try {
        poss_elements[next2].style.transform = "scale(1.1)";
    } catch {}
}

function closeNewCases() {
    document.querySelector('#new_cases').style.opacity = '0';
    setTimeout(() => {
        document.querySelector('#new_cases').style.display = 'none'
    }, 200)
}

const elemStartAnimationDelayY = 200;

function animate() {
    // bottomAnimations.forEach(el => {
    //     console.log(window.innerHeight - elemStartAnimation)
    //     if (el.getBoundingClientRect().top < window.innerHeight - el.dataset['startAnimation']) {
    //         el.classList.add('animated')
    //         delete bottomAnimations[bottomAnimations.indexOf(el)]
    //     }
    // })
    Object.keys(elementsReachFunctions).forEach(el => {
        if (el < window.scrollY + window.innerHeight - elementsReachFunctions[el].delayY) {
            elementsReachFunctions[el].func();
            delete elementsReachFunctions[el];
        }
    })
}

let elementsReachFunctions = {}

document.addEventListener("scroll", animate)

function getAbsoluteElementTop(el) {
    return el.getBoundingClientRect().top + window.scrollY;
}

function onReachElement(el, func, passElement=true, delayY=elemStartAnimationDelayY) {
    let top = getAbsoluteElementTop(el)
    while (top in elementsReachFunctions) {
        top++;
    }
    if (passElement)
        elementsReachFunctions[top] = {delayY: delayY, func: () => {func(el)}};
    else
        elementsReachFunctions[top] = {delayY: delayY, func: func};
}

function runBlockAnimations(el) {
    el.querySelectorAll('.animation').forEach(el => {
        if ('delay' in el.dataset)
            setTimeout(() => setAnimated(el), parseInt(el.dataset['delay']))
        else
            setAnimated(el)
    })
}

window.onload = () => {
    document.querySelectorAll('.animated_block').forEach(el => {
        let blockDelay = 0;
        if ('blockDelay' in el.dataset)
            blockDelay = el.dataset['blockDelay']
        onReachElement(el, runBlockAnimations, true, blockDelay);
    })
    animate()
}

document.querySelectorAll('.economy_element').forEach(el => {
    let mouseEnter = 0;
    el.addEventListener('mouseenter', () => {
        mouseEnter = new Date().getTime()
        el.querySelector('.economy_animation_element').classList.add('wiggle_animation')
    })
    el.addEventListener('mouseleave', () => {
        let thistime = new Date().getTime()
        if (mouseEnter + 1000 > thistime)
        setTimeout(() => el.querySelector('.economy_animation_element').classList.remove('wiggle_animation'), 1000 - thistime + mouseEnter)
        else el.querySelector('.economy_animation_element').classList.remove('wiggle_animation')
    })
})

document.querySelectorAll('.check').forEach(el => {
    let mouseEnter = 0;
    el.addEventListener('mouseenter', () => {
        mouseEnter = new Date().getTime()
        el.querySelector('.bell').classList.add('wiggle_animation')
    })
    el.addEventListener('mouseleave', () => {
        let thistime = new Date().getTime()
        if (mouseEnter + 1000 > thistime)
            setTimeout(() => el.querySelector('.bell').classList.remove('wiggle_animation'), 1000 - thistime + mouseEnter)
        else el.querySelector('.bell').classList.remove('wiggle_animation')
    })
})

// wiggling for possibility elements
// document.querySelectorAll('.possibility_element').forEach(el => {
//     let mouseEnter = 0;
//     el.addEventListener('mouseenter', () => {
//         mouseEnter = new Date().getTime()
//         el.querySelector('img').classList.add('wiggle_animation')
//     })
//     el.addEventListener('mouseleave', () => {
//         let thistime = new Date().getTime()
//         if (mouseEnter + 1000 > thistime)
//             setTimeout(() => el.querySelector('img').classList.remove('wiggle_animation'), 1000 - thistime + mouseEnter)
//         else el.querySelector('img').classList.remove('wiggle_animation')
//     })
// })

document.querySelector('.logo').addEventListener('mouseenter', () => {
    document.querySelector('.logo').classList.add('hovered')
})

document.querySelector('.logo').addEventListener('mouseleave', () => {
    document.querySelector('.logo').classList.remove('hovered')
})