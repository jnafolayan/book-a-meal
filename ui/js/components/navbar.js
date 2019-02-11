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

    // Check scroll
    watchScroll();

    function toggleNavbar() {
      elCollapse.toggleClass('c-navbar__collapse--collapsed');

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


    
  }
})(window.store);