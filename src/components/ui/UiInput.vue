<template>
    <label class="form-label ui-input fs-5">
        <span :class="{'required-star': required}">{{ label }}</span>
        <input
            :required="required"
            :name="name"
            :placeholder="placeholder"
            :value="model"
            @input="handleInput"
            type="text"
            class="form-control"
        >
        <span v-if="errorMessage" class="error fs-6">{{ errorMessage }}</span>
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
    errorMessage?: string,
    placeholder?: string,
}>();

const emit = defineEmits(["update:model-value"])

const model = defineModel()

function handleInput(event: Event) {
    emit("update:model-value", (event.target as HTMLInputElement).value);
}

onMounted(async () => {
    if (props.apiEndpoint) {
        const response = await axios.get(props.apiEndpoint);
        emit("update:model-value", response.data);
    }
});

</script>

<style scoped lang="scss">
.error {
    color: red;
}
.ui-input {
    display: grid;
    gap: 4px;
    justify-items: start;
}
.required-star:after {
    content: "*";
    color: red;
}
</style>
