const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

var crsr = document.querySelector("#minicircle");

function firstPageAnim(){
    var tl= gsap.timeline();

    tl.from("#nav",{
        y: '20',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
        .to(".boundingelem",{
            y:0,
            ease: Expo.easeInOut,
            duration: 2,
            delay: -1.5,
            stagger: .2
        })
        .to(".boundingelem1",{
            y:0,
            ease: Expo.easeInOut,
            duration: 2,
            delay: -1.5,
            stagger: .2
        })
        .from("#herofooter",{
            y:10,
            opacity:0,
            delay: -1.4,
            duration:1.5,
            ease: Expo.easeInOut
        })
}

// jab mouse move ho to hum log skew kr paye and max skew and min skew define kr paye
// jab mouse move ho to chapta ke value badhe and jab mouse ruk jaye to chapta hat jaye

var timeout;

function mouseskew(){
    // define default scale value
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove",function(dets){
        clearTimeout(timeout);
        
        var xdiff = dets.clientX - xprev;
        var ydiff = dets.clientY - yprev;
        xprev = dets.clientX;
        yprev = dets.clientY;

        xscale = gsap.utils.clamp(0.7,1.3,xdiff)
        yscale = gsap.utils.clamp(0.7,1.3,ydiff)

        circleMouseFollower(xscale,yscale);

        timeout = setTimeout(function(){
            crsr.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1))`;
        },100)
    })
}


function circleMouseFollower(xscale,yscale){
    window.addEventListener("mousemove",function(dets){
        crsr.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}

mouseskew();
circleMouseFollower();
firstPageAnim();

let elems = document.querySelectorAll(".elem");

elems.forEach(function (elem) {

    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave",function (dets){
        gsap.to(elem.querySelector("img"),{
            opacity:0,
            ease: Power3,
            duration: 0.5
        });
        gsap.to(elem.querySelector("h1"),{
            opacity:1,
            x:0,
        })
        gsap.to(elem.querySelector("h5"),{
            opacity:1,
        })
    });

    elem.addEventListener("mousemove",function (dets){
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX; 
        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20,20,diffrot)
        });
        gsap.to(elem.querySelector("h1"),{
            opacity:0.15,
            x:40,
        })
        gsap.to(elem.querySelector("h5"),{
            opacity:0.3,
        })
    });
});
