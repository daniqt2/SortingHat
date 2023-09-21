<script setup lang="ts">
import { HOUSES } from "../models/question.interface";
const emit = defineEmits<{ (e: "finish"): void }>();
const { house, points, name } = defineProps<{
  house: string;
  points: number;
  name: string;
}>();

console.log("_------", house);
const HOUSE_NAME = {
  [HOUSES.g]: { name: "GRIFFINDOR", bg: "bg-griffindor" },
  [HOUSES.s]: { name: "SLYTHERIN", bg: "bg-slythering" },
  [HOUSES.r]: { name: "RAVENCLAW", bg: "bg-ravenclaw" },
  [HOUSES.h]: { name: "HUFFLEPUFF", bg: "bg-hufflepuff" },
};
</script>

<template>
  <v-dialog width="500" :class="HOUSE_NAME[house as HOUSES].bg" persistent>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" text="Check out your results"> </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="R E S U L T S">
        <v-card-text>
          {{
            `Congrats ${name}! You've been sorted to the ${
              HOUSE_NAME[house as HOUSES].name
            } house! Points: ${points}`
          }}</v-card-text
        >

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="GO BACK"
            @click="
              isActive.value = false;
              emit('finish');
            "
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
