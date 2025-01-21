import { defineStore } from "pinia";

interface State {
    message: string | null;
}

export const useMessagesStore = defineStore("messages", {
    state: (): State => ({
        message: null,
    }),
    actions: {
        setMessage(message: string) {
            this.message = message;
        },
        clearMessage() {
            this.message = null;
        },
    },
});
