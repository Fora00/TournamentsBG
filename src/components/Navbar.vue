<template>
  <nav
    @click="goBack"
    class="
      bg-green-700
      flex flex-row
      justify-center
      sticky
      top-0
      z-40
      pb-4
      pt-0
      mb-8
      -mt-6
    "
  >
    <h1
      class="
        mt-2
        uppercase
        text-3xl
        font-bold
        cursor-pointer
        text-gray-800
        dark:text-white
      "
    >
      tournaments
    </h1>
  </nav>
</template>

<script>
export default {
  emits: ["NavbarSelection", "updateFirebase"],

  methods: {
    goBack() {
      this.$emit("NavbarSelection");
      this.$emit("updateFirebase");
    },
  },
};
</script>
