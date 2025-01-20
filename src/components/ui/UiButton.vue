<template>
    <button
        :type="props.type"
        class="btn btn-primary mb-3"
        :class="buttonClasses"
    >{{ props.text }}</button>
</template>

<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
    text: string,
    type: "submit" | "reset" | "button"
}>();

const buttonClasses = computed(() => {
    return {
        "btn-success": props.type === "submit",
        "btn-danger": props.type === "reset"
    }
})
</script>

<style scoped lang="scss">

</style>
