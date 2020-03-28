(function () {
    var burger = document.querySelector(".burger");
    var menu = document.querySelector("#" + burger.dataset.target);
    var toggleBurger = function () {
        burger.classList.toggle("is-active");
        menu.classList.toggle("is-active");

        if (burger.getAttribute('aria-expanded') === "false") {
            burger.setAttribute('aria-expanded', "true");
            burger.setAttribute('aria-label', "Hide menu");
        } else {
            burger.setAttribute('aria-expanded', "false");
            burger.setAttribute('aria-label', "Show menu");
        }

    };
    burger.addEventListener("click", function () {
        toggleBurger()
    });

    burger.addEventListener('keypress', function (event) {
        if (event.key === 'Enter' || event.keyCode === 32) {
            toggleBurger()
        }
    });
})();

document.querySelectorAll("#nav li").forEach(function (navEl) {
    navEl.onclick = function () {
        toggleTab(this.id, this.dataset.target);
    };
});


// Listen to tab focus | blur
function listenTabFocus() {
    const navEls = document.querySelectorAll("#nav li button");
    navEls.forEach(function (navEl) {
        navEl.addEventListener('focus', function () {
            //navEl.addEventListener('keydown', tabKeyDown);
        });
        navEl.addEventListener('blur', function () {
            //navEl.removeEventListener('keydown', tabKeyDown);
        });
    });
}
listenTabFocus();


function getActiveTabIndex() {
    const navEls = document.querySelectorAll("#nav li");

    for (let i = 0; i < navEls.length; i++) {
        if (navEls[i].classList.contains('is-active')) {
            return i;
        }
    }
}

function setNextTab() {
    console.log('setNextTab')
    const navEls = document.querySelectorAll("#nav li");
    const activeElIndex = getActiveTabIndex();
    const nextTabIndex = activeElIndex + 1 < navEls.length ? activeElIndex + 1 : 0;

    for (let i = 0; i < navEls.length; i++) {
        const el = navEls[i]
        const button = el.querySelector('button');

        if (i === nextTabIndex) {
            el.classList.add('is-active');
            button.focus();
            button.setAttribute('tabindex', '0');
            button.setAttribute('aria-selected', 'true');
        } else {
            if (el.classList.contains('is-active')) {
                el.classList.remove('is-active');
                button.setAttribute('tabindex', '-1');
                button.setAttribute('aria-selected', 'false');
            }
        }
    }

    setActiveTabPane(navEls[nextTabIndex].dataset.target);
}

function setPrevTab() {
    console.log('setPrevTab')
    const navEls = document.querySelectorAll("#nav li");
    const activeElIndex = getActiveTabIndex();
    const nextTabIndex = activeElIndex - 1 >= 0 ? activeElIndex - 1 : navEls.length - 1;

    for (let i = 0; i < navEls.length; i++) {
        const el = navEls[i]
        const button = el.querySelector('button');

        if (i === nextTabIndex) {
            el.classList.add('is-active');
            button.focus();
            button.setAttribute('tabindex', '0');
            button.setAttribute('aria-selected', 'true');
        } else {
            if (el.classList.contains('is-active')) {
                el.classList.remove('is-active');
                button.setAttribute('tabindex', '-1');
                button.setAttribute('aria-selected', 'false');
            }
        }
    }

    setActiveTabPane(navEls[nextTabIndex].dataset.target);
}

function tabKeyDown(event) {
    switch (event.keyCode) {
        case 39:
            setNextTab()
            break;
        case 37:
            setPrevTab()
            break;
        default:
            break;
    }
}

function setActiveTabPane(tabId) {
    var tabs = document.querySelectorAll(".tab-pane");

    tabs.forEach(function (tab) {
        if (tab.id == tabId) {
            tab.style.display = "block";
        } else {
            tab.style.display = "none";
        }
    });
}

function toggleTab(selectedNav, targetId) {
    var navEls = document.querySelectorAll("#nav li");

    navEls.forEach(function (navEl) {
        const button = navEl.querySelector('button');
        if (navEl.id == selectedNav) {
            navEl.classList.add("is-active");
            button.setAttribute('tabindex', "0");
            button.setAttribute('aria-selected', 'true');
        } else {
            if (navEl.classList.contains("is-active")) {
                navEl.classList.remove("is-active");
                button.setAttribute('tabindex', "-1")
                button.setAttribute('aria-selected', 'false');
            }
        }
    });
    setActiveTabPane(targetId)
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

    const handleWrapperFocus = function () {
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
        const {target} = event;

        if (target.classList.contains('is-skip-to') || target.id === 'skip-to__button') {
            return undefined;
        }

        setWrapperHidden();
    };

    wrapper.addEventListener('focus', handleWrapperFocus);
}

skipTo();

// =======================
const myModal = () => {
    let activeModal = undefined;

    const handleKeydown = function (event) {
        if (event.key === 'Escape') {
            closeModal();
        }

        document.removeEventListener('keypress', handleKeydown)
    }

    const closeModal = function () {
        activeModal.style.display = 'none';
        document.documentElement.style.overflowY  = 'auto';
        document.body.removeEventListener('click', listenToModalClose);
    }

    const listenToModalClose = function(event) {
        const target = event.target;

        if (!target.classList.contains('modal-background') && !target.classList.contains('modal-close')) {
            return undefined;
        }

        closeModal();
    }


    const modalButtonHandleClick = function(event) {
        const target = event.target;
        const modalId = target.dataset.target;
        activeModal = document.getElementById(modalId);

        activeModal.style.display = 'flex';
        document.documentElement.style.overflowY  = 'hidden';

        window.setTimeout(() => {
            document.body.addEventListener('click', listenToModalClose);
        }, 0);

    };


    const elems = document.querySelectorAll('.modal-button');
    elems.forEach((elem) => {
        elem.addEventListener('click', modalButtonHandleClick);
    })

    document.addEventListener('keydown', handleKeydown);
};

myModal();
