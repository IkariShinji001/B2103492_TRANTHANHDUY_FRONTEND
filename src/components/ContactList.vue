<template>
  <ul class="list-group">
    <li
      class="list-group-item"
      v-for="(contact, index) in contacts"
      :key="contact._id"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
    >
      {{ contact.name }}
    </li>
  </ul>
</template>

<script>
import {ref, watchEffect } from 'vue';

export default {
  props: {
    contacts: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  setup(props, { emit }) {
    const contacts = ref(props.contacts);
    const updateActiveIndex = (value) => {
      emit("update:activeIndex", value);
    };

    watchEffect(() => {
      contacts.value = props.contacts;
    });


    return {
      contacts,
      activeIndex: props.activeIndex,
      updateActiveIndex,
    };
  },
};
</script>

<style scoped>
li:hover{
  background-color: blue;
  color: white;
  cursor: pointer;
}
</style>