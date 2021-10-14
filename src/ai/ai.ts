import shipConfig from "@/config/shipConfig";

export const useAiService = () => {
    // const placeShips = () => {
    //     const placedCoords: number[] = [];

    //     console.log(placedCoords);
    // };

    const generateAiGridState = () => {
        const cells: any[] = [];
        for (let i = 1; i <= 100; i++) {
            cells.push({
                id: i,
                isSelected: false,
                isDestroyed: false,
                isHover: false,
            });
        }
        const aiGrid = test();
        aiGrid.forEach((coord: number) => {
            cells.find((x: any) => x.id == coord).isSelected = true;
        });
        return cells;
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

    return {
        genShipCoords,
        canPlaceShip,
        test,
        generateAiGridState,
    };
};
