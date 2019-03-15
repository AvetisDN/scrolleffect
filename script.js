;(function(){

    window.addEventListener('load', loadHandler);
    window.addEventListener('resize', loadHandler);
    window.addEventListener('scroll', scrollHandler);
    
    let renderElement = document.querySelector('#render');
    let renderContainer = renderElement.querySelector('.parallax-container');
    let renderImage = renderContainer.querySelector('.parallax-image');
    let renderPath, renderName, renderFrames, renderExt;
    let activeFrame = 0;
    let minScroll, maxScroll;
    let images = [];

    renderPath = renderElement.getAttribute('data-path');
    renderName = renderElement.getAttribute('data-file');
    renderFrames = renderElement.getAttribute('data-num');
    renderExt = renderElement.getAttribute('data-ext');

    if(images.length == 0) {
        for(let i=0; i<renderFrames; i++) {
            let img = new Image(600,400);
            img.src = renderPath + renderName + ((i<10) ? ("0" + i) : i) + renderExt;
            images.push(img);
        }
    }

    function loadHandler(e) {
        scrollHandler(e);
        renderElement.style.height = window.innerHeight + 40*renderFrames + 'px';
        minScroll = renderElement.offsetTop;
        maxScroll = renderElement.offsetTop + renderElement.offsetHeight;
    }

    function scrollHandler(e) {
        if(window.pageYOffset >= renderElement.offsetTop) {
            renderContainer.style.position = "fixed";
            renderContainer.style.top = 0;
            getActiveFrame(e);
        }
        if(window.pageYOffset >= renderElement.offsetTop + renderElement.offsetHeight - window.innerHeight) {
            renderContainer.style.position = "absolute";
            renderContainer.style.top = renderElement.offsetHeight - renderContainer.offsetHeight + 'px';
        }
        if(window.pageYOffset < renderElement.offsetTop ) {
            renderContainer.style.position = "absolute";
            renderContainer.style.top = 0;
        }
        
    }

    function getActiveFrame(e) {
        
        if(window.pageYOffset > minScroll && window.pageYOffset < maxScroll) {
            let percent = (window.pageYOffset - minScroll) / (maxScroll - window.pageYOffset);
            activeFrame = Math.floor(percent * renderFrames);
        }

        if(activeFrame >= renderFrames) activeFrame = renderFrames - 1;
        if(activeFrame < 0) activeFrame = 0;
        renderImage.innerHTML = "";
        renderImage.appendChild(images[activeFrame]);
        this.oldScroll = this.scrollY;
    }

})();