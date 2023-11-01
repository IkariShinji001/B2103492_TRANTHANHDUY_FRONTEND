<template>
  <div v-if="contact" class="page">
    <h4>Hiệu chỉnh Liên hệ</h4>
    <ContactForm
      :contact="contact"
      @submit:contact="updateContact"
      @delete:contact="deleteContact"
    />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import ContactService from "@/services/contact.service";
import ContactForm from "../components/ContactForm.vue";

export default {
  components: {
    ContactForm,
  },
  props: {
    id: { type: String, required: true },
  },
  setup() {
    const contact = ref(null);
    const message = ref("");
    const router = useRouter();
    const route = useRoute();

    const getContact = async (id) => {
      try {
        contact.value = await ContactService.get(id);
      } catch (error) {
        console.log(error);
        // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
        const pathSegments = route.path.split("/").slice(1);
        router.push({
          name: "notfound",
          params: { pathMatch: pathSegments },
          query: route.query,
          hash: route.hash,
        });
      }
    };

    const updateContact = async (data) => {
      try {
        await ContactService.update(contact.value._id, data);
        message.value = "Liên hệ được cập nhật thành công.";
      } catch (error) {
        console.log(error);
      }
    };

    const deleteContact = async () => {
      if (confirm("Bạn muốn xóa Liên hệ này?")) {
        try {
          await ContactService.delete(contact.value._id);
          router.push({ name: "contactbook" });
        } catch (error) {
          console.log(error);
        }
      }
    };

    onBeforeMount(async () => {
      await getContact(route.params.id);
      message.value = "";
    });

    return {
      contact,
      message,
      getContact,
      updateContact,
      deleteContact,
    };
  },
};
</script>

<style scoped>
.page{
  margin: 0 auto;
}
</style>