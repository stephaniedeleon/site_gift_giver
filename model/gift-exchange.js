const { BadRequestError } = require("../utils/errors");

const participants = {
    resultPairs: [],
    resultTrad: [],
}

class GiftExchange {

    //gets array pairs
    static async getPairs(nameList) {

        if (!nameList) {
            console.log
            throw new BadRequestError("You must have names in the request body to get pairs of names.");
        }
        if ( (nameList.length % 2) != 0 ) {
            throw new BadRequestError("You must have even number of names in the request body to get pairs.");
        }

        //clears resultPairs
        participants.resultPairs = [];

        //nameList is an array
        let array = nameList.slice();

        //shuffling the array 
        var currentIndex = array.length, randomIndex;
        while (0 !== currentIndex) {    // While there remain elements to shuffle...

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = 
                [array[randomIndex], array[currentIndex]];
        }

        //making pairs (gets the first and last element, and pairs them)
        while (array.length != 0) {

            let pair = [];

            //pushes the name into the pair
            let name1 = array.pop();
            pair.push(name1);
            let name2 = array.shift();
            pair.push(name2);

            //pushes the pair to resultPairs
            participants.resultPairs.push(pair);

        }

        return participants.resultPairs;
    }


    //gets traditional phrases
    static async getTraditional(namePairs) {

        //clears resultTrad
        participants.resultTrad = [];

        for (let i=0; i<namePairs.length; i++) {

            let phrase1, phrase2;

            phrase1 = namePairs[i][0] + " is giving a gift to " + namePairs[i][1];
            participants.resultTrad.push(phrase1);

            if (i == namePairs.length-1) {

                phrase2 = namePairs[i][1] + " is giving a gift to " + namePairs[0][0];
                participants.resultTrad.push(phrase2);

            } else {
    
                phrase2 = namePairs[i][1] + " is giving a gift to " + namePairs[i+1][0];
                participants.resultTrad.push(phrase2);
            }
        }

        return participants.resultTrad;
    }
}

module.exports = GiftExchange;