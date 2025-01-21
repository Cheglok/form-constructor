import { defineStore } from "pinia";
import axios from "axios";
import { useMessagesStore } from "@/stores/message";
import { Form } from "@/typespaces/types";
import { handleApiError } from "@/services/apiHelpers";

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
                    fields: payload.fields,
                });
                useMessagesStore().setMessage(response.data.message);
            } catch (e) {
                handleApiError(e);
            }
        },
        async fetchSavedForms() {
            try {
                const response = await axios.get("/saved-forms");
                this.savedForms = response.data.forms;
            } catch (e) {
                handleApiError(e);
            }
        },
        async postForm(payload: Form) {
            try {
                const response = await axios.post(payload.method, payload);
                useMessagesStore().setMessage(response.data.message);
            } catch (e) {
                handleApiError(e);
            }
        },
    },
    getters: {
        getSavedForms: (state): Form[] => {
            return state.savedForms;
        },
    },
});
