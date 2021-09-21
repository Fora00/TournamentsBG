<template>
  <Navbar />

  <div
    v-show="selection"
    class="text-center flex flex-col justify-center items-center"
  >
    <div v-for="(tournament, index) in tournaments" :key="index">
      <div
        @click="showTournament(tournament)"
        class="
          shadow-md
          bg-green-600
          text-white
          p-10
          text-center
          rounded
          mb-5
          cursor-pointer
          hover:bg-green-200 hover:text-black
          flex flex-col flex-wrap
        "
      >
        <div>
          Torneo: {{ index + 1 }} chiamato {{ tournament.name }} con
          {{ tournament.players }} e n° giochi =
          {{ tournament.games.length }}
        </div>

        <div class="flex flex-row justify-around">
          <div
            @click.stop="deleteTournament(index)"
            class="
              mt-5
              bg-red-500
              hover:bg-red-200
              h-10
              w-10
              flex
              items-center
              justify-center
              rounded-full
            "
          >
            X
          </div>
        </div>
      </div>
    </div>
    <div
      class="
        bg-green-500
        h-12
        w-12
        text-white text-center
        hover:bg-green-200 hover:text-black
        font-extrabold
        flex
        items-center
        justify-center
        rounded-full
        cursor-pointer
      "
      @click="openModal"
    >
      <span>+</span>
    </div>

    <div
      v-if="isPlus"
      class="
        fixed
        overflow-x-hidden overflow-y-auto
        inset-0
        flex
        justify-center
        items-center
        z-50
      "
    >
      <div class="relative mx-auto w-auto max-w-2xl">
        <div
          class="
            bg-white
            w-full
            rounded
            shadow-2xl
            flex flex-col
            justify-center
            items-center
            ml-4
          "
        >
          <span class="text-2xl m-2 uppercase">Define your tournament</span>

          <form class="flex flex-col">
            <div class="m-2 flex justify-between">
              <label class="mr-2">Name : </label>
              <input
                type="text"
                class="border overflow-ellipsis text-xs"
                placeholder="Tournament Name"
                v-model="formName"
              />
            </div>
            <div class="m-2 flex justify-between">
              <label class="mr-2">Players : </label>
              <input
                type="text"
                class="border overflow-ellipsis text-xs"
                placeholder="Tournament Players"
                v-model="formPlayers"
              />
            </div>
            <div class="m-2 flex justify-between">
              <label class="mr-2">Giochi iniziali: </label>
              <input
                type="text"
                class="border overflow-ellipsis text-xs"
                placeholder="Tournament Games"
                v-model="formGames"
              />
            </div>
          </form>
          <div class="flex justify-around mb-2 mt-4">
            <button
              @click="switchIsPlus"
              class="
                bg-gray-500
                text-white
                hover:bg-gray-200 hover:text-black
                rounded
                mr-6
                cursor-pointer
              "
            >
              <p class="uppercase m-1">Back</p>
            </button>

            <button
              :class="
                formName && formPlayers && formGames
                  ? 'bg-green-500 text-white'
                  : 'border border-green-500 text-black pointer-events-none'
              "
              class="
                hover:bg-green-200 hover:text-black
                rounded
                uppercase
                cursor-pointer
              "
            >
              <span class="uppercase m-1" @click="addTournament">add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="isPlus"
      class="
        fixed
        inset-0
        bg-gray-800 bg-opacity-50
        overflow-y-auto
        h-full
        w-full
      "
    ></div>
  </div>

  <Tournament
    v-show="!selection"
    :tournament="tournamentSelected"
    @close="isSelection"
  />
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Tournament from "@/components/Tournament.vue";

export default {
  name: "App",
  components: { Navbar, Tournament },
  data() {
    return {
      formName: "",
      formPlayers: "",
      formGames: "",
      isPlus: false,
      tournamentSelected: {},
      selection: true,

      tournaments: [
        {
          id: 1,
          name: "Test 1",
          players: "A,B,C,D",
          games: [
            { name: "Gioco 1", numberMatches: 2 },
            { name: "Gioco 2", numberMatches: 1 },
            { name: "Gioco 3", numberMatches: 3 },
          ],
        },
        {
          id: 2,
          name: "Test 2",
          players: "A,B,C",
          games: [
            { name: "Gioco 1", numberMatches: 2 },
            { name: "Gioco 2", numberMatches: 1 },
            { name: "Gioco 3", numberMatches: 10 },
          ],
        },
        {
          id: 3,
          name: "Test 3",
          players: "A,B,D",
          games: [{ name: "Gioco 1", numberMatches: 0 }],
        },
        {
          id: 4,
          name: "Test 4",
          players: "B,C,D",
          games: [
            { name: "Gioco 1", numberMatches: 2 },
            { name: "Gioco 2", numberMatches: 1 },
            { name: "Gioco 3", numberMatches: 3 },
            { name: "Gioco 4", numberMatches: 6 },
          ],
        },
      ],
    };
  },
  methods: {
    openModal() {
      this.isPlus = true;
    },
    addTournament() {
      let gameToAdd = this.formGames.split(",");
      let gamesArr = [];

      for (let i = 0; i < gameToAdd.length; i++) {
        gamesArr.push({ name: gameToAdd[i], numberMatches: 0 });
      }

      this.tournaments.push({
        id: this.tournaments.length + 1,
        name: this.formName,
        players: this.formPlayers,
        games: gamesArr,
      });

      this.formName = "";
      this.formPlayers = "";
      this.formGames = "";
      this.switchIsPlus();
    },
    deleteTournament(id) {
      this.tournaments.splice(id, 1);
    },

    switchIsPlus() {
      this.isPlus = !this.isPlus;
    },
    showTournament(x) {
      this.tournamentSelected = x;
      this.selection = !this.selection;
    },
    toggleSelection() {
      this.selection = !this.selection;
    },
  },
};
</script>

<style></style>
