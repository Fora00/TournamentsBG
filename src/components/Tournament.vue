<template>
  <div class="flex flex-col items-center">
    <h1 class="uppercase items-center">Torneo {{ tournament.name }}</h1>
    <h2>
      with
      <p class="capitalize">
        {{ tournament.players }}
      </p>
    </h2>
    <div v-for="(game, index) in tournament.games" :key="index">
      {{ index }}
      <div class="border-2 border-green-500 flex items-center">
        <p class="uppercase border-2 border-black flex-1">
          {{ game.name }}
        </p>
        <div class="border-2 border-black">
          <div class="capitalize">Matches played:</div>
          <div class="border-1 border-gray-500 bg-gray-200 text-center">
            {{ game.numberMatches }}
          </div>
          <div class="border-1 border-gray-500 bg-gray-200 text-center">
            {{ game.winners }}
          </div>
        </div>
        <div class="border-2 border-black flex flex-row items-center">
          <p class="capitalize mr-2">Aggiungere Vincitore:</p>
          <div class="flex flex-wrap align-middle">
            <input
              type="text"
              placeholder="winner"
              v-model="winnersInput[index]"
              class="border-2"
            />
            <button
              class="
                bg-green-500
                h-6
                w-6
                text-white text-center
                hover:bg-green-200 hover:text-black
                font-extrabold
                flex
                items-center
                justify-center
                rounded-full
                cursor-pointer
                ml-2
              "
              @click="addGame(game, index)"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      @click="goBack"
      class="
        border-2 border-gray-500
        bg-gray-500
        text-white
        hover:bg-gray-200 hover:text-black
        mt-6
        cursor-pointer
      "
    >
      Back
    </div>
  </div>
  <div class="uppercase">{{ winnersInput }} and {{ winners }}</div>
</template>

<script>
export default {
  emits: ["toggleSelection"],
  props: ["tournament"],
  data() {
    return {
      winnersInput: [],
      winners: [],
    };
  },
  methods: {
    addGame(game, index) {
      game.numberMatches = game.numberMatches + 1;
      game.winners.push(this.winnersInput[index]);
      this.winnersInput = [];
    },

    goBack() {
      this.$emit("toggleSelection");
    },
  },
};
</script>

<style></style>
