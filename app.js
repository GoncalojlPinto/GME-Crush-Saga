document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid");
    const width = 8;
    const squares = [];
    let score = 0;
    const displayScore = document.getElementById('score');

    const images = ["url(assets/gme1.png)", "url(assets/gme2.png)", "url(assets/gme3.png)", "url(assets/gme4.png)", "url(assets/gme5.png)", "url(assets/gme6.png)"];

    //Board Generator
    function generateBoard() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement("div");
            square.setAttribute("draggable", true);
            square.setAttribute("id", i);
            let randomImage = Math.floor(Math.random() * images.length);
            square.style.backgroundImage = images[randomImage];
            grid.appendChild(square);
            squares.push(square);
        }
    }

    generateBoard();

    //Drag Feature
    let imageBeingDragged;
    let imageBeingReplaced;
    let squareIdBeingDragged;
    let squareIdBeingReplaced;

    squares.forEach((square) => square.addEventListener("dragstart", dragStart));
    squares.forEach((square) => square.addEventListener("dragend", dragEnd));
    squares.forEach((square) => square.addEventListener("dragover", dragOver));
    squares.forEach((square) => square.addEventListener("dragenter", dragEnter));
    squares.forEach((square) => square.addEventListener("dragleave", dragLeave)),
    squares.forEach((square) => square.addEventListener("drop", dragDrop));

    function dragStart() {
        imageBeingDragged = this.style.backgroundImage;
        squareIdBeingDragged = parseInt(this.id);
    }

    function dragEnd() {
        let moveValidator = [
            squareIdBeingDragged - 1,
            squareIdBeingDragged - width,
            squareIdBeingDragged + 1,
            squareIdBeingDragged + width,
        ];

        let validMove = moveValidator.includes(squareIdBeingReplaced);

        if (squareIdBeingReplaced && validMove) {
            squareIdBeingReplaced = null;
        } else if (squareIdBeingReplaced && !validMove) {
            squares[squareIdBeingReplaced].style.backgroundImage = imageBeingReplaced;
            squares[squareIdBeingDragged].style.backgroundImage = imageBeingDragged;
        } else {
            squares[squareIdBeingDragged].style.backgroundImage = imageBeingDragged;
        }
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function dragEnter(event) {
        event.preventDefault();
    }

    function dragLeave() { }

    function dragDrop() {
        imageBeingReplaced = this.style.backgroundImage;
        squareIdBeingReplaced = parseInt(this.id);
        this.style.backgroundImage = imageBeingDragged;
        squares[squareIdBeingDragged].style.backgroundImage = imageBeingReplaced;
    }

    function dropImg() {
        for (i = 0; i < 55; i++) {
            if (squares[i + width].style.backgroundImage === '') {
                squares[i + width].style.backgroundImage = squares[i].style.backgroundImage;
                squares[i].style.backgroundImage = '';
                const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
                const isFirstRow = firstRow.includes(i);
                if ((isFirstRow && squares[i].style.backgroundImage === '')) {
                    let randomImage = Math.floor(Math.random() * images.length);
                    squares[i].style.backgroundImage = images[randomImage];
                }
            }
        }
    }
    // Match checker

    // 3
    function rowOfThreeChecker() {
        for (i = 0; i < 61; i++) {
            let rowOfThree = [i, i + 1, i + 2];
            let currentImage = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === "";
            const invalidMatch = [6, 7, 13, 14, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];

            if (invalidMatch.includes(i)) continue;

            if (
                rowOfThree.every(
                    (index) =>
                        squares[index].style.backgroundImage === currentImage && !isBlank
                )
            ) {
                score += 3;
                displayScore.textContent = `${score}`;
                rowOfThree.forEach((index) => {
                    squares[index].style.backgroundImage = "";
                });
            }
        }
    }
    rowOfThreeChecker();

    function columnOfThreeChecker() {
        for (i = 0; i < 47; i++) {
            let columnOfThree = [i, i + width, i + width * 2];
            let currentImage = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === "";

            if (
                columnOfThree.every(
                    (index) =>
                        squares[index].style.backgroundImage === currentImage && !isBlank
                )
            ) {
                score += 3;
                displayScore.textContent = `${score}`;
                columnOfThree.forEach((index) => {
                    squares[index].style.backgroundImage = "";
                });
            }
        }
    }
    columnOfThreeChecker();

    //4

    function rowOfFourChecker() {
        for (i = 0; i < 60; i++) {
            let rowOfFour = [i, i + 1, i + 2, i + 3];
            let currentImage = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === "";
            const invalidMatch = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,54, 55];

            if (invalidMatch.includes(i)) continue;

            if (
                rowOfFour.every(
                    (index) =>
                        squares[index].style.backgroundImage === currentImage && !isBlank
                )
            ) {
                score += 4;
                displayScore.textContent = `${score}`;
                rowOfFour.forEach((index) => {
                    squares[index].style.backgroundImage = "";
                });
            }
        }
    }
    rowOfFourChecker();

    function columnOfFourChecker() {
        for (i = 0; i < 39; i++) {
            let columnOfFour = [i, i + width, i + width * 2, i + width * 3];
            let currentImage = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === "";

            if (
                columnOfFour.every(
                    (index) =>
                        squares[index].style.backgroundImage === currentImage && !isBlank
                )
            ) {
                score += 4;
                displayScore.textContent = `${score}`;
                columnOfFour.forEach((index) => {
                    squares[index].style.backgroundImage = "";
                });
            }
        }
    }
    columnOfFourChecker();

    window.setInterval(function () {
        dropImg();
        rowOfFourChecker();
        columnOfFourChecker();
        rowOfThreeChecker();
        columnOfThreeChecker();
    }, 100);
});
