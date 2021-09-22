<template>
  <div>{{ tournament.games }}</div>
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
    };
  },
  methods: {
    addGame(game, index) {
      game.numberMatches = game.numberMatches + 1;
      game.winners.push(this.winnersInput[index]);
      console.log("is ", game.winners[0]);
      console.log("is winner  ", this.winnerProxy);
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

      let winner = this.mode(this.winnerArray);

      console.log(winner);
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
