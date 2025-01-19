<template>
    <div class="form-label fs-5">
        <label class="form-check">
            <input
                :required="required"
                :name="name"
                type="checkbox"
                :checked="model"
                @change="handleChange"
                class="form-check-input"
            >
            <span class="form-check-label" :class="{'required-star': required}">{{label}}</span>
        </label>
        <span v-if="errorMessage" class="error fs-6">{{ errorMessage }}</span>
    </div>
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
.error {
    color: red;
}
.required-star:after {
    content: "*";
    color: red;
}
</style>
