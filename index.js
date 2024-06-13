document.addEventListener('DOMContentLoaded', () => {
    const diceElements = {
        A: document.getElementById('diceA'),
        B: document.getElementById('diceB'),
        C: document.getElementById('diceC')
    };

    const rollButton = document.getElementById('rollButton');
    const winnerDiv = document.getElementById('winner');

    rollButton.addEventListener('click', rollDice);

    function rollDice() {
        const scores = {
            A: Math.floor(Math.random() * 6) + 1,
            B: Math.floor(Math.random() * 6) + 1,
            C: Math.floor(Math.random() * 6) + 1
        };

        diceElements.A.textContent = scores.A;
        diceElements.B.textContent = scores.B;
        diceElements.C.textContent = scores.C;

        displayWinner(scores);
    }

    function displayWinner(scores) {
        const maxScore = Math.max(scores.A, scores.B, scores.C);
        const winners = Object.keys(scores).filter(key => scores[key] === maxScore);

        if (winners.length === 1) {
            winnerDiv.textContent = `Winner: Member ${winners[0]}`;
        } else {
            winnerDiv.textContent = `Winner: It's a draw between ${winners.join(' and ')}`;
        }

        colorDice(scores);
    }

    function colorDice(scores) {
        const scoreValues = Object.values(scores);
        const sortedScores = [...scoreValues].sort((a, b) => b - a);

        let colorOrder;
        if (sortedScores[0] === sortedScores[1] && sortedScores[1] === sortedScores[2]) {
            colorOrder = ['blue', 'blue', 'blue'];
        } else if (sortedScores[0] === sortedScores[1]) {
            colorOrder = ['blue', 'blue', 'red'];
        } else if (sortedScores[1] === sortedScores[2]) {
            colorOrder = ['green', 'blue', 'blue'];
        } else if (sortedScores[0] === sortedScores[2]) {
            colorOrder = ['blue', 'yellow', 'blue'];
        } else {
            colorOrder = ['green', 'yellow', 'red'];
        }

        const colorMap = {};
        scoreValues.forEach((score, i) => {
            colorMap[score] = colorOrder[i];
        });

        Object.keys(scores).forEach((key) => {
            diceElements[key].style.backgroundColor = colorMap[scores[key]];
        });
    }

    rollDice(); // Initial roll on page load
});
