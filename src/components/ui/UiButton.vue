<template>
    <button
        :type="props.type"
        class="btn btn-primary mb-3"
        :class="type === 'submit' ? 'btn-success' : 'btn-danger'"
    >{{ props.text }}</button>
</template>

<script setup lang="ts">
const props = defineProps<{
    text: string,
    type: "submit" | "reset" | "button"
}>();
</script>

<style scoped lang="scss">

</style>
