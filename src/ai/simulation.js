function getCombinations (array, start, initialStuff, output) {
    start = start || 0;
    initialStuff = initialStuff || [];
    output = output || [];

    if (initialStuff.length >= 3) {
        output.push(initialStuff);
    } else {
        var i;

        for (i = start; i < array.length; ++i) {
            getCombinations(array, i + 1, initialStuff.concat(array[i]), output);
        }
    }

    return output;
}

function randomValue (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function simulation (risk) {

    function simulateAttack () {
        let player = risk.currentPlayer;
        let attack = risk.utils.ai.whatToAttack(player.id);

        if (Math.random() > 0.5 && attack) {
            risk.act.attack(player.id, attack.from.id, attack.to.id, attack.units);
        } else {
            risk.act.fortifyPhase(player.id);
        }
    }

    function simulatePlacement () {
        let player = risk.currentPlayer;

        redeemCards(player);

        let placements = risk.utils.ai.whereToDeployUnits(risk.currentPlayer.id);

        for (let placement of placements) {
            risk.act.deployUnits(player.id, placement.territory.id, placement.units);
        }

        risk.act.attackPhase(player.id);
    }

    function simulateFortify () {
        let player = risk.currentPlayer;

        moveUnits(player);
        risk.act.endTurn(player.id);
    }

    function moveUnits (player) {
        let movements = risk.utils.ai.whichUnitsToMove(player.id);

        for (let move of movements) {
            risk.act.moveUnits(player.id, move.from.id, move.to.id, move.units);
        }
    }

    function redeemCards (player) {
        let limit = 500;

        while (risk.getCards(player.id).length > 4) {
            let combinations = () => {
                return getCombinations(risk.getCards(player.id).slice(0, 5));
            };

            for (let combination of combinations()) {
                console.log(combination);
                if (risk.utils.isValidCardCombo(combination)) {
                    risk.act.redeemCards(player.id, combination);

                    break;
                }
            }

            if (limit < 0) {
                throw new Error('Loop taking too long')
            }

            limit -= 1;
        }
    }

    function simulateSetupA () {
        let player = risk.currentPlayer;
        let availableTerritories = risk.board.getAvailableTerritories();
        let territory = randomValue(availableTerritories);

        risk.act.claimTerritory(player.id, territory.id);
    }

    function simulateSetupB () {
        let player = risk.currentPlayer;
        let territory = randomValue(player.territoryIds);

        risk.act.deployOneUnit(player.id, territory);
    }

    return {
        simulateSetupA,
        simulateSetupB,
        simulatePlacement,
        simulateAttack,
        simulateFortify
    };
}

export default simulation;
