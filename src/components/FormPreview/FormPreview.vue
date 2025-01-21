<template>
    <h2 class="fs-3">Превью формы</h2>
    <h3 class="fs-4">"{{ form.name }}"</h3>
    <form class="form-preview" novalidate @submit.prevent="onSubmit" @reset.prevent="onReset">
        <div v-for="component in form.fields" class="field-line" :key="component.name">
            <component
                :is="component.tag"
                v-bind="component"
                v-model="component.currentValue"
                v-model:options="component.options"
            />
            <UiButton text="✏" :type="ButtonType.BUTTON" class="edit-button" @click="editField(component)" />
            <UiButton text="X" :type="ButtonType.BUTTON" @click="removeField(component)" />
        </div>
    </form>
</template>

<script setup lang="ts">
import UiButton from "@/components/ui/UiButton.vue";
import { ButtonType, Form, FormField } from "@/typespaces/types";
import { useFormsStore } from "@/stores/forms";

const formsStore = useFormsStore();

const props = defineProps<{
    form: Form;
}>();

const emit = defineEmits(["edit-field", "delete-field"]);

function removeField(component: FormField) {
    emit("delete-field", component);
}

function editField(component: FormField) {
    emit("edit-field", component);
}
function onSubmit() {
    const isValid = true;
    props.form.fields.forEach((field: FormField) => {
        delete field.errorMessage;
        if (field.required && !field.currentValue) {
            field.errorMessage = "Поле обязательно для заполнения";
        }
    });
    if (isValid) {
        formsStore.postForm(props.form);
    }
}

function onReset() {
    props.form.fields.forEach((field: FormField) => {
        if (field.currentValue !== undefined) {
            field.currentValue = typeof field.currentValue === "boolean" ? false : "";
        }
        delete field.errorMessage;
    });
}
</script>

<style scoped lang="scss">
.form-preview {
    padding: 10px;
}

.field-line {
    display: grid;
    grid-template-columns: auto 45px 40px;
    align-items: center;
    gap: 4px;
    padding: 4px;
    border: 1px solid #ccc;
}
</style>
