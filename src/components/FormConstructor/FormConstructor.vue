<template>
    <div class="container container-fluid">
        <div class="row">
            <h1 class="fs-1">Приветствуем вас в конструкторе формы!</h1>
            <UiInput
                name="formName"
                label="Укажите название формы"
                required
                v-model="form.name"
            />
            <template v-if="form.name">
                <UiInput
                    name="method"
                    label="Укажите адрес отправки формы"
                    required
                    v-model="form.method"
                />
                <template v-if="form.method">
                <div class="col col-7">
                    <FormPreview :fields="form.fields" @edit-field="editField" @delete-field="deleteField"/>
                </div>
                <div class="col col-5">
                    <FieldConstructor @save-field="saveField" @cancel-editing="cancelEditing" :editing-component="editingComponent"/>
                </div>
                </template>
            </template>
        </div>
        <div class="col text-center save-button">
            <UiButton
                text="Сохранить сконструированную форму"
                type="submit"
                @click="saveConstructedForm"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import FormPreview from "@/components/FormPreview/FormPreview.vue";
import {Ref, ref} from "vue";
import UiButton from "@/components/ui/UiButton.vue";
import {FieldTag, FormField, Form} from "@/typespaces/types";
import UiInput from "@/components/ui/UiInput.vue";
import FieldConstructor from "@/components/FieldConstructor/FieldConstructor.vue";
import axios from "axios";
import {getDefaultForm} from "@/helpers/helpers";

const form: Ref<Form> = ref(getDefaultForm());

const editingComponent: Ref<FormField | null> = ref(null);

async function saveConstructedForm() {
    const isValid = validateForm();
    if (!isValid) {
        return;
    }
    const response = await axios.post("/api/save-form", {
        method: form.value.method,
        fields: form.value.fields
    });
    if (response.data.success) {
        form.value.fields = [];
        form.value.method = "";
        alert(response.data.message)
    }
}

function saveField(event: FormField) {
    if (!editingComponent.value) {
        form.value.fields.push(event);
    } else {
        form.value.fields = form.value.fields.map(item => {
            if (item.name === event.name) {
                return event;
            }
            return item;
        })
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
    form.value.fields = form.value.fields.filter(item => {
        return item.name !== event.name;
    })
}

function cancelEditing() {
    editingComponent.value = null;
}

function validateForm() {
    if (!form.value.name) {
        alert("Укажите название формы");
        return false;
    }

    if (!form.value.method) {
        alert("Укажите адрес отправки формы");
        return false;
    }

    if (!form.value.fields.length) {
        alert("Добавьте в форму элементы");
        return false;
    }

    const hasConfirmButton = form.value.fields.some(field => {
        return field.tag === FieldTag.UI_BUTTON && field.type === "submit";
    });

    if (!hasConfirmButton) {
        alert("Ваша форма не содержит кнопку отправки данных");
        return false;
    }
    return true;
}
</script>


<style scoped lang="scss">
.container {
    width: 1200px;
}

.save-button {
    padding: 20px;
}
</style>
