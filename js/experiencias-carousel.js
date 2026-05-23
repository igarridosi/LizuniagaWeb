document.addEventListener('DOMContentLoaded', function () {
    var root = document.querySelector('[data-carousel]');
    if (!root) {
        return;
    }

    var viewport = root.querySelector('.carousel-viewport');
    var track = root.querySelector('.carousel-track');
    var prevBtn = root.querySelector('.carousel-btn.prev');
    var nextBtn = root.querySelector('.carousel-btn.next');
    var dotsWrap = document.querySelector('.carousel-dots');

    if (!viewport || !track || !dotsWrap) {
        return;
    }

    var originalCards = Array.prototype.slice.call(track.querySelectorAll('.experiencia-card'));
    if (originalCards.length === 0) {
        return;
    }

    var visibleCount = 3;
    var clonesEachSide = Math.min(visibleCount, originalCards.length);
    var positionIndex = clonesEachSide;
    var dots = [];
    var touchStartX = 0;
    var touching = false;
    var isAnimating = false;

    var getStep = function () {
        var style = window.getComputedStyle(track);
        var gap = parseFloat(style.columnGap || style.gap || '0') || 0;
        var firstCard = track.querySelector('.experiencia-card');
        if (!firstCard) {
            return 0;
        }
        return firstCard.offsetWidth + gap;
    };

    var setTransition = function (enabled) {
        track.style.transition = enabled ? 'transform 0.34s ease' : 'none';
    };

    var normalize = function (index, total) {
        return ((index % total) + total) % total;
    };

    var rebuildTrack = function () {
        track.innerHTML = '';

        for (var i = originalCards.length - clonesEachSide; i < originalCards.length; i += 1) {
            var preClone = originalCards[i].cloneNode(true);
            preClone.classList.add('is-clone');
            track.appendChild(preClone);
        }

        for (var j = 0; j < originalCards.length; j += 1) {
            track.appendChild(originalCards[j]);
        }

        for (var k = 0; k < clonesEachSide; k += 1) {
            var postClone = originalCards[k].cloneNode(true);
            postClone.classList.add('is-clone');
            track.appendChild(postClone);
        }
    };

    var getCurrentIndex = function () {
        return normalize(positionIndex - clonesEachSide, originalCards.length);
    };

    var buildDots = function () {
        dotsWrap.innerHTML = '';
        dots = [];

        for (var i = 0; i < originalCards.length; i += 1) {
            var dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'carousel-dot';
            dot.setAttribute('aria-label', 'Ir a experiencia ' + (i + 1));
            dot.addEventListener('click', (function (target) {
                return function () {
                    currentIndex = target;
                    updatePosition(true);
                };
            })(i));
            dotsWrap.appendChild(dot);
            dots.push(dot);
        }
    };

    var updateActiveStyles = function () {
        var cards = Array.prototype.slice.call(track.querySelectorAll('.experiencia-card'));
        for (var i = 0; i < cards.length; i += 1) {
            cards[i].classList.remove('is-active');
        }

        var activeVirtual = positionIndex + 1;
        if (cards[activeVirtual]) {
            cards[activeVirtual].classList.add('is-active');
        }

        var currentIndex = getCurrentIndex();

        for (var d = 0; d < dots.length; d += 1) {
            dots[d].classList.toggle('is-active', d === currentIndex);
        }
    };

    var updatePosition = function (animate) {
        setTransition(animate);
        track.style.transform = 'translateX(' + (-(positionIndex * getStep())) + 'px)';
        updateActiveStyles();
    };

    var goTo = function (targetIndex) {
        if (isAnimating) {
            return;
        }
        var currentIndex = getCurrentIndex();
        var delta = targetIndex - currentIndex;
        positionIndex += delta;
        isAnimating = true;
        updatePosition(true);
    };

    var next = function () {
        if (isAnimating) {
            return;
        }
        positionIndex += 1;
        isAnimating = true;
        updatePosition(true);
    };

    var prev = function () {
        if (isAnimating) {
            return;
        }
        positionIndex -= 1;
        isAnimating = true;
        updatePosition(true);
    };

    if (nextBtn) {
        nextBtn.addEventListener('click', next);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prev);
    }

    track.addEventListener('transitionend', function () {
        var lowerLimit = clonesEachSide;
        var upperLimit = clonesEachSide + originalCards.length - 1;

        if (positionIndex > upperLimit) {
            positionIndex = clonesEachSide;
            updatePosition(false);
        } else if (positionIndex < lowerLimit) {
            positionIndex = clonesEachSide + originalCards.length - 1;
            updatePosition(false);
        }

        isAnimating = false;
    });

    viewport.addEventListener('touchstart', function (event) {
        touchStartX = event.touches[0].clientX;
        touching = true;
    }, { passive: true });

    viewport.addEventListener('touchend', function (event) {
        if (!touching) {
            return;
        }
        touching = false;

        var delta = event.changedTouches[0].clientX - touchStartX;
        if (Math.abs(delta) < 40) {
            return;
        }

        if (delta < 0) {
            next();
        } else {
            prev();
        }
    }, { passive: true });

    var rebuild = function () {
        var safeIndex = getCurrentIndex();
        clonesEachSide = Math.min(visibleCount, originalCards.length);
        rebuildTrack();
        positionIndex = clonesEachSide + normalize(safeIndex, originalCards.length);
        updatePosition(false);
        isAnimating = false;
    };

    buildDots();
    rebuild();

    window.addEventListener('resize', function () {
        rebuild();
    });
});
