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
      <div class="border-2 border-green-500 flex items-center">
        <p class="uppercase border-2 border-black flex-1">
          {{ game.name }}
        </p>
        <div class="border-2 border-black">
          <div class="capitalize">Matches played:</div>
          <div class="border-1 border-gray-500 bg-gray-200 text-center">
            {{ game.numberMatches }}
          </div>
        </div>
        <div class="border-2 border-black flex flex-row items-center">
          <p class="capitalize">Aggiungere partita</p>
          <div
            class="
              bg-green-500
              h-5
              w-5
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
            @click="addGame(game)"
          >
            <span>+</span>
          </div>
        </div>
      </div>
    </div>
    <div
      @close="toggleSelection"
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
</template>

<script>
export default {
  props: ["tournament"],
  data() {
    return {
      isSelected: false,
    };
  },
  methods: {
    addGame(game) {
      game.numberMatches = game.numberMatches + 1;
    },
    toggleSelection() {
      this.$emit("isSelection", this.isSelected);
    },
  },
};
</script>

<style></style>
