import shipConfig from "@/config/shipConfig";

// models
import { Cell } from "@/models/cell";

export const useGrid = () => {
    // return a blank 10x10 grid
    const generateGrid = () => {
        const cells: Cell[] = [];
        for (let i = 1; i <= 100; i++) {
            cells.push({
                id: i,
                isSelected: false,
                isDestroyed: false,
                isMiss: false,
                isHover: false,
            });
        }
        return cells;
    };

    const generateAiGridState = () => {
        const grid = generateGrid();
        const shipCoords = test();
        shipCoords.forEach((coord: number) => {
            const found = grid.find((cell: Cell) => cell.id == coord);
            if (found) {
                found.isSelected = true;
            }
        });
        return grid;
    };

    const test = () => {
        const grid: number[] = [];
        shipConfig.forEach((ship: any) => {
            gridSetup(genShipCoords(ship.length), grid, ship.length);
        });
        return grid;
    };

    const gridSetup = (
        shipCoords: number[],
        grid: number[],
        shipLength: number
    ) => {
        if (!canPlaceShip(shipCoords, grid)) {
            gridSetup(genShipCoords(shipLength), grid, shipLength);
        } else {
            shipCoords.forEach((coord: number) => {
                grid.push(coord);
            });
        }
    };

    const genShipCoords = (shipLength: number) => {
        const shipCoords = [];
        const max = 100 - (shipLength - 1) * 10;
        const cell = Math.floor(Math.random() * max) + 1;

        for (let i = 0; i < shipLength; i++) {
            shipCoords.push(cell + 10 * i);
        }
        return shipCoords;
    };

    const canPlaceShip = (shipCoords: number[], placedShips: number[]) => {
        let canPlace = true;
        shipCoords.forEach((x: number) => {
            const find = placedShips.find((y: number) => x == y);
            if (find) {
                canPlace = false;
            }
        });
        return canPlace;
    };

    const makeMove = async (selectedCell: any, grid: any) => {
        const cell = grid.find((e: any) => e.id == selectedCell);
        if (cell.isSelected) {
            cell.isDestroyed = true;
        } else {
            cell.isMiss = true;
        }
    };

    const aiMakeMove = (grid: any, previousMoves: any) => {
        const cell = Math.floor(Math.random() * 100) + 1;
        const found = previousMoves.find((move: any) => move == cell);
        if (found) {
            aiMakeMove(grid, previousMoves);
        } else {
            // make move
            makeMove(cell, grid);
            previousMoves.push(cell);
        }
    };

    return {
        generateGrid,
        genShipCoords,
        canPlaceShip,
        test,
        generateAiGridState,
        aiMakeMove,
        makeMove,
    };
};
