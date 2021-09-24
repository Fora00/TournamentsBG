<template>
  <div class="border-2 border-black flex flex-col m-2">
    <p
      class="
        uppercase
        border-2 border-black
        flex-1
        ml-2
        mt-2
        mb-2
        mr-4
        text-center
      "
    >
      {{ name }}
    </p>
    <img v-if="this.image" :src="this.image" :alt="name" />
    <img v-else src="@/assets/notFoundimg.jpeg" alt="BGG is funny" />
  </div>
</template>

<script>
import * as Geekdo from "geekdo-sdk";

export default {
  props: ["name", "img"],
  data() {
    return {
      image: null,
    };
  },
  methods: {
    async getGame() {
      let x = await Geekdo.search({
        query: this.name,
        type: "boardgame",
        exact: 5,
      }).toPromise();
      let y = x[0].id;
      let z = `https://www.boardgamegeek.com/xmlapi2/thing?id=${y}`;
      console.log(z);
      let w = await Geekdo.thing({ id: y }).toPromise();
      console.log(w);
      this.image = w.thumbnail;
      console.log(w.thumbnail);
      console.log(this.image);
    },
  },
  mounted() {
    this.getGame();
  },
};
</script>
