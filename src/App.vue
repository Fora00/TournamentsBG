<template>
  <!-- TODO: responsivness ? -->
  <Navbar @NavbarSelection="selectedNavbar" @updateFirebase="updating" />

  <div
    v-if="selection"
    class="text-center flex flex-col justify-center items-center"
  >
    <div class="text-center flex flex-wrap justify-center items-center">
      <div v-for="(tournament, index) in tournaments" :key="index">
        <div
          @click="showTournament(tournament)"
          class="
            w-auto
            shadow-md
            bg-green-500
            text-gray-800
            dark:text-white
            p-10
            text-center
            rounded
            m-5
            cursor-pointer
            hover:bg-green-200 hover:text-black
            dark:hover:bg-gray-400
            flex flex-col flex-wrap
          "
        >
          <div class="flex flex-row">
            <div
              @click.stop="deleteTournament(index, tournament.name)"
              class="
                -ml-14
                -mt-14
                bg-red-500
                hover:bg-red-200
                h-8
                w-8
                flex
                items-center
                justify-center
                rounded-full
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
          </div>
          <div>
            Torneo {{ index + 1 }}: named
            <span class="font-bold"> {{ tournament.name }}</span>
          </div>
          <div class="flex flex-row justify-center">
            <span> with </span>
            <div v-for="(player, index) in tournament.players" :key="index">
              <p class="pl-2 font-bold">{{ player }}</p>
            </div>
          </div>
          <div>
            and
            <span class="font-bold">
              {{ tournament.games.length }}
            </span>
            games
          </div>
        </div>
      </div>
    </div>
    <div
      class="
        bg-green-500
        mt-8
        h-12
        w-12
        text-gray-800
        dark:text-white
        text-center
        hover:bg-green-200 hover:text-black
        dark:hover:bg-gray-400
        font-extrabold
        flex
        items-center
        justify-center
        rounded-full
        cursor-pointer
      "
      @click="openModal"
    >
      <svg class="w-6 h-6 fill-current" viewBox="0 0 20 20">
        <path
          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
          clip-rule="evenodd"
          fill-rule="evenodd"
        ></path>
      </svg>
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
      <!-- TODO: colori bottoni -->
      <!-- TODO: testo inglese -->
      <!-- TODO: modal design in dark mode -->
      <!-- TODO: back + add come icone-->
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
            dark:text-gray-600 dark:bg-green-200
          "
        >
          <span class="text-2xl m-2 uppercase font-bold"
            >Define your tournament</span
          >

          <form class="flex flex-col">
            <div class="m-2 flex justify-between">
              <label class="mr-2 px-4">Name : </label>
              <input
                type="text"
                class="border overflow-ellipsis text-xs px-2"
                placeholder="Tournament Name"
                v-model="formName"
              />
            </div>
            <div class="m-2 flex justify-between">
              <label class="mr-2 px-4">Players : </label>
              <input
                type="text"
                class="border overflow-ellipsis text-xs px-2"
                placeholder="Tournament Players"
                v-model="formPlayers"
              />
            </div>
            <div class="m-2 flex justify-between">
              <label class="mr-2 px-4">Games: </label>
              <input
                type="text"
                class="border overflow-ellipsis text-xs px-2"
                placeholder="Tournament Games"
                v-model="formGames"
              />
            </div>
          </form>
          <div class="flex justify-around mb-2 mt-4">
            <button
              @click="switchIsPlus"
              class="
                bg-gray-400
                text-gray-800
                dark:text-white
                hover:bg-gray-200 hover:text-black
                rounded
                mr-4
                cursor-pointer
                rounded-l-lg
              "
            >
              <p class="uppercase m-1">Back</p>
            </button>

            <button
              :class="
                formName && formPlayers && formGames
                  ? 'bg-green-500 text-gray-800 dark:text-white'
                  : 'border border-green-500 text-black pointer-events-none'
              "
              class="
                hover:bg-green-200 hover:text-black
                dark:hover:bg-green-700
                rounded
                uppercase
                cursor-pointer
                rounded-r-lg
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
  <div v-else>
    <Tournament
      v-show="!selection"
      @toggleSelection="selected"
      :tournament="tournamentSelected"
      @ending="isEnding"
      @updateFirebase="updating"
    />
  </div>
</template>

<script>
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "@/Firebase/firebaseInit.js";

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

      tournaments: [],
    };
  },
  methods: {
    openModal() {
      this.isPlus = true;
    },
    addTournament() {
      let gameToAdd = this.formGames.split(",");
      let gamesArr = [];
      let playersToAdd = this.formPlayers.split(",");
      let playersArr = [];

      for (let i = 0; i < gameToAdd.length; i++) {
        gamesArr.push({
          name: gameToAdd[i],
          numberMatches: 0,
          winners: [],
        });
      }
      for (let i = 0; i < playersToAdd.length; i++) {
        playersArr.push(playersToAdd[i]);
      }

      this.tournaments.push({
        id: this.tournaments.length + 1,
        isEnded: false,
        name: this.formName,
        players: playersArr,
        games: gamesArr,
      });

      this.firebaseAdding(gamesArr, playersArr);

      this.formName = "";
      this.formPlayers = "";
      this.formGames = "";

      this.switchIsPlus();
    },
    deleteTournament(id, name) {
      this.firebaseDeleting(name);
      this.tournaments.splice(id, 1);
    },

    switchIsPlus() {
      this.isPlus = !this.isPlus;
    },
    showTournament(x) {
      this.tournamentSelected = x;
      this.selection = !this.selection;
    },
    selected() {
      this.selection = !this.selection;
    },
    selectedNavbar() {
      this.selection = true;
    },
    isEnding(x) {
      x.isEnded = true;
    },

    async firebaseAdding(gamesArr, playersArr) {
      try {
        const docRef = await addDoc(collection(db, "tournaments"), {
          id: this.tournaments.length + 1,
          isEnded: false,
          name: this.formName,
          players: playersArr,
          games: gamesArr,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },

    async firebaseDeleting(name) {
      const querySnapshot = await getDocs(collection(db, "tournaments"));
      querySnapshot.forEach((doc) => {
        if (doc.data().name === name) {
          let x = deleteDoc(doc.ref);
          console.log(x);
        }
      });
    },
    async updating() {
      const querySnapshot = await getDocs(collection(db, "tournaments"));

      querySnapshot.forEach((doc) => {
        this.tournaments.forEach((tournament) => {
          if (doc.data().name == tournament.name) {
            setDoc(doc.ref, {
              id: tournament.id,
              isEnded: tournament.isEnded,
              name: tournament.name,
              games: tournament.games,
              players: tournament.players,
            });
          } else {
            console.log("?");
          }
        });
      });
    },
  },
  async mounted() {
    const querySnapshot = await getDocs(collection(db, "tournaments"));
    querySnapshot.forEach((doc) => {
      this.tournaments.push(doc.data());
    });
  },
};
</script>
