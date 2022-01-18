<template>
    <div class="rounded bg-white shadow-md">
        <div class="text-xl border-b pl-4 pt-4 pb-2">Fleet</div>
        <div class="p-4">
            <Ship
                v-for="ship in shipState"
                :key="ship.id"
                :ship="ship"
                :length="ship.length"
                :name="ship.name"
                :callback="shipClickCallback"
            />
        </div>
    </div>
</template>

<script lang="ts">
// vue
import { defineComponent, ref } from "vue";

// config
import shipConfig from "@/config/shipConfig";

// components
import Ship from "@/components/Ship.vue";

export default defineComponent({
    components: {
        Ship,
    },
    props: {
        shipState: {
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
