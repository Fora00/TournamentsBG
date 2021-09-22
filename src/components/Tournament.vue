<template>
  <div class="flex flex-col items-center">
    <h1 v-if="!winner" class="uppercase items-center text-3xl font-extrabold">
      Torneo {{ tournament.name }}
    </h1>
    <h1 v-else class="uppercase items-center text-3xl font-extrabold">
      {{ winner }} is the Winner of {{ tournament.name }}
    </h1>
    <div class="flex flex-row items-center mb-4">
      <h3 class="font-light italic mr-5">with</h3>
      <h2 class="capitalize text-2xl">
        {{ tournament.players }}
      </h2>
    </div>
    <div v-for="(game, index) in tournament.games" :key="index">
      <div class="border-2 border-green-500 flex items-center mb-6">
        <p class="uppercase border-2 border-black flex-1 mr-4">
          {{ game.name }}
        </p>
        <div class="border-2 border-black mr-4">
          <div class="capitalize">Matches played:</div>
          <div class="border-1 border-gray-500 bg-gray-200 text-center">
            {{ game.numberMatches }}
          </div>
        </div>
        <div class="border-2 border-black flex flex-row items-center mr-4">
          <p class="capitalize mr-2">Winner of the match:</p>
          <div class="flex flex-wrap align-middle">
            <input
              type="text"
              placeholder="winner"
              v-model="winnersInput[index]"
              class="
                border-2
                appearance-none
                bg-transparent
                border-none
                w-auto
                text-gray-700
                mr-3
                py-1
                px-2
                leading-tight
                focus:outline-none
              "
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
    <div class="flex flex-row uppercase">
      <div
        @click="goBack"
        class="
          border-2 border-gray-500
          bg-gray-500
          text-white
          hover:bg-gray-200 hover:text-black
          mt-6
          ml-2
          mr-2
          cursor-pointer
        "
      >
        Back
      </div>
      <div
        @click="determineWinner(tournament)"
        class="
          border-2 border-green-500
          bg-green-500
          text-black
          hover:bg-green-200 hover:text-black
          mt-6
          ml-2
          mr-2
          cursor-pointer
        "
      >
        winner?!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["toggleSelection"],
  props: ["tournament"],
  data() {
    return {
      winnersInput: [],
      winnerProxy: [],
      winnerArray: [],
      winner: null,
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
    determineWinner(tournament) {
      for (let i = 0; i < tournament.games.length; i++) {
        let arr = tournament.games[i].winners;
        for (let j = 0; j < arr.length; j++) {
          this.winnerProxy.push(arr[j]);
        }
      }

      this.winnerArray = JSON.parse(JSON.stringify(this.winnerProxy));

      this.winner = this.mode(this.winnerArray);
    },
    mode(arr) {
      return arr
        .sort(
          (a, b) =>
            arr.filter((v) => v === a).length -
            arr.filter((v) => v === b).length
        )
        .pop();
    },
  },
};
</script>

<style></style>
