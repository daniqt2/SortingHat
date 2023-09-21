<script setup lang="ts">
import { reactive, onMounted } from "vue";
import ChatMessage from "./ChatMessage.vue";
import AnswerOption from "./AnswerOption.vue";
import InputBox from "./InputBox.vue";
import questions from "../../questions.json";
import { ref } from "vue";
import { IAnswer, HOUSES } from "../models/question.interface";
import { IMessage } from "../models/messages.interface";
import Modal from "./Modal.vue";
import { computed } from "vue";

const EMPTY_RES = {
  [HOUSES.g]: 0,
  [HOUSES.r]: 0,
  [HOUSES.h]: 0,
  [HOUSES.s]: 0,
};

let messages = reactive<IMessage[]>([]);
const currentIndex = ref(-1);
const finished = ref(false);
const showOptions = ref(false);
const userName = ref();
const chatDiv = ref<HTMLDivElement | null>(null);
const totalQuestions = questions.length;

const result = reactive<Record<HOUSES, number>>(EMPTY_RES);

onMounted(() => triggerNextMessage());

const reset = () => {
  currentIndex.value = -1;
  Object.assign(result, EMPTY_RES);
  messages = [];
  triggerNextMessage();
  finished.value = false;
};

const emit = defineEmits<{ (e: "finish"): void }>();

const triggerNextMessage = () => {
  showOptions.value = true;
  if (currentIndex.value === totalQuestions - 1) {
    finished.value = true;
    messages.push({
      message: `Great ${userName.value} you finished! Check your results below`,
    });
  } else {
    currentIndex.value += 1;
    messages.push({ message: questions[currentIndex.value].title });
    if (chatDiv.value) chatDiv.value.scrollTo({ top: 100 });
  }
};

const updateFreeAnswer = (name: string) => {
  showOptions.value = false;
  userName.value = name;
  addMessage({
    message: `Excellent ${name}, lets continue with the questions!`,
    isUser: true,
  });
};

const updateAnswer = (answer: IAnswer) => {
  showOptions.value = false;
  Object.keys(answer.scores).forEach((house) => {
    result[house as HOUSES] += answer.scores[house as HOUSES];
  });
  addMessage({ message: answer.title.replace("?", ""), isUser: true }, 500);
};

const addMessage = (message: IMessage, customTo?: number) => {
  messages.push(message);
  setTimeout(() => triggerNextMessage(), customTo ?? 1000);
};

const handleFinish = () => {
  reset();
  emit("finish");
};

const winningHouse = computed(() => {
  let maxValue = Object.entries(result).sort((x, y) => y[1] - x[1])[0];
  return { ...maxValue };
});
</script>

<template>
  <div
    class="mx-auto h-full p-6 px-8 w-full md:w-3/5 text-xs md:text-sm bg-opacity-60 bg-slate-900 rounded-lg wrapper"
  >
    <div class="mt-auto">
      <TransitionGroup name="list" tag="div">
        <div v-for="(message, index) in messages" :key="index">
          <ChatMessage :message="message" @show="showOptions = !showOptions" />
        </div>
      </TransitionGroup>
      <span v-if="showOptions">
        <div v-if="questions[currentIndex]?.answers && !finished">
          <AnswerOption
            v-for="option in questions[currentIndex].answers"
            @click="updateAnswer(option)"
            :text="option.title"
          />
        </div>
        <div v-else-if="!finished">
          <InputBox @send="updateFreeAnswer" />
        </div>
      </span>
      <div class="mt-5" v-if="finished && winningHouse">
        <Modal
          @finish="handleFinish"
          :name="userName"
          :points="winningHouse[1]"
          :house="winningHouse[0]"
        />
      </div>
    </div>
  </div>
</template>

<style>
.chat-box {
  min-height: 70vh;
  max-height: 70vh;
}

.wrapper {
  @apply flex flex-col-reverse overflow-y-scroll;
}

.list-move,
.list-enter-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
