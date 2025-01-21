import axios from "axios";
import { useMessagesStore } from "@/stores/message";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleApiError = (error: any) => {
    if (axios.isCancel(error)) {
        return;
    }
    const messagesStore = useMessagesStore();

    if (error.message === "Network Error") {
        messagesStore.setMessage("Нет соединения с сервером.");
        return;
    }

    if (axios.isAxiosError(error)) {
        if (error.response) {
            if (error.response.status === 500) {
                messagesStore.setMessage("Ошибка на сервере, статус 500. Пожалуйста, обратитесь к администратору.");
            } else {
                messagesStore.setMessage(`Ошибка на сервере: ${error.response.status}: ${error.response.statusText}`);
            }
        }
        return;
    }
    messagesStore.setMessage(error);
};
