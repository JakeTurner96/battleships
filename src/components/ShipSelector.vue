<template>
    <Panel header="Fleet">
        <Ship
            v-for="ship in shipState"
            :key="ship.id"
            :ship="ship"
            :length="ship.length"
            :name="ship.name"
            :callback="shipClickCallback"
        />
    </Panel>
</template>

<script lang="ts">
// vue
import { defineComponent, ref } from "vue";

// primevue
import Panel from "primevue/panel";

// config
import shipConfig from "@/config/shipConfig";

// components
import Ship from "@/components/Ship.vue";

export default defineComponent({
    components: {
        Ship,
        Panel,
    },
    props: {
        shipState: {
            type: Array,
        },
        placedShips: {
            type: Array,
        },
        callback: {
            type: Function,
        },
    },
    setup(props: any) {
        const isVisible = ref(false);

        const shipClickCallback = (ship: any) => {
            props.callback(ship);
            isVisible.value = false;
        };

        return { isVisible, shipConfig, shipClickCallback };
    },
});
</script>
