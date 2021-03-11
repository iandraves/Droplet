// Retrieve card layouts
let aff_card_layout = document.getElementById('aff-card-layout').innerHTML;
let neg_card_layout = document.getElementById('neg-card-layout').innerHTML;

// Add aff card
function addAffCard(col, req_type) {
    if (req_type == 'mouse') {
        document.activeElement.focus();

        if (document.activeElement.tagName == 'BODY') {
            // Add card
            col.getElementsByTagName('ul')[0].innerHTML += aff_card_layout;

            // Focus on new card text
            let card_texts = col.getElementsByTagName('p');
            highlightText(card_texts[card_texts.length - 2]);
        }
    } else {
        // Add card
        col.getElementsByTagName('ul')[0].innerHTML += aff_card_layout;

        // Focus on new card text
        let card_texts = col.getElementsByTagName('p');
        highlightText(card_texts[card_texts.length - 2]);
    }
}

// Add neg card 
function addNegCard(col, req_type) {
    if (req_type == 'mouse') {
        document.activeElement.focus();

        if (document.activeElement.tagName == 'BODY') {
            // Add card
            col.getElementsByTagName('ul')[0].innerHTML += neg_card_layout;

            // Focus on new card text
            let card_texts = col.getElementsByTagName('p');
            highlightText(card_texts[card_texts.length - 2]);
        }
    } else {
        // Add card
        col.getElementsByTagName('ul')[0].innerHTML += neg_card_layout;

        // Focus on new card text
        let card_texts = col.getElementsByTagName('p');
        highlightText(card_texts[card_texts.length - 2]);
    }
}

// Delete card
function deleteCard(card) {
    try {
        // Select next card
        highlightText(card.nextElementSibling.getElementsByTagName('p')[0]);

        // Remove current card
        card.remove();
    } catch {
        try {
            // Select previous card
            highlightText(card.previousElementSibling.getElementsByTagName('p')[0]);

            // Remove current card
            card.remove();
        } catch {
            card.remove();
        }
    }
}

// Move card
function moveCard(col, card, dir) {
    if (dir == 'up') {
        col.insertBefore(card, card.previousElementSibling);
    } else {
        col.insertBefore(card, card.nextElementSibling.nextElementSibling);
    }

    highlightText(card.getElementsByTagName('p')[0]);
}