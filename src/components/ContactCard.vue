<template>
  <div>
    <div class="p-1">
      <strong>Tên:</strong>
      {{ contact.name }}
    </div>
    <div class="p-1">
      <strong>E-mail:</strong>
      {{ contact.email }}
    </div>
    <div class="p-1">
      <strong>Địa chỉ:</strong>
      {{ contact.address }}
    </div>
    <div class="p-1">
      <strong>Điện thoại:</strong>
      {{ contact.phone }}
    </div>
    <div class="p-1">
      <strong>Liên hệ yêu thích:&nbsp;</strong>
      <i v-if="contact.favorite" class="fa-solid fa-heart"></i>
      <i v-else class="fa-solid fa-x"></i>
    </div>
    <div class="pt-1 update">
      <strong> <i class="fa-regular fa-pen-to-square"></i> Hiệu chỉnh</strong>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contact: { type: Object, required: true },
  },
  setup(props) {
    return {
      contact: props.contact,
    };
  },
};
</script>

<style>
.update {
  display: inline-block;
  background-color: rgb(227, 190, 44);
  display: flex;
  width: 30%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
}
</style>
