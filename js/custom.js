(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  var toggleBurger = function () {
      burger.classList.toggle("is-active");
      menu.classList.toggle("is-active");
  };
  burger.addEventListener("click", function() {
      toggleBurger()
  });

  burger.addEventListener('keypress', function (event) {
      if (event.key === 'Enter' || event.keyCode === 32) {
          toggleBurger()
      }
  });
})();

document.querySelectorAll("#nav li").forEach(function(navEl) {
  navEl.onclick = function() {
    toggleTab(this.id, this.dataset.target);
  };
});

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#nav li");

  navEls.forEach(function(navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
      }
    }
  });

  var tabs = document.querySelectorAll(".tab-pane");

  tabs.forEach(function(tab) {
    if (tab.id == targetId) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  });
}


function skipTo() {
    const VISIBLE_CLASS_NAME = 'my-visible';
    const HIDDEN_CLASS_NAME = 'my-hidden';

    const wrapper = document.getElementById('skip-to');
    const button = document.getElementById('skip-to__button');
    const content = document.getElementById('skip-to__content');
    const links = document.querySelectorAll('.skip-to-link');

    let activeLinkIndex = -1;



    const setWrapperVisible = function () {
        wrapper.classList.add(VISIBLE_CLASS_NAME);
        wrapper.addEventListener('keypress', handleWrapperKeyPress);
        button.addEventListener('click', handleButtonClick);
        window.addEventListener('click', handleWindowClick);
    };
    const setWrapperHidden = function () {
        wrapper.classList.remove(VISIBLE_CLASS_NAME);
        window.removeEventListener('click', handleWindowClick);
    };

    const nextLink = function () {
        if (activeLinkIndex + 1 < links.length) {
            activeLinkIndex++;
        }
        moveFocus();
    };
    const prevLink = function () {
        if (activeLinkIndex - 1 >= -1) {
            activeLinkIndex--;
        }
        moveFocus();
    };
    const moveFocus = function () {
        if (activeLinkIndex === -1) {
            return undefined;
        }

        links[activeLinkIndex].focus()
    };

    const showContent = function () {
        content.classList.remove(HIDDEN_CLASS_NAME);
        content.focus();
        window.addEventListener('keydown', handleWindowKeyDown);
    };
    const hideContent = function () {
        content.classList.add(HIDDEN_CLASS_NAME);
        window.removeEventListener('keydown', handleWindowKeyDown);
    };

    const showButton = function () {
        button.classList.remove(HIDDEN_CLASS_NAME)
    };
    const hideButton = function () {
        button.classList.add(HIDDEN_CLASS_NAME);
        button.removeEventListener('click', handleButtonClick);
    };

    const handleWrapperFocus = function (){
        setWrapperVisible();
    };

    const handleButtonClick = function () {
        showContent();
        hideButton();
    };
    const handleWrapperKeyPress = function (event) {
        if (event.key === 'Enter' || event.keyCode === 32) {
            event.preventDefault();
            showContent();
            hideButton();
        }
    };
    const handleWindowKeyDown = function (event) {
        if (event.keyCode === 27) {
            hideContent();
            showButton();
        } else if (event.keyCode === 38) {
            event.preventDefault();
            prevLink();
        } else if (event.keyCode === 40) {
            event.preventDefault();
            nextLink();
        }
    };
    const handleWindowClick = function (event) {
        const { target } = event;

        if (target.classList.contains('is-skip-to') || target.id === 'skip-to__button') {
            return undefined;
        }

        setWrapperHidden();
    };

    wrapper.addEventListener('focus', handleWrapperFocus);
}

skipTo();
