const APP = (function () {
    /**
   * Used for getting the card nodes from the DOM
   * 
   * @returns {NodeList} Returns the cards nodelist
   */
    const getCards = () => {
        const cardSection = document.querySelector('.cardSection'),
            cardNodes = cardSection.querySelectorAll('div'),
            cardsArr = Array.from(cardNodes);

        return cardsArr;
    }

    /**
    * Used for Shuffling the cards
    */
    const onShuffle = () => {
        const cardsArr = getCards();
        let cardsLength = cardsArr.length;
        clearCardsSection();
        try {
            while (--cardsLength) {
                const rIndex = Math.floor(Math.random() * cardsLength);
                [cardsArr[cardsLength], cardsArr[rIndex]] = [cardsArr[rIndex], cardsArr[cardsLength]];
            }
        } catch (err) {
            console.log("sorting error", err.message);
            alert('Error while shuffling');
        }
        render(createView(cardsArr, 'shuffle'));
    }

    /**
    * Used for Sorting the cards
    */
    const onSort = () => {
        const cardsArr = getCards();
        clearCardsSection();
        try {
            render(createView(cardsArr, 'sort'));
        } catch (err) {
            console.log("sorting error", err);
            alert("Error while sorting");
        }
    }

    /**
    * Used for Creating the cards view based on the type
    * 
    * @param {array} cards The Array for looping, must be a Javascript Array.
    * @param {string} type Method for aligining the cards
    * @return {HTMLContent} Cards template content  
    */
    const createView = (cards, type) => {
        let str = '';
        if (type === 'shuffle') {
            str = cards.map((card, i) => getCardHtml(card.innerText)).join('');
        } else if ('sort') {
            str = cards.map((card, i) => getCardHtml(++i)).join('');
        }
        const temp = document.createElement('template');
        temp.innerHTML = str;
        return temp.content;
    }

    /**
     * Used for Creating the card element
     * 
     * Returns card div, with "cardVal" added to the classname and in the content
     * 
     * @param {number/string} cardVal The card value
     */
    const getCardHtml = (cardVal) => {
        return `<div class="card-${cardVal}">${cardVal}</div>`;
    }

    /**
     * Clears the .cardsSection div elements child nodes
     * 
     * No Return or @param
     */
    const clearCardsSection = () => {
        const cardSection = document.querySelector('.cardSection')
        cardSection.innerHTML = "";
    }

    /**
     * Renders the cards inside the CardSection
     * 
     * @param {HTML Content} view HTML content for rendering
     * No Return or @param
     */

    const render = (view) => {
        const cardSection = document.querySelector('.cardSection');
        cardSection.appendChild(view);
    }


    return {
        shuffle: onShuffle,
        sort: onSort
    };
})();