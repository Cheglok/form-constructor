<template>
    <button :type="props.type" class="btn btn-primary" :class="buttonClasses">{{ props.text }}</button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ButtonType } from "@/typespaces/types";

const props = defineProps<{
    text: string;
    type: ButtonType;
}>();

const buttonClasses = computed(() => {
    return {
        "btn-success": props.type === ButtonType.SUBMIT,
        "btn-danger": props.type === ButtonType.RESET,
    };
});
</script>

<style scoped lang="scss"></style>
