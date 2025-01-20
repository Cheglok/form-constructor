import {DataSourceType, FieldTag, Form, FormField} from "@/typespaces/types";
import {defaultFields, defaultForm} from "@/constants/constants";

export function validateFormBuilder(
    {newFieldData, sourceType}: { newFieldData: FormField; sourceType: string; }
): {
    isValid: boolean;
    validatedField: FormField;
} {
    const validatedField = JSON.parse(JSON.stringify(newFieldData));
    let isValid = true;
    delete validatedField.labelError;
    delete validatedField.buttonTextError;
    delete validatedField.currentValueError;
    delete validatedField.apiEndpointError;

    if (validatedField.tag === FieldTag.UI_BUTTON || validatedField.tag === FieldTag.UI_SELECT) {
        if (!validatedField.text) {
            isValid = false;
            validatedField.buttonTextError = "Текст для кнопки обязателен";
        }
    }
    if (validatedField.tag !== FieldTag.UI_BUTTON) {
        if (!validatedField.label) {
            isValid = false;
            validatedField.labelError = "Подпись для поля обязательна"
        }
        if (sourceType === DataSourceType.API) {
            if (!validatedField.apiEndpoint) {
                isValid = false;
                validatedField.apiEndpointError = "Обязательно укажите источник данных"
            }
        } else {
            if (validatedField.tag === FieldTag.UI_SELECT) {
                if (!validatedField.options?.length) {
                    validatedField.optionsError = "Опишите варианты"
                    isValid = false;
                } else {
                    const isUnique = new Set(validatedField.options).size === validatedField.options.length;
                    if (!isUnique) {
                        validatedField.optionsError = "Варианты должны быть уникальными"
                        isValid = false;
                    }
                }
            }

        }
    }
    return {isValid, validatedField};
}
export function validateForm(fields: FormField[]): boolean {
    let isValid = true;
    fields.forEach((field: FormField) => {
        if (field.required && !validateRequiredField(field)) {
            isValid = false;
        }
    })
    return isValid;
}

function validateRequiredField(field: FormField): boolean {
    delete field.errorMessage;
    switch (field.tag) {
        case FieldTag.UI_INPUT:
            if (!field.currentValue) {
                field.errorMessage = "Поле обязательно для заполнения"
                return false;
            }
            break
        case FieldTag.UI_SELECT:
            if (!field.currentValue) {
                field.errorMessage = "Обязательно выбрать вариант"
                return false;
            }
            break
        case FieldTag.UI_CHECKBOX:
            if (!field.currentValue) {
                field.errorMessage = "Обязательно отметить"
                return false;
            }
    }
    return true
}

export function getDefaultField(tag: FieldTag): FormField {
    return structuredClone(defaultFields[tag])
}
export function getDefaultForm(): Form {
    return structuredClone(defaultForm)
}

export function makeUniqueName() {
    return `${Math.random()}`
}
