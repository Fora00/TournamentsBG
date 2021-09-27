<template>
  <div class="flex flex-col items-center mt-4">
    <div v-if="!winner">
      <h1 class="uppercase items-center text-3xl font-extrabold">
        Torneo {{ tournament.name }}
      </h1>

      <div class="flex flex-row items-center mb-4">
        <h3 class="font-light italic mr-5 ml-5">with</h3>
        <div v-for="(player, index) in tournament.players" :key="index">
          <p class="pl-2 font-bold capitalize text-2xl">
            {{ player }}
            <span v-if="!(index == tournament.players.length - 1)">,</span>
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <div
        class="
          w-auto
          h-auto
          flex flex-row
          items-center
          text-center
          justify-center
          text-yellow-400
          border-double border-4 border-yellow-400
          rounded-full
        "
      >
        <div
          v-for="(winnerPerson, index) in winner"
          :key="index"
          class="flex flex-row align-middle"
        >
          <h1 class="uppercase text-4xl font-extrabold w-auto ml-2">
            {{ winnerPerson }}
            <span
              v-if="!(index == winner.length - 1)"
              class="text-4xl ml-2 mr-2"
              >-</span
            >
          </h1>
        </div>
      </div>
      <h2 class="italic mt-2 ml-8">
        <span v-if="winner.length > 1">are the Winners of</span>
        <span v-else-if="winner.length <= 1">is the Winner of</span>
        <span class="font-bold ml-2 mr-2 text-2xl">{{ tournament.name }}</span>
        after
        <span class="font-bold ml-2 mr-2 text-2xl">
          {{ gamesTotal }}
        </span>
        games
      </h2>
    </div>

    <div v-for="(game, index) in tournament.games" :key="index" class="mt-2">
      <div class="border-2 border-green-500 flex mb-6 items-stretch">
        <div class="flex flex-col">
          <gameImage :name="game.name" />
        </div>
        <div class="border-2 border-black mr-4 mt-2 mb-2 p-2">
          <div class="capitalize text-center">
            Matches played:
            <span>
              {{ game.numberMatches }}
            </span>
          </div>
          <div
            class="
              border-2 border-black
              flex flex-row
              items-center
              mr-4
              mt-2
              mb-2
              p-2
            "
          >
            <p class="capitalize mr-2">Winner of the match:</p>
            <div class="flex flex-wrap align-middle">
              <select
                v-model="winnersInput[index]"
                class="border-2 w-auto text-black mr-3 py-1 px-3"
              >
                <option value="" disabled>--select one--</option>
                <option
                  v-for="option in myOptions"
                  :value="option"
                  :key="option"
                >
                  {{ option }}
                </option>
              </select>
              <button
                @click="addGame(game, index)"
                :class="
                  winnersInput[index]
                    ? ' cursor-pointer text-white bg-green-500 focus:shadow-outline hover:bg-green-200 hover:text-black '
                    : 'border border-green-300 text-gray-500 pointer-events-none'
                "
                class="
                  inline-flex
                  items-center
                  justify-center
                  w-6
                  h-6
                  m-2
                  p-2
                  rounded-full
                "
              >
                <svg class="w-6 h-6 fill-current" viewBox="0 0 20 20">
                  <path
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="flex flex-col border-2 border-black mr-4 p-2">
            <p class="text-center">
              Winners of {{ game.name }}:
              <input type="checkbox" id="checkbox" v-model="checked[index]" />
            </p>

            <div v-show="checked[index]" class="flex flex-wrap justify-center">
              <div
                v-for="(winner, index) in game.winners"
                :key="index"
                class="
                  w-3/6
                  text-center
                  truncate
                  overflow-ellipsis
                  border border-white
                  bg-gray-200
                "
              >
                {{ winner }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row uppercase bottom-0 fixed">
      <div
        @click="goBack"
        class="
          border-2 border-gray-500
          bg-gray-500
          text-white
          hover:bg-gray-200 hover:text-black
          shadow-lg
          mt-6
          ml-2
          mr-2
          mb-2
          p-2
          rounded-l-lg
          cursor-pointer
        "
      >
        Back
      </div>
      <div
        @click="determineWinner(tournament)"
        :class="
          !checkWinner
            ? 'bg-white text-black border-2  pointer-events-none'
            : 'bg-green-500 text-white hover:bg-green-200 hover:text-black'
        "
        class="
          border-2 border-green-500
          shadow-lg
          mt-6
          ml-2
          mr-2
          mb-2
          p-2
          rounded-r-lg
          cursor-pointer
        "
      >
        winner?!
      </div>
    </div>
  </div>
</template>

<script>
import GameImage from "./GameImage.vue";
export default {
  components: { GameImage },
  emits: ["toggleSelection", "ending", "updateFirebase"],
  props: ["tournament"],
  data() {
    return {
      checkWinner: false,
      winnersInput: [],
      winnerProxy: [],
      winnerArray: [],
      winner: null,
      checked: [],
      gamesTotal: 0,
      myOptions: this.tournament.players,
    };
  },
  methods: {
    addGame(game, index) {
      this.checkWinner = true;
      game.numberMatches = game.numberMatches + 1;
      game.winners.push(this.winnersInput[index]);

      this.winnersInput = [];
    },

    goBack() {
      this.$emit("toggleSelection");
      this.$emit("updateFirebase");
    },

    determineWinner(tournament) {
      this.winnerProxy = [];
      this.gamesTotal = 0;

      for (let i = 0; i < tournament.games.length; i++) {
        let arr = tournament.games[i].winners;
        for (let j = 0; j < arr.length; j++) {
          this.winnerProxy.push(arr[j]);
        }
      }

      for (let i = 0; i < tournament.games.length; i++) {
        this.gamesTotal += tournament.games[i].numberMatches;
      }

      this.winnerArray = JSON.parse(JSON.stringify(this.winnerProxy));
      this.winner = this.find_mode(this.winnerArray);
      this.$emit("ending", this.tournament);
    },

    find_mode(arr) {
      var max = 0;
      var maxarr = [];
      var counter = [];

      arr.forEach(function () {
        counter.push(0);
      });

      for (let i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length; j++) {
          if (arr[i] == arr[j]) counter[i]++;
        }
      }

      max = this.arrayMax(counter);

      for (let i = 0; i < arr.length; i++) {
        if (counter[i] == max) maxarr.push(arr[i]);
      }

      var unique = maxarr.filter(this.onlyUnique);
      return unique;
    },

    arrayMax(arr) {
      var len = arr.length,
        max = -Infinity;
      while (len--) {
        if (arr[len] > max) {
          max = arr[len];
        }
      }
      return max;
    },

    onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    },
  },
  mounted() {
    console.log("isEnded=", this.tournament.isEnded);
    console.log("tournament is", this.tournament);
    if (this.tournament.isEnded == true) {
      this.determineWinner(this.tournament);
    }
  },
};
</script>

<style></style>
