<template>
    <div
        @click="callback(length)"
        @mouseenter="isShip = true"
        @mouseleave="isShip = false"
        class="flex w-max cursor-pointer space-x-1"
    >
        <div
            :class="
                isShip
                    ? 'bg-red-400 flex w-9 h-9 shadow-xl'
                    : 'bg-red-400 flex w-8 h-8 '
            "
            v-for="index in length"
            :key="index"
        />
    </div>
    <label>{{ name }}</label>
</template>

<script lang="ts">
// vue
import { defineComponent, ref } from "vue";

export default defineComponent({
    components: {},
    props: {
        length: {
            type: Number,
        },
        name: {
            type: String,
            default: "",
        },
        callback: {
            type: Object,
        },
    },
    setup(props: any) {
        const isShip = ref(false);

        const test = () => {
            console.log(props.length);
        };
        return {
            isShip,
            test,
        };
    },
});
</script>
