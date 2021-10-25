<template>
    <div class="space-y-2">
        <ShipSelector
            v-if="placedShips < 5"
            :callback="setSelectedShip"
            :shipState="shipState"
        />
        <div class="flex justify-center space-x-10">
            <div>
                You
                <Grid
                    :isAi="false"
                    :gridState="p1GridState"
                    :placeShipCallback="placeShip"
                    :hoverEnterCallback="hoverEnterCallback"
                    :hoverLeaveCallback="hoverLeaveCallback"
                />
            </div>
            <div>
                Computer
                <Grid
                    :isAi="true"
                    :gridState="p2GridState"
                    :makeMove="makeMove"
                />
            </div>
        </div>
        <div class="flex justify-center">
            <Button v-if="placedShips == 5" label="Begin" />
        </div>
    </div>
</template>

<script lang="ts">
// vue
import { defineComponent, onMounted, ref } from "vue";

// services
import { useAiService } from "@/ai/ai";

// primevue
import Button from "primevue/button";

// config
import shipConfig from "@/config/shipConfig";

// components
import Grid from "@/components/Grid.vue";
import ShipSelector from "@/components/ShipSelector.vue";

export default defineComponent({
    components: {
        Grid,
        ShipSelector,
        Button,
    },
    setup() {
        // reactive
        const p1GridState = ref();
        const p2GridState = ref();
        const shipState = ref(shipConfig);
        const selectedShip = ref();
        const placedShips = ref(0);

        // services
        const aiService = useAiService();

        // methods
        const setState = (start: number, length: number) => {
            for (var i = 0; i < length; i++) {
                p1GridState.value.find(
                    (e: any) => e.id == start + 10 * i
                ).isSelected = true;
            }
        };

        const placeShip = (data: number) => {
            if (data + (selectedShip.value.length - 1) * 10 <= 100) {
                if (selectedShip.value.length) {
                    setState(data, selectedShip.value.length);
                    shipState.value.forEach((ship: any) => {
                        if (ship.id == selectedShip.value.id) {
                            ship.isPlaced = true;
                        }
                    });
                    placedShips.value = placedShips.value + 1;
                    selectedShip.value = {};
                }
            }
        };

        const hoverEnterCallback = (start: number) => {
            if (selectedShip.value) {
                for (var i = 0; i < selectedShip.value.length; i++) {
                    p1GridState.value.find(
                        (e: any) => e.id == start + 10 * i
                    ).isHover = true;
                }
            }
        };

        const hoverLeaveCallback = () => {
            p1GridState.value.forEach((cell: any) => {
                cell.isHover = false;
            });
        };

        const makeMove = async (selectedCell: any) => {
            var cell = p2GridState.value.find(
                (e: any) => e.id == selectedCell.id
            );
            if (selectedCell.isSelected) {
                var hitAudio = new Audio(require("@/resources/audio/oof.mp3"));
                hitAudio.play();
                cell.isDestroyed = true;
            } else {
                var missAudio = new Audio(
                    require("@/resources/audio/splash.mp3")
                );
                missAudio.play();
                cell.isMiss = true;
            }
        };

        const setSelectedShip = (ship: any) => {
            selectedShip.value = ship;
        };

        // lifecycle
        onMounted(() => {
            p1GridState.value = aiService.generateGrid();
            p2GridState.value = aiService.generateAiGridState();
        });

        return {
            p1GridState,
            p2GridState,
            placedShips,
            shipState,
            makeMove,
            placeShip,
            setSelectedShip,
            hoverEnterCallback,
            hoverLeaveCallback,
        };
    },
});
</script>
