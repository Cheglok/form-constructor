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
                const isInitialValueCorrect = validatedField.options.some((option: string) => option === validatedField.currentValue);
                if (!isInitialValueCorrect) {
                    isValid = false;
                    validatedField.currentValueError = "Выбранное значение не соответствует вариантам"
                }
            }

        }
    }
    return {isValid, validatedField};
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
