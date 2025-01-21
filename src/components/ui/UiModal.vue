<template>
    <Teleport to="body">
        <dialog aria-label="Ошибка" ref="dialog" class="ui-modal">
            <div class="ui-modal__content">
                {{ message }}
                <UiButton text="OK" :type="ButtonType.BUTTON" @click="closeModal"/>
            </div>
        </dialog>
    </Teleport>
</template>

<script setup lang="ts">
import {computed, onMounted, Ref, ref, watch} from "vue";
import {useMessagesStore} from "@/stores/message";
import UiButton from "@/components/ui/UiButton.vue";
import {ButtonType} from "@/typespaces/types";

const messageStore = useMessagesStore();

const dialog: Ref<HTMLDialogElement | null> = ref(null);

const message = computed(() => {
    return messageStore.message;
});

watch(message, (newValue) => {
    if (newValue) {
        (dialog.value as HTMLDialogElement).showModal();
    }
});
function closeModal() {
    (dialog.value as HTMLDialogElement).close();
    messageStore.clearMessage();
}
</script>

<style scoped lang="scss">
.ui-modal {
    background: white;
    width: calc(100% - 50px);
    max-width: 580px;
    inset: 0;
    border: none;
    border-radius: 10px;
    padding: 20px;
    font-size: 16px;
    transition: transform 0.3s ease-in-out;
    position: fixed;
    &::backdrop {
        background-color: rgb(0 0 0 / 0.6);
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
    }
}
.ui-modal__content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
}
.ui-modal__button {
    font-size: 18px;
    padding: 10px 16px;
    border: 1px solid var(--color-light-gray);
    border-radius: 4px;
    color: var(--color-font-secondary);
}
</style>
