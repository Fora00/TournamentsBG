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
    <img
      v-if="this.image"
      :src="this.image"
      :alt="name"
      :title="name"
      class="p-1"
    />
    <img
      v-else
      src="@/assets/notFoundimg.jpeg"
      alt="BGG is funny"
      title="BGG is funny"
      class="p-1"
    />
  </div>
</template>

<script>
import * as Geekdo from "geekdo-sdk";

export default {
  props: ["name"],
  data() {
    return {
      image: null,
    };
  },
  methods: {
    async getGame() {
      try {
        let geekobject = await Geekdo.search({
          query: this.name,
          type: "boardgame",
          exact: 5,
        }).toPromise();
        let idGame = geekobject[0].id;
        let imageGame = await Geekdo.thing({ id: idGame }).toPromise();
        this.image = imageGame.thumbnail;
        this.img = this.image;
      } catch (err) {
        this.image = "/img/notFoundimg.77ff2841.jpeg";
        console.log(err);
      }
    },
  },
  mounted() {
    this.getGame();
  },
};
</script>
