// Retrieving DOM elements
let setup = document.getElementById('setup');
let start_txt = document.getElementById('start-txt');
let flow_naming = document.getElementById('flow-naming');
let flow_name = document.getElementById('flow-name');
let flow_window = document.getElementById('flow-window');
let flow_area = document.getElementById('flow-area');
let new_flow_modal_body = document.getElementById('new-flow-modal-body');
let edit_flow_modal_body = document.getElementById('edit-flow-modal-body');
let pf_sides = document.getElementById('pf-sides');

// Initializing variables
let debate_format;
let pf_side;
let setup_complete = false;
const cx_new_flow = document.getElementById('cx-new-flow');
const cx_edit_flow = document.getElementById('cx-edit-flow');
const cx_case_layout = document.getElementById('cx-case-layout').innerHTML;
const cx_off_layout = document.getElementById('cx-off-layout').innerHTML;
const ld_pf_new_flow = document.getElementById('ld-pf-new-flow');
const ld_pf_edit_flow = document.getElementById('ld-pf-edit-flow');
const ld_layout = document.getElementById('ld-layout').innerHTML;
const pf_pro_layout = document.getElementById('pf-pro-layout').innerHTML;
const pf_con_layout = document.getElementById('pf-con-layout').innerHTML;

// Set format
function setFormat(el) {
    // Setting debate format & hiding start text & layout option
    debate_format = document.getElementById('debate-format').value;
    start_txt.remove();
    el.parentElement.parentElement.remove();

    // Setting up flow options section
    if (debate_format != 'pf') {
        if (debate_format == 'cx')
            flow_name.placeholder = 'e.g. Econ Adv';
        else if (debate_format == 'ld')
            flow_name.placeholder = 'e.g. Framing';

        // Showing flow options section
        flow_naming.classList.remove('uk-hidden');

        // Focusing on input
        flow_name.focus();

    } else {
        flow_name.placeholder = 'e.g. Econ Con';

        // Showing PF side picker
        pf_sides.classList.remove('uk-hidden');
    }
}

// PF set side
function pfSideSelect(side) {
    pf_side = side;
    pf_sides.remove();

    // Showing flow options section
    flow_naming.classList.remove('uk-hidden');

    // Focusing on input
    flow_name.focus();
}

// Create flow
function createFlow() {
    if (flow_name.value != undefined && flow_name.value != '') {
        // Naming initial switcher
        flow_switcher.innerHTML += '<li><a href="#">' + flow_name.value + '</a></li>';

        // Showing relevant flow
        if (debate_format == 'cx') {
            flow_area.innerHTML += cx_case_layout;
            new_flow_modal_body.innerHTML += cx_new_flow.innerHTML;
            edit_flow_modal_body.innerHTML += cx_edit_flow.innerHTML;
        } else if (debate_format == 'ld') {
            flow_area.innerHTML += ld_layout;
            new_flow_modal_body.innerHTML += ld_pf_new_flow.innerHTML;
            edit_flow_modal_body.innerHTML += ld_pf_edit_flow.innerHTML;
        } else {
            if (pf_side == 'pro')
                flow_area.innerHTML += pf_pro_layout;
            else
                flow_area.innerHTML += pf_con_layout;
            new_flow_modal_body.innerHTML += ld_pf_new_flow.innerHTML;
            edit_flow_modal_body.innerHTML += ld_pf_edit_flow.innerHTML;
        }

        // Removing modal templates
        cx_new_flow.remove();
        cx_edit_flow.remove();
        ld_pf_new_flow.remove();
        ld_pf_edit_flow.remove();

        // Hiding setup
        setup.remove();

        // Showing flow window
        flow_window.classList.remove('uk-hidden');

        // Resetting flow_name value
        flow_name.value = '';

        // Setup complete
        setup_complete = true;
    } else {
        flow_name.classList.add('uk-form-danger');
    }
}

// Add flow
function addFlow() {
    let new_flow_name = document.getElementById('new-flow-name');

    if (new_flow_name.value != undefined && new_flow_name.value != '') {
        // Naming new flow tab
        flow_switcher.innerHTML += '<li><a href="#">' + new_flow_name.value + '</a></li>';

        // Showing relevant flow
        if (debate_format == 'cx') {
            if (document.getElementById('new-flow-select').value == 'case') {
                flow_area.innerHTML += cx_case_layout;
            } else {
                flow_area.innerHTML += cx_off_layout;
            }
        } else if (debate_format == 'ld') {
            flow_area.innerHTML += ld_layout;
        } else {
            if (pf_side == 'pro')
                flow_area.innerHTML += pf_pro_layout;
            else
                flow_area.innerHTML += pf_con_layout;
        }

        // Close modal
        UIkit.modal(new_flow_modal_body.parentElement).hide();

        // Switch tabs (not using UIkit function bc it is too slow)
        flow_switcher.getElementsByClassName('uk-active')[0].classList.remove('uk-active');
        flow_switcher.getElementsByTagName('li')[flow_switcher.getElementsByTagName('li').length - 1].classList.add('uk-active')
        flow_area.getElementsByClassName('uk-active')[0].classList.remove('uk-active');
        flow_area.getElementsByTagName('li')[flow_area.getElementsByTagName('li').length - 1].classList.add('uk-active')
    } else {
        new_flow_name.classList.add('uk-form-danger');
    }
}

// Delete flow
function deleteFlow() {
    if (flow_switcher.getElementsByTagName('li').length > 1) {
        UIkit.modal.confirm('Delete flow?').then(function () {
            let flow_index;
            for (let i = 0; flow_switcher.getElementsByTagName('li').length > i; i++) {
                if (flow_switcher.getElementsByTagName('li')[i].classList.contains('uk-active'))
                    flow_index = i;
            }

            flow_switcher.getElementsByClassName('uk-active')[0].remove();
            flow_switcher.getElementsByTagName('li')[flow_index - 1].classList.add('uk-active');
            flow_area.getElementsByClassName('uk-active')[0].remove();
            flow_area.getElementsByTagName('li')[flow_index - 1].classList.add('uk-active');
        }, function () {
            return;
        });
    } else {
        UIkit.notification('<div class="uk-text-center">Must have at least one flow!</div>', {
            status: 'danger',
            pos: 'bottom-center'
        })
    }
}

// Edit flow
function editFlow() {
    let edit_flow_name = document.getElementById('edit-flow-name');

    if (edit_flow_name.value != undefined && edit_flow_name.value != '') {
        // Editing flow name
        flow_switcher.getElementsByClassName('uk-active')[0].getElementsByTagName('a')[0].innerHTML = edit_flow_name.value;

        // Editing flow
        if (debate_format == 'cx') {
            if (document.getElementById('edit-flow-select').value == 'case') {
                if (flow_area.getElementsByClassName('uk-active')[0].getElementsByClassName('aff-col').length > 3) {
                    // Close modal
                    UIkit.modal(edit_flow_modal_body.parentElement).hide();
                } else {
                    // Creating 1AC column
                    let one_ac = document.createElement('div');
                    one_ac.classList = 'aff-col';
                    let heading_node = document.createElement("h4");
                    heading_node.classList = 'uk-text-center noselect';
                    heading_node.innerHTML = '1AC';
                    one_ac.appendChild(heading_node);
                    let divider_node = document.createElement("hr");
                    divider_node.classList = 'uk-divider-icon';
                    one_ac.appendChild(divider_node);
                    let div_node = document.createElement("div");
                    div_node.classList = 'uk-width-1-1 uk-height-1-1';
                    div_node.ondblclick = 'addAffCard(this)';
                    one_ac.appendChild(div_node);
                    let ul_node = document.createElement("div");
                    ul_node.classList = 'uk-width-1-1 uk-height-1-1 uk-grid';
                    ul_node.setAttribute('uk-sortable', 'handle: .uk-sortable-handle');
                    div_node.appendChild(ul_node);

                    // Adding 1AC column to flow area
                    flow_area.getElementsByClassName('uk-active')[0].getElementsByClassName('neg-col')[0].insertBefore(one_ac);
                }
            } else {
                if (flow_area.getElementsByClassName('uk-active')[0].getElementsByClassName('aff-col').length > 3) {
                    flow_area.getElementsByClassName('uk-active')[0].getElementsByClassName('aff-col')[0].remove();
                } else {
                    // Close modal
                    UIkit.modal(edit_flow_modal_body.parentElement).hide();
                }
            }
        }

        // Close modal
        UIkit.modal(edit_flow_modal_body.parentElement).hide();
    } else {
        edit_flow_name.classList.add('uk-form-danger');
    }
}

// Edit flow modal
function editFlowModal() {
    let edit_flow_name = document.getElementById('edit-flow-name');

    edit_flow_name.value = flow_switcher.getElementsByClassName('uk-active')[0].getElementsByTagName('a')[0].innerHTML;

    if (debate_format == 'cx') {
        if (flow_area.getElementsByClassName('uk-active')[0].getElementsByClassName('aff-col').length > 3) {
            document.getElementById('edit-flow-select').value = 'case';
        } else {
            document.getElementById('edit-flow-select').value = 'off';
        }
    }
}