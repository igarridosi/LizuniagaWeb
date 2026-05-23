(function () {
    var headerMenu = document.getElementById('header-menu');
    var toggle = document.querySelector('.menu-toggle');
    var desktopMenu = document.getElementById('menu');

    if (!headerMenu || !toggle || !desktopMenu) {
        return;
    }

    if (headerMenu && !headerMenu.querySelector('.header-quick-icons')) {
        var quickIcons = document.createElement('div');
        quickIcons.className = 'header-quick-icons';
        quickIcons.innerHTML =
            '<a class="quick-icon" href="tel:+34948631031" aria-label="Llamar a Lizuniaga" title="Llamar">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.4 15.4 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.36 2.3.56 3.6.56a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1C10.3 22 2 13.7 2 3a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.56 3.6a1 1 0 0 1-.24 1z"/></svg>' +
            '</a>' +
            '<a class="quick-icon" href="https://wa.me/34657472020" target="_blank" rel="noopener" aria-label="Abrir WhatsApp" title="WhatsApp">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11 11 0 0 0 3.4 17.3L2 22l4.9-1.3A11 11 0 1 0 20.5 3.5zM12 20a8.9 8.9 0 0 1-4.5-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A9 9 0 1 1 12 20zm4.9-6.7c-.3-.1-1.8-.9-2-.9-.3-.1-.5-.1-.7.1l-.6.9c-.1.2-.3.2-.5.1a7.3 7.3 0 0 1-2.1-1.3 8 8 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.4.3-.5a.6.6 0 0 0 0-.6c0-.1-.7-1.7-1-2.3-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.4-1.1 1.1-1.1 2.7s1.1 3 1.2 3.2a12 12 0 0 0 4.6 4 15 15 0 0 0 1.5.6 3.6 3.6 0 0 0 1.6.1c.5-.1 1.8-.8 2-1.5.2-.7.2-1.4.1-1.5s-.2-.1-.5-.2z"/></svg>' +
            '</a>';
        headerMenu.appendChild(quickIcons);
    }

    var injectRestaurantGuruBadge = function () {
        if (document.getElementById('restaurantguru-badge-host')) {
            return;
        }

        var guruCssHref = 'https://awards.infcdn.net/2024/circle_v3.css';
        if (!document.querySelector('link[href="' + guruCssHref + '"]')) {
            var guruCss = document.createElement('link');
            guruCss.rel = 'stylesheet';
            guruCss.href = guruCssHref;
            document.head.appendChild(guruCss);
        }

        var host = document.createElement('div');
        host.id = 'restaurantguru-badge-host';
        host.style.position = 'fixed';
        host.style.right = '14px';
        host.style.bottom = '14px';
        host.style.zIndex = '2300';
        host.style.transform = window.innerWidth <= 600 ? 'scale(0.62)' : 'scale(0.72)';
        host.style.transformOrigin = 'bottom right';

        host.innerHTML = '<div id="circle_bw" data-length="29" class="circle_bw_black" onclick="if(event.target.nodeName.toLowerCase() != \'a\') {window.open(this.querySelector(\'.circle_bw_link\').href);return 0;}"> <p class="circle_bw_year">2025</p> <div class="circle_bw_name "> <a class="circle_bw_link" target="_blank" href="https://es.restaurantguru.com/Restaurante-Lizuniaga-Garaitarreta"> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="178px" height="178px" viewBox="0 0 178 178"> <defs> <path id="circle_bw_name-arc" d="M 12 89 a 77 77 0 0 0 154 0"></path> </defs> <text class="circle_bw_name_txt " fill="#000" text-anchor="middle"> <textPath startOffset="50%" xlink:href="#circle_bw_name-arc"> Lizuniaga </textPath> </text> </svg> </a> </div> <div class="circle_bw_nom "> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200px" height="200px" viewBox="0 0 200 200"> <defs> <path id="circle_bw_nom-arc1" d="M 30 100 a 70 70 0 1 1 140 0"></path> </defs> <text class="circle_bw_nom_txt " fill="#000" text-anchor="middle"> <textPath startOffset="50%" xlink:href="#circle_bw_nom-arc1">Recomendado</textPath> </text> </svg> </div> <a class="circle_bw_home" style="font-size: 0" href="https://restaurantguru.com" target="_blank">Restaurant Guru</a></div>';

        document.body.appendChild(host);

        window.addEventListener('resize', function () {
            host.style.transform = window.innerWidth <= 600 ? 'scale(0.62)' : 'scale(0.72)';
        });
    };

    injectRestaurantGuruBadge();

    var panel = document.getElementById('mobile-menu-panel');
    if (!panel) {
        panel = document.createElement('nav');
        panel.id = 'mobile-menu-panel';
        panel.setAttribute('aria-hidden', 'true');
        panel.setAttribute('aria-label', 'Menu principal');

        var links = [];
        var desktopLinks = desktopMenu.querySelectorAll('a');
        for (var i = 0; i < desktopLinks.length; i += 1) {
            links.push(desktopLinks[i].outerHTML);
        }

        panel.innerHTML =
            '<div class="mobile-menu-head">Navegación</div>' +
            '<div class="mobile-menu-links">' + links.join('') + '</div>' +
            '<div class="mobile-menu-extra">' +
            '<p class="menu-extra-title">Reserva rapida</p>' +
            '<a class="menu-extra-btn" href="tel:+34948631031">Llamar 948 63 10 31</a>' +
            '<a class="menu-extra-btn whatsapp" href="https://wa.me/34657472020" target="_blank" rel="noopener">WhatsApp</a>' +
            '</div>';

        document.body.appendChild(panel);
    }

    var backdrop = document.getElementById('mobile-menu-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.id = 'mobile-menu-backdrop';
        document.body.appendChild(backdrop);
    }

    var setOpen = function (open) {
        document.body.classList.toggle('mobile-menu-open', open);
        panel.setAttribute('aria-hidden', open ? 'false' : 'true');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    var closeMenu = function () {
        setOpen(false);
    };

    toggle.addEventListener('click', function () {
        var willOpen = !document.body.classList.contains('mobile-menu-open');
        setOpen(willOpen);
    });

    backdrop.addEventListener('click', closeMenu);

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });

    var isExternalOrActionLink = function (href, target) {
        return href.indexOf('http') === 0 || href.indexOf('tel:') === 0 || href.indexOf('mailto:') === 0 || href.indexOf('wa.me') > -1 || target === '_blank';
    };

    var findAnchor = function (node, container) {
        while (node && node !== container) {
            if (node.tagName && node.tagName.toLowerCase() === 'a') {
                return node;
            }
            node = node.parentNode;
        }
        return null;
    };

    panel.addEventListener('click', function (event) {
        var link = findAnchor(event.target, panel);
        if (!link) {
            return;
        }

        var href = (link.getAttribute('href') || '').trim();
        var target = link.getAttribute('target') || '';

        if (!href || href === '#') {
            closeMenu();
            return;
        }

        if (isExternalOrActionLink(href, target)) {
            closeMenu();
            return;
        }

        event.preventDefault();
        closeMenu();

        window.setTimeout(function () {
            window.location.href = link.href;
        }, 20);
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 900) {
            closeMenu();
        }
    });
})();

// ── Shared footer ──
(function () {
    var host = document.getElementById('site-footer');
    if (!host) { return; }
    host.outerHTML =
        '<footer>' +
        '<div class="footer-container">' +
        '<div class="footer-logo"><img src="img/logo_bg.png" alt="Lizuniaga logo" loading="lazy"></div>' +
        '<div class="footer-section">' +
        '<h4>Contacto</h4>' +
        '<p>Restaurante Lizuniaga</p>' +
        '<p>Dirección: Garaitarreta Auzoa, 26, 31780 Bera, Navarra</p>' +
        '<p>Teléfono: 948 63 10 31</p>' +
        '<p>Email: lizuniaga@lizuniaga.com</p>' +
        '</div>' +
        '<div class="footer-section">' +
        '<h4>Enlaces Rápidos</h4>' +
        '<ul>' +
        '<li><a rel="noopener" href="index.html">Inicio</a></li>' +
        '<li><a rel="noopener" href="carta.html">Carta</a></li>' +
        '<li><a rel="noopener" href="habitaciones.html">Reservas</a></li>' +
        '<li><a rel="noopener" href="experiencias.html">Experiencias</a></li>' +
        '<li><a rel="noopener" href="contacto.html">Contacto</a></li>' +
        '</ul>' +
        '</div>' +
        '<div class="footer-section">' +
        '<h4>Síguenos</h4>' +
        '<div class="social-media">' +
        '<a rel="noopener" href="https://www.instagram.com/lizuniaga/" target="_blank"><img src="img/icons/icons8-instagram-24.png" alt="Instagram" loading="lazy"></a>' +
        '<a rel="noopener" href="https://www.facebook.com/p/lizuniaga-100086454246429/" target="_blank"><img src="img/icons/icons8-facebook-nuevo-24.png" alt="Facebook" loading="lazy"></a>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="footer-bottom"><p>&copy; 2024 Restaurante Lizuniaga. Todos los derechos reservados.</p></div>' +
        '</footer>';
})();
