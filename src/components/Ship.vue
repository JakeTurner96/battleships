<template>
    <div v-if="!ship.isPlaced" class="py-1">
        <label>{{ name }}</label>
        <div @click="callback(ship)" class="flex cursor-pointer space-x-1">
            <div
                class="bg-red-400 flex w-9 h-9 shadow-xl"
                v-for="index in length"
                :key="index"
            />
        </div>
    </div>
    <div v-if="ship.isPlaced" class="py-1">
        <del class="text-gray-300">{{ name }}</del>
        <div class="flex space-x-1">
            <div
                class="bg-gray-300 flex w-9 h-9"
                v-for="index in length"
                :key="index"
            />
        </div>
    </div>
</template>

<script lang="ts">
// vue
import { defineComponent, ref } from "vue";

export default defineComponent({
    components: {},
    props: {
        ship: {
            type: Object,
        },
        length: {
            type: Number,
        },
        name: {
            type: String,
            default: "",
        },
        callback: {
            type: Function,
        },
    },
    setup(props: any) {
        const isShip = ref(false);

        return {
            isShip,
        };
    },
});
</script>
