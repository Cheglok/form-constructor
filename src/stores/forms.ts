import { defineStore } from "pinia";
import axios from "axios/index";
import {useMessagesStore} from "@/stores/message";
import {Form} from "@/typespaces/types";
import {handleApiError, validateApiResponseSuccess} from "@/services/apiHelpers";

interface State {
    savedForms: Form[];
}

export const useFormsStore = defineStore("forms", {
    state: (): State => ({
        savedForms: [],
    }),
    actions: {
        async postSaveForm(payload: Form) {
            try {
                const response = await axios.post("/save-form", {
                    name: payload.name,
                    method: payload.method,
                    fields: payload.fields
                });
                validateApiResponseSuccess(response);
                useMessagesStore().setMessage(response.data.message);
            }
            catch (e) {
                handleApiError(e);
            }
        },
        async fetchSavedForms() {
            try {
                const response = await axios.get('/saved-forms');
                validateApiResponseSuccess(response);
                this.savedForms = response.data.forms;
            } catch (e) {
                handleApiError(e);
            }
        }
    },
});
