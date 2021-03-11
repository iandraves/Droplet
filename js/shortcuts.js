/*
Alt + Key = Interact with card
Shift + Key = Interact with flow
Ctrl + Key = Interact with site
*/

// Retrieving DOM elements
let add_flow_btn = document.getElementById('add-flow-btn');
let edit_flow_btn = document.getElementById('edit-flow-btn');
let shortcuts_btn = document.getElementById('shortcuts-btn');

// Waiting for key press
document.onkeydown = KeyPress;

// On key press
function KeyPress(e) {
    if (setup_complete) {
        let evtobj = window.event ? event : e

        // Move up (Alt + ArrowUp)
        if (evtobj.keyCode == 38 && evtobj.altKey) {
            try {
                let active_col = document.activeElement.parentElement.parentElement.parentElement;
                let active_card = document.activeElement.parentElement.parentElement;

                if (active_col.tagName == 'UL' && active_col.getElementsByTagName('li').length > 1 && active_card.classList.contains('card') && active_card.previousElementSibling != null) {
                    moveCard(active_col, active_card, 'up');
                }
            } catch {
                return;
            }
        }

        // Move down (Alt + ArrowDown)
        if (evtobj.keyCode == 40 && evtobj.altKey) {
            try {
                let active_col = document.activeElement.parentElement.parentElement.parentElement;
                let active_card = document.activeElement.parentElement.parentElement;

                if (active_col.tagName == 'UL' && active_col.getElementsByTagName('li').length > 1 && active_card.classList.contains('card')) {
                    moveCard(active_col, active_card, 'down');
                }
            } catch {
                return;
            }
        }

        // Add card (Alt + N)
        if (evtobj.keyCode == 78 && evtobj.altKey) {
            try {
                let col = document.activeElement.parentElement.parentElement.parentElement.parentElement.parentElement;

                if (col.classList.contains('aff-col'))
                    addAffCard(col, 'keybooard');
                else if (col.classList.contains('neg-col'))
                    addNegCard(col, 'keybooard');
            } catch {
                return;
            }
        }

        // Remove card (Alt + X)
        if (evtobj.keyCode == 88 && evtobj.altKey) {
            try {
                let active_card = document.activeElement.parentElement.parentElement;

                if (active_card.classList.contains('card')) {
                    deleteCard(active_card);
                }
            } catch {
                return;
            }
        }

        // Show/hide cite (Alt + C)
        if (evtobj.keyCode == 67 && evtobj.altKey) {
            let loc = document.activeElement.parentElement.getElementsByTagName('p');

            if (loc[1].classList.contains('uk-hidden')) {
                loc[1].classList.remove('uk-hidden');
                loc[1].focus();
            } else {
                loc[1].classList.add('uk-hidden');
                highlightText(loc[0]);
            }
        }

        // Add flow (Shift + ArrowUp)
        if (evtobj.keyCode == 38 && evtobj.shiftKey) {
            add_flow_btn.click();
        }

        // Delete flow (Shift + ArrowDown)
        if (evtobj.keyCode == 40 && evtobj.shiftKey) {
            deleteFlow();
        }

        // Edit flow (Shift + Enter)
        if (evtobj.keyCode == 13 && evtobj.shiftKey) {
            edit_flow_btn.click();
        }

        // Switch right (Shift + ArrowRight)
        if (evtobj.keyCode == 39 && evtobj.shiftKey && flow_switcher.getElementsByTagName('li').length > 1) {
            let active_loc;

            for (let i = 0; i < flow_switcher.getElementsByTagName('li').length; i++) {
                if (flow_switcher.getElementsByTagName('li')[i].className == 'uk-active')
                    active_loc = i;
            }

            if (flow_switcher.getElementsByTagName('li').length != active_loc + 1)
                UIkit.switcher(flow_switcher).show(active_loc + 1);
            else
                UIkit.switcher(flow_switcher).show(0);
        }

        // Switch left (Shift + ArrowLeft)
        if (evtobj.keyCode == 37 && evtobj.shiftKey && flow_switcher.getElementsByTagName('li').length > 1) {
            let active_loc;

            for (let i = 0; i < flow_switcher.getElementsByTagName('li').length; i++) {
                if (flow_switcher.getElementsByTagName('li')[i].className == 'uk-active')
                    active_loc = i;
            }

            if (active_loc - 1 < 0)
                UIkit.switcher(flow_switcher).show(flow_switcher.getElementsByTagName('li').length - 1);
            else
                UIkit.switcher(flow_switcher).show(active_loc - 1);
        }

        // Open shortcuts (Ctrl + Space)
        if (evtobj.keyCode == 32 && evtobj.ctrlKey) {
            shortcuts_btn.click();
        }
    }
}