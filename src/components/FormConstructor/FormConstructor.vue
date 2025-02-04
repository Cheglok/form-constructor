<template>
    <main class="container container-fluid constructor">
        <section class="row">
            <h1 class="fs-2">Приветствуем вас в конструкторе формы!</h1>
            <div class="row">
                <div class="col col-7">
                    <UiInput name="formName" label="Укажите название формы" required v-model="form.name" />
                </div>
                <div class="col col-5">
                    <UiInput
                        name="method"
                        label="Укажите адрес отправки формы"
                        required
                        placeholder="работает /save-form"
                        v-model="form.method"
                    />
                </div>
            </div>
            <hr />
            <template v-if="form.method && form.name">
                <div class="col col-7">
                    <FormPreview :form="form" @edit-field="editField" @delete-field="deleteField" />
                </div>
                <div class="col col-5">
                    <FieldConstructor
                        @save-field="saveField"
                        @cancel-editing="cancelEditing"
                        :editing-component="editingComponent"
                    />
                </div>
            </template>
            <div class="col text-center save-button">
                <UiButton
                    text="Сохранить сконструированную форму"
                    :type="ButtonType.SUBMIT"
                    @click="saveConstructedForm"
                />
            </div>
        </section>
        <section>
            <h2 class="fs-2">Сохранённые формы</h2>
            <div v-if="!loading" class="row">
                <div class="col" v-for="(form, index) in formStore.getSavedForms" :key="index">
                    <UiButton :text="form.name" :type="ButtonType.BUTTON" @click="editForm(form)" />
                </div>
                <div class="col">
                    <UiButton text="+" :type="ButtonType.BUTTON" @click="clearForm" />
                </div>
            </div>
            <p v-else>Загружаем сохранённые формы...</p>
        </section>
    </main>
</template>

<script setup lang="ts">
import FormPreview from "@/components/FormPreview/FormPreview.vue";
import { onMounted, ref, Ref } from "vue";
import UiButton from "@/components/ui/UiButton.vue";
import { ButtonType, FieldTag, Form, FormField } from "@/typespaces/types";
import UiInput from "@/components/ui/UiInput.vue";
import FieldConstructor from "@/components/FieldConstructor/FieldConstructor.vue";
import { getDefaultForm } from "@/helpers/helpers";
import { useMessagesStore } from "@/stores/message";
import { useFormsStore } from "@/stores/forms";

const messageStore = useMessagesStore();
const formStore = useFormsStore();

const form: Ref<Form> = ref(getDefaultForm());
const loading: Ref<boolean> = ref(false);

const editingComponent: Ref<FormField | null> = ref(null);

function saveConstructedForm() {
    const isValid = validateForm();
    if (!isValid) {
        return;
    }
    formStore.postSaveForm(form.value);
}

function saveField(event: FormField) {
    if (!editingComponent.value) {
        form.value.fields.push(event);
    } else {
        form.value.fields = form.value.fields.map((item) => {
            if (item.name === event.name) {
                return event;
            }
            return item;
        });
        editingComponent.value = null;
    }
}

function editField(event: FormField) {
    editingComponent.value = event;
}

function deleteField(event: FormField) {
    if (editingComponent.value?.name === event.name) {
        editingComponent.value = null;
    }
    form.value.fields = form.value.fields.filter((item) => {
        return item.name !== event.name;
    });
}

function cancelEditing() {
    editingComponent.value = null;
}

function validateForm() {
    if (!form.value.name) {
        messageStore.setMessage("Укажите название формы");
        return false;
    }

    if (!form.value.method) {
        messageStore.setMessage("Укажите адрес отправки формы");
        return false;
    }

    if (!form.value.fields.length) {
        messageStore.setMessage("Добавьте в форму элементы");
        return false;
    }

    const hasConfirmButton = form.value.fields.some((field) => {
        return field.tag === FieldTag.UI_BUTTON && field.type === ButtonType.SUBMIT;
    });

    if (!hasConfirmButton) {
        messageStore.setMessage("Ваша форма не содержит кнопку отправки данных");
        return false;
    }
    return true;
}

function editForm(event: Form) {
    form.value = event;
}

function clearForm() {
    form.value = getDefaultForm();
}

onMounted(async () => {
    try {
        loading.value = true;
        await formStore.fetchSavedForms();
    } finally {
        loading.value = false;
    }
});
</script>

<style scoped lang="scss">
.container {
    width: 1200px;
    display: grid;
    gap: 10px;
    min-height: 100vh;
    align-content: space-between;
    padding: 20px;
}

.save-button {
    padding: 20px;
}
</style>
