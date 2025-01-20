<template>
    <label class="form-label ui-select fs-5">
        <span :class="{'required-star': required}">{{ label }}</span>
        <select :required="required" v-model="model" :name="name" class="form-select">
            <option v-for="option in options" :value="option.value ? option.value : option">{{ option.title ? option.title : option }}</option>
        </select>
    </label>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import axios from "axios";

const props = defineProps<{
    name: string,
    label: string,
    required?: boolean,
    apiEndpoint?: string,
    options?: {value: string, title: string}[],
}>();

const emit = defineEmits(["update:model-value", "update:options"])
const model = defineModel<string>()

onMounted(async() => {
    if (props.apiEndpoint) {
        const response = await axios.get(props.apiEndpoint);
        emit("update:model-value", response.data.value);
        emit("update:options", response.data.options);
    }
});
</script>

<style scoped lang="scss">
.error {
    color: red;
}
.ui-select {
    display: grid;
    gap: 4px;
    justify-items: start;
}
.required-star:after {
    content: "*";
    color: red;
}
</style>
