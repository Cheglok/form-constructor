<template>
    <label>
        {{label}}
        <input
            :required="required"
            :name="name"
            type="checkbox"
            :checked="model"
            @change="handleChange"
        >
    </label>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import axios from "axios";

const props = defineProps<{
    label: string,
    apiEndpoint?: string,
    name: string,
    required?: boolean,
}>();
const emit = defineEmits(["update:model-value"])
const model = defineModel<boolean>()

function handleChange(event: Event) {
    emit("update:model-value", (event.target as HTMLInputElement).checked);
}

onMounted(async() => {
    if (props.apiEndpoint) {
        const response = await axios.get(props.apiEndpoint);
        emit("update:model-value", response.data.checked);
    }
});
</script>

<style scoped lang="scss">

</style>
