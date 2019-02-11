(store => {
  dom.query(window)
    .on('load', mounted);

  function mounted() {
    // Cache elements
    const
      elNavbar   = dom.query('.c-navbar');
      elToggler  = dom.query('.c-navbar__toggler'),
      elCollapse = dom.query('.c-navbar__collapse');

    elToggler
      .on('click', toggleNavbar);

    dom.query(window)
      .on('scroll', watchScroll);

    // Collapse nav when outside is clicked
    dom.query(document)
      .on('click', autoCollapseNav, true);

    // Check scroll
    watchScroll();

    function toggleNavbar() {
      elCollapse.toggleClass('c-navbar__collapse--collapsed');
      store.commit('navbarCollapsed', !store.navbarCollapsed);

      if (!store.navbarFix)
        elNavbar.toggleClass('c-navbar--fix');
    }

    function watchScroll() {
      if (window.scrollY > 10) {
        if (!store.navbarFix) {
          store.commit('navbarFix', true);
          elNavbar.addClass('c-navbar--fix');
        }
      } else {
        if (store.navbarFix) {
          store.commit('navbarFix', false);
          elNavbar.removeClass('c-navbar--fix');
        }
      }
    }

    function autoCollapseNav({ target }) {
      if (store.navbarCollapsed) return;

      const navbar = elNavbar.get(0);

      while (target && target !== document) {
        if (target === navbar) {
          return;
        }
        target = target.parentElement;
      }
      
      toggleNavbar();
    }
    
  }
})(window.store);