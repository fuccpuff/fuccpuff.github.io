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
        if (window.innerWidth > 1680)
            focus(item, index);
    })
    item.addEventListener("mouseleave", (e) => {
        // document.querySelector('#possibility_block').style.marginLeft = '0'
        poss_elements.forEach((item) => {
            item.classList.remove('hovered')
            item.style.transform = "scale(1) translateY(0px)";
            item.style.margin = '0 10px';
        });
    });
});

let service_team_elements = document.querySelectorAll('.member');
service_team_elements.forEach((item, index) => {
    item.addEventListener('mouseover', e => {
        item.classList.add('hovered')
    })
    item.addEventListener("mouseleave", (e) => {
        item.classList.remove('hovered')
    });
})

function focus(elem, index) {
    let prev = index - 1;
    let prev1 = index - 2;
    let next = index + 1;
    let next2 = index + 2;

    elem.style.transform = "scale(1.7)";
    elem.style.margin = "0 80px"

    // if (index != 0)
    //     document.querySelector('#possibility_block').style.marginLeft = '-100px'
    try {
        poss_elements[prev].style.transform = "scale(1.3)";
        poss_elements[prev].style.margin = '0 40px';
    } catch {
    }
    try {
        poss_elements[prev1].style.transform = "scale(1.1)";
    } catch {
    }
    try {
        poss_elements[next].style.transform = "scale(1.3)";
        poss_elements[next].style.margin = '0 40px';
    } catch {
    }
    try {
        poss_elements[next2].style.transform = "scale(1.1)";
    } catch {
    }
}

SmoothScroll({
    // ?????????? ?????????????? 400 = 0.4 ??????????????
    animationTime: 1000,
    // ???????????? ???????? ?? ????????????????
    stepSize: 25,
    // ???????????????????????????? ??????????????????:
    // ??????????????????
    accelerationDelta: 30,
    // ???????????????????????? ??????????????????
    accelerationMax: 2,
    // ?????????????????? ????????????????????
    keyboardSupport: true,
    // ?????? ?????????????? ?????????????????? ???? ???????????????????? ?? ????????????????
    arrowScroll: 50,
    // Pulse (less tweakable)
    // ratio of "tail" to "acceleration"
    pulseAlgorithm: true,
    pulseScale: 4,
    pulseNormalize: 1,
    // ?????????????????? ??????????????
    touchpadSupport: true,
})

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

function onReachElement(el, func, passElement = true, delayY = elemStartAnimationDelayY) {
    let top = getAbsoluteElementTop(el)
    while (top in elementsReachFunctions) {
        top++;
    }
    if (passElement)
        elementsReachFunctions[top] = {
            delayY: delayY, func: () => {
                func(el)
            }
        };
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

// let parallax = new Rellax('.parallax');

document.addEventListener('DOMContentLoaded', () => {
    var controller = new ScrollMagic.Controller();

    function addTween(element, animation, triggerElement, duration, offset, from) {
        let tween = new TweenMax.fromTo(element, 1, from, animation);
        new ScrollMagic.Scene({triggerElement: triggerElement, duration: duration, offset: offset})
            .setTween(tween)
            // .addIndicators({name: "tween css class"}) // add indicators (requires plugin)
            .addTo(controller);
    }

    function addTweenTriggerZero(element, animation, triggerElement, duration, offset, from) {
        let tween = new TweenMax.fromTo(element, 1, from, animation);
        new ScrollMagic.Scene({triggerElement: triggerElement, duration: duration, offset: offset, triggerHook: 0})
            .setTween(tween)
            // .addIndicators({name: "tween css class"}) // add indicators (requires plugin)
            .addTo(controller);
    }

    let scale1 = {transform: 'scale(1)'}
    let translateX0 = {transform: 'translateX(0)'}
    let bottomAnimation = {transform: 'translateY(0)', opacity: 1}
    let opacity1 = {opacity: 1}
    let docAnimation = {transform: 'scale(1) rotate(0)'}

    let scale0 = {transform: 'scale(0)'}
    let beforeBottomAnimation = {transform: 'translateY(50px)', opacity: 0}
    let opacity0 = {opacity: 0}


    // addTween("#screen1_container", scale1, '#second_block', 550, -50, scale0)

    // ??????????: "?????????????????? ???? ???????????????????? ?? ????????????????????"
    addTween("#economy_number", scale1, '#economy_block', 600, -150, scale0)
    addTween("#economy_percent", scale1, '#economy_block', 600, -150, scale0)
    addTween("#warehouses_top", {transform: 'translateX(-24px) translateY(0)'}, '#economy_block', 700, 100, {transform: 'translateX(-24px) translateY(-155px)'})
    addTween("#retail_space_cart", {transform: 'translateY(0)'}, '#economy_block', 500, 100, {transform: 'translateY(-200px)'})
    addTween("#economy_office", {transform: 'translateY(0)'}, '#economy_block', 600, 100, {transform: 'translateY(-155px)'})
    addTween("#economy_info", scale1, '#economy_block', 450, 0, scale0)

    // ??????????: "?????? ?????????????? ?? ?????????? ??????????"
    addTween("#sm2", bottomAnimation, '#objects_in_one_place', 900, -400, beforeBottomAnimation)
    addTween("#sm3", bottomAnimation, '#objects_in_one_place', 800, -300, beforeBottomAnimation)
    addTween(".windows_animation", bottomAnimation, '#objects_in_one_place', 400, -50, beforeBottomAnimation)
    addTween("#object_info", {transform: 'translateX(0)'}, '#objects_in_one_place', 200, -200, {transform: 'translateX(100vw)'})
    addTween("#vector_img", {transform: 'translateY(0)'}, '#objects_in_one_place', 400, 0, {transform: 'translateY(100vw)'})

    // addTween('#vector_img', {transform: 'rotate(0)'}, '#objects_in_one_place', 0, 400, {transform: 'rotate(20deg)'})

    function newWiggle(element, triggerElement, offset) {
        let wiggleTween = new TimelineMax()
            .to(element, 0.2, {transform: 'rotate(20deg)'})
            .to(element, 0.2, {transform: 'rotate(-20deg)'})
            .to(element, 0.2, {transform: 'rotate(0)'})

        new ScrollMagic.Scene({triggerElement: triggerElement, offset: offset})
            .setTween(wiggleTween)
            .addTo(controller)
    }

    newWiggle('#vector_img', '#objects_in_one_place', 400)

    addTween("#bradley1", {opacity: 1}, '#objects_in_one_place', 300, -100, opacity0)
    addTween("#cells_img_cadastral", {opacity: 1}, '#objects_in_one_place', 250, -150, opacity0)
//  addTween("#cells_img_important", opacity1, '#objects_in_one_place', 200, 200, opacity0)

    // ??????????: "???????????? ????????????????????"
    addTween("#sm5", bottomAnimation, '#profit_analysis', 650, -400, beforeBottomAnimation)
    addTween("#sm6", bottomAnimation, '#profit_analysis', 450, -200, beforeBottomAnimation)
    addTween("#count_object", {transform: 'translateX(0)'}, '#profit_analysis', 300, -50, {transform: 'translateX(-100vw)'})
//  addTween("#bradley3", opacity1, '#profit_analysis', 200, -100)
//  addTween("#bradley4", opacity1, '#profit_analysis', 300, -100) 
//  addTween("#cells_count_1", opacity1, '#profit_analysis', 100, -150)
//  addTween("#cells_count_2", opacity1, '#profit_analysis', 100, -150) 

    // ??????????: "???????????????? ????????????????????????"
    addTween("#sm8", bottomAnimation, '#contragents', 750, -400, beforeBottomAnimation)
    addTween("#sm9", bottomAnimation, '#contragents', 700, -350, beforeBottomAnimation)
    addTween("#sm10", bottomAnimation, '#contragents', 350, 0, beforeBottomAnimation)
    addTween("#cool_img", bottomAnimation, '#contragents', 400, -50, beforeBottomAnimation)
//  addTween("#bradley5", opacity1, '#contragents', 200, -100)
    addTween("#bradley6", {opacity: 1}, '#contragents', 350, -100, {opacity: 0})
    addTween("#check_cells", {opacity: 1}, '#contragents', 250, -150, {opacity: 0})
//  addTween("#ilya_cells", opacity1, '#contragents', 250, -150)
    addTween("#info_cadastral_container", {transform: 'translateX(0)'}, '#contragents', 350, 100, {transform: 'translateX(150vw)'})

    // ?????????? "?????????????? ?? ?????????????? ?? ???????? ????????"
    addTween("#sm12", bottomAnimation, '#references', 500, -300, beforeBottomAnimation)
    addTween("#sm13", bottomAnimation, '#references', 450, -250, beforeBottomAnimation)
    addTween("#clap_img", bottomAnimation, '#references', 400, -200, beforeBottomAnimation)
    addTween("#andrey_references", {opacity: 1}, '#references', 350, -150, {opacity: 0})
    addTween("#egrn", {transform: 'translateX(0)'}, '#references', 300, -100, {transform: 'translateX(-100vw)'})
    addTween("#make_reference", {transform: 'translateX(0)'}, '#references', 150, 50, {transform: 'translateX(-100vw)'})
    addTween("#references_img", {transform: 'translateY(0)'}, '#references', 400, -160, {transform: 'translateY(100vw)'})

    newWiggle('#references_img', '#references', 240)

    // ??????????: "???????????????????? ?????????????????????? ????????????????????"
    addTween("#sm15", bottomAnimation, '#actual_information', 700, -300, beforeBottomAnimation)
    addTween("#sm16", bottomAnimation, '#actual_information', 650, -250, beforeBottomAnimation)
    addTween("#juridical_info_img", {transform: 'translateY(0)'}, '#actual_information', 600, -50, {transform: 'translateY(100vw)'})

    newWiggle('#juridical_info_img', '#actual_information', 550)

    addTween("#regulations", {transform: 'translateX(0)'}, '#actual_information', 550, -150, {transform: 'translateX(100vw)'})
    addTween(".doc_animation_1", docAnimation, '#actual_information', 400, 0, {transform: 'scale(0) rotate(-21.62deg)'})
    addTween(".doc_animation_2", docAnimation, '#actual_information', 400, 0, {transform: 'scale(0) rotate(-27.57deg)'})
//  addTween(".doc_animation_3", docAnimation, '#actual_information', 200, 60)
//  addTween(".doc_animation_4", docAnimation, '#actual_information', 200, 80)

    // ??????????: "???????????????? ???????????? ???? ?????????? ????????????????????"
    addTween("#sm18", bottomAnimation, '#checks', 800, -400, beforeBottomAnimation)
    addTween("#sm19", bottomAnimation, '#checks', 750, -350, beforeBottomAnimation)
    addTween("#headblow_img", bottomAnimation, '#checks', 400, 0, beforeBottomAnimation)
    addTween("#sm20", scale1, '#checks', 500, -100, {transform: 'scale(0)'})
    addTween("#sm21", scale1, '#checks', 450, -50, {transform: 'scale(0)'})
    addTween("#sm22", scale1, '#checks', 400, 0, {transform: 'scale(0)'})
    addTween("#lightning", scale1, '#checks', 600, -200, {transform: 'scale(0)'})

    // ??????????: "???????? ???????????? - ???????? ??????????????"
    addTween("#sm23", bottomAnimation, '#service_team', 300, -250, beforeBottomAnimation)
    addTween("#sm24", bottomAnimation, '#service_team', 300, 25, beforeBottomAnimation)
    addTween("#sm25", bottomAnimation, '#service_team', 300, 100, beforeBottomAnimation)
    addTween("#sm26", bottomAnimation, '#service_team', 300, 175, beforeBottomAnimation)
    addTween("#sm27", bottomAnimation, '#service_team', 300, 250, beforeBottomAnimation)
    addTween("#sm28", bottomAnimation, '#service_team', 300, 325, beforeBottomAnimation)
    addTween("#sm29", bottomAnimation, '#service_team', 300, 400, beforeBottomAnimation)

    addTween('#economy_office_spaces_static', {transform: 'translateX(0)'}, '#economy_block', 220, 20, {transform: 'translateX(-100vw)'})
    addTween('#warehouses_static', {transform: 'translateX(0)'}, '#economy_block', 180, 80, {transform: 'translateX(-100vw)'})
    addTween('#retail_space_static', {transform: 'translateX(0)'}, '#economy_block', 140, 160, {transform: 'translateX(-100vw)'})

    addTween('#economy', {transform: 'translateX(0)'}, '#economy_block', 200, 20, {transform: 'translateX(100vw)'})

    addTween('#possibility_block_header', bottomAnimation, '.site_example', 750, -400, beforeBottomAnimation)


// ?????????????????????? ????????????????

    // ???????????? ??????????
    // ??????????????????
    addTweenTriggerZero('#main_block_left .heading', {opacity: 0}, '#main_block_left .heading', 300, -100, {opacity: 1})

    // ?????????? ???? ????????????????????
    addTween('.site_example', {transform: 'scale(1)'}, '.site_example', 3000, -1900, {transform: 'scale(0)'})

    // ?????????? ???? ????????????????????
    // ??????????????????
    addTweenTriggerZero('#possibility_block_header', {opacity: 0}, '#possibility_block_header', 350, -100, {opacity: 1})
    // ????????????????
    if (window.innerWidth > 660) // ???????? ???????????? ???????????? 660px ???????????? ???????????????????????? ????????????
        addTweenTriggerZero('#possibility_block', {opacity: 0}, '#possibility_block', 350, -50, {opacity: 1})
    else  // ???????? ???????????? ???????????? 660px ???????????? ???????????????????????? ??????????
        addTweenTriggerZero('#possibility_block', {opacity: 0}, '#possibility_block', 350, 350, {opacity: 1})

    // ?????????? "?????? ?????????????? ?? ?????????? ??????????"
    // ?????????????????? ?? ????????????????????????
    addTweenTriggerZero('#objects_in_one_place .heading', {opacity: 0}, '#objects_in_one_place', 300, -50, {opacity: 1})
    addTweenTriggerZero('#objects_in_one_place .heading_info', {opacity: 0}, '#objects_in_one_place', 300, 190, {opacity: 1})
    // ???????????? ??????
    addTweenTriggerZero('.shadow', {opacity: 0}, '#objects_in_one_place', 50, 400, {opacity: 1})
    addTweenTriggerZero('#vector_img', {opacity: 0}, '#vector_img', 300, 0, {opacity: 1})
    // ???????????? ?? ??????????????
    addTweenTriggerZero("#bradley1", {opacity: 0}, '#bradley1', 150, 50, {opacity: 1})
    addTweenTriggerZero("#cells_img_cadastral", {opacity: 0}, '#cells_img_cadastral', 100, 50, {opacity: 1})
    // addTweenTriggerZero("#cells_img_important", {transform: 'translateX(100vw)'}, '#cells_img_important', 1400, 50, {transform: 'translateX(0)'})
    // ??????????????????????
    addTweenTriggerZero(".windows_animation", {transform: 'translateX(100vw)'}, '#object_info', 800, 200, {})
    // ???????????????? ????????
    addTweenTriggerZero("#object_info", {transform: 'translateX(100vw)'}, '#object_info', 1600, 300, {})

    // ?????????? ?? 25%
    // ??????????????????
    addTweenTriggerZero('#economy_block .heading', {opacity: 0}, '#economy_block .heading', 300, -150, {opacity: 1})
    // ????????????
    addTweenTriggerZero('#economy_block .economy_element:nth-child(1)', {opacity: 0}, '#economy_block .economy_element:nth-child(1)', 400, -50, {opacity: 1})
    addTweenTriggerZero('#economy_block .economy_element:nth-child(2)', {opacity: 0}, '#economy_block .economy_element:nth-child(2)', 400, -50, {opacity: 1})
    addTweenTriggerZero('#economy_block .economy_element:nth-child(3)', {opacity: 0}, '#economy_block .economy_element:nth-child(3)', 400, -50, {opacity: 1})
    // 25%
    addTweenTriggerZero('#economy_block .left', {transform: 'translateX(100vw)'}, '#economy_block .left', 900, 400, {})

    // ?????????? "???????????? ????????????????????"
    // ?????????????????? ?? ????????????????????????
    addTweenTriggerZero('#profit_analysis .heading', {opacity: 0}, '#profit_analysis .heading', 300, -150, {opacity: 1})
    addTweenTriggerZero('#profit_analysis .heading_info', {opacity: 0}, '#profit_analysis .heading_info', 300, -50, {opacity: 1})
    // ????????????
    addTweenTriggerZero('#count_object', {transform: 'translateX(-100vw)'}, '#count_object', 1500, 0, {})

    // ?????????? "???????????????? ????????????????????????"
    // ?????????????????? ?? ????????????????????????
    addTweenTriggerZero('#contragents .heading', {opacity: 0}, '#contragents', 600, 0, {opacity: 1})
    addTweenTriggerZero('#contragents .heading_info', {opacity: 0}, '#contragents', 800, 200, {opacity: 1})
    // ????????????
    addTweenTriggerZero("#contragents .right", {transform: 'translateX(100vw)'}, '#contragents .right', 900, 400, {})
    // ????????????
    addTweenTriggerZero('#contragents .form_button', {opacity: 0}, '#contragents .form_button', 300, 0, {opacity: 1})

    // ?????????? "?????????????? ?? ?????????????? ?? ???????? ????????"
    // ?????????????????? ?? ????????????????????????
    addTweenTriggerZero('#references .heading', {opacity: 0}, '#references', 300, -50, {opacity: 1})
    addTweenTriggerZero('#references .heading_info', {opacity: 0}, '#references', 600, 0, {opacity: 1})
    // ????????????
    addTweenTriggerZero('#references_img', {opacity: 0}, '#references_img', 300, 0, {opacity: 1})
    // ?????????? ????????
    addTweenTriggerZero('#references #make_reference', {transform: 'translateX(-100vw)'}, '#references #make_reference', 600, 350, {})
    // ????????
    addTweenTriggerZero('#references #egrn', {transform: 'translateX(-100vw)'}, '#references #egrn', 1300, 400, {})
    // ??????????????
    addTweenTriggerZero("#bradley6", {transform: 'translateX(100vw)'}, '#bradley6', 250, 0, {})

    // ?????????? "???????????????????? ?????????????????????? ????????????????????"
    // ?????????????????? ?? ????????????????????????
    addTweenTriggerZero('#actual_information .heading', {opacity: 0}, '#actual_information', 300, 0, {opacity: 1})
    addTweenTriggerZero('#actual_information .heading_info', {opacity: 0}, '#actual_information', 300, 300, {opacity: 1})
    // ????????????
    addTweenTriggerZero('#juridical_info_img', {opacity: 0}, '#juridical_info_img', 300, 0, {opacity: 1})
    // ??????????????????
    addTweenTriggerZero('#actual_information_right_container', {transform: 'translateX(100vw)'}, '#actual_information_right_container', 900, 500, {})

    // ?????????? "???????????????? ???????????? ???? ?????????? ????????????????????"\
    // ?????????????????? ?? ????????????????????????
    addTweenTriggerZero('#checks .heading', {opacity: 0}, '#checks', 300, 0, {opacity: 1})
    addTweenTriggerZero('#checks .heading_info', {opacity: 0}, '#checks', 300, 300, {opacity: 1})
    // ??????????????????????
    addTweenTriggerZero('#checks #sm20', {opacity: 0}, '#checks #sm20', 200, -100, {opacity: 1})
    addTweenTriggerZero('#checks #sm21', {opacity: 0}, '#checks #sm21', 200, -50, {opacity: 1})
    addTweenTriggerZero('#checks #sm22', {opacity: 0}, '#checks #sm22', 200, 0, {opacity: 1})
    // ????????????
    addTweenTriggerZero('#checks #lightning', {opacity: 0}, '#checks #lightning', 1500, -350, {opacity: 1})

    // addTweenTriggerZero('#references .block_right', {transform: 'translateX(-100vw)'}, '#references .block_right', 700, -100, {transform: 'translateX(0)'})
    // addTween('header', {backgroundColor: 'rgba(255, 255, 255, 1)'}, '#second_block', 0, 300, {backgroundColor: 'rgba(255, 255, 255, 0)'})
// build scene
});