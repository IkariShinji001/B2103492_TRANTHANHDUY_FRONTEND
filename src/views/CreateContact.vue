<template>
  <div class="page">
    <h4>Thêm Liên hệ</h4>
    <ContactForm
      :contact="contact"
      @submit:contact="createContact"
    />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
import ContactService from "@/services/contact.service";
import ContactForm from "../components/ContactForm.vue";
export  default{
  components:{
    ContactForm
  },
  setup(){
    const contact = ref(null);
    const message = ref("");

    const createContact = async (data) =>{
      console.log(contact.value);
      try {
        await ContactService.create(data);
        message.value = "Tạo liên hệ thành công";
      } catch (error) {
        console.log(error);
        message.value = "Tạo liên hệ thất bại";
      }
    }
    return{
      contact,
      message,
      createContact
    }
  }
}

</script>

<style scoped>
.page{
  margin: 0 auto;
}
</style>