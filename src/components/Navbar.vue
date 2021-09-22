<template>
  <nav
    @click="goBack"
    class="bg-green-700 flex flex-row justify-center mb-10 p-4"
  >
    <h1 class="uppercase text-3xl font-bold cursor-pointer text-white">
      tournaments
    </h1>
  </nav>
</template>

<script>
export default {
  emits: ["NavbarSelection"],

  methods: {
    goBack() {
      this.$emit("NavbarSelection");
    },
  },
};
</script>
