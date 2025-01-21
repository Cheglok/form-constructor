<template>
    <label class="form-label ui-select fs-5">
        <span :class="{ 'required-star': required }">{{ label }}</span>
        <span class="select-wrapper">
            <select :required="required" v-model="model" :name="name" class="form-select">
                <option v-for="(option, index) in options" :value="option.value ? option.value : option" :key="index">
                    {{ option.title ? option.title : option }}
                </option>
            </select>
            <UiButton :text="buttonText" :type="ButtonType.BUTTON" class="fake-button" />
        </span>
    </label>
</template>

<script setup lang="ts">
import { computed, ComputedRef, onMounted } from "vue";
import { api } from "@/services/api";
import UiButton from "@/components/ui/UiButton.vue";
import { ButtonType } from "@/typespaces/types";

const props = defineProps<{
    name: string;
    label: string;
    required?: boolean;
    apiEndpoint?: string;
    options?: { value: string; title: string }[];
}>();

const emit = defineEmits(["update:model-value", "update:options"]);
const model = defineModel<string>();

const buttonText: ComputedRef<string> = computed(() => {
    if (!model.value) {
        return "Выберите значение";
    }
    const option = props.options?.find((option) => {
        if (typeof option === "object") {
            return option.value === model.value;
        }
        return option === model.value;
    });
    return option?.title ? `${option.title}` : `${option}`;
});

onMounted(async () => {
    if (props.apiEndpoint) {
        const response = await api.get(props.apiEndpoint);
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
.select-wrapper {
    display: block;
    position: relative;
    width: 100%;
}
.fake-button {
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    pointer-events: none;
}
</style>
