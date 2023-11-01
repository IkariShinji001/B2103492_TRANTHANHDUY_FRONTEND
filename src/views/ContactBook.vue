<template>
  <div class="page row">
    <div class="col-md-10">
      <input-search v-model="searchText"></input-search>
    </div>
    <div class="mt-3 col-md-6">
      <h4>
        Danh bạ
        <i class="fas fa-address-book"></i>
      </h4>
      <contact-list
        v-if="filteredContactsCount > 0"
        :contacts="filteredContacts"
        v-model:activeIndex="activeIndex"
      ></contact-list>
      <p v-else>Không có liên hệ nào.</p>
      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
         <i class="fa-solid fa-asterisk"></i> Làm mới
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddContact">
          <i class="fas fa-plus"></i> Thêm mới
        </button>
        <button class="btn btn-sm btn-danger" @click="removeAllContacts">
          <i class="fa-solid fa-trash-can"></i> Xóa tất cả
        </button>
      </div>
    </div>
    <div class="mt-3 col-md-6">
      <div v-if="activeContact">
        <h4>
          Chi tiết Liên hệ
          <i class="fas fa-address-card"></i>
        </h4>
        <contact-card :contact="activeContact"> </contact-card>
      </div>
    </div>
  </div>
</template>
<script>
import InputSearch from "../components/InputSearch.vue";
import ContactCard from "../components/ContactCard.vue";
import ContactList from "../components/ContactList.vue";
import ContactService from "../services/contact.service";
import { ref, computed, onBeforeMount, watch } from "vue";
import {useRouter} from 'vue-router';
export default {
  components: {
    "input-search": InputSearch,
    "contact-card": ContactCard,
    "contact-list": ContactList,
  },
  setup() {
    const router = useRouter();
    const contacts = ref([]);
    const activeIndex = ref(-1);
    const searchText = ref();

    onBeforeMount(async () => {
      try {
        await retrieveContacts();
        console.log(contacts.value);
      } catch (error) {
        console.log(error);
      }
    });

    watch(searchText, () => {
      activeIndex.value = -1;
    });

    const retrieveContacts = async () => {
      try {
        contacts.value = await ContactService.getAll();
      } catch (error) {
        console.log(error);
      }
    };

    const refreshList = async () => {
      try {
        await retrieveContacts();
        activeIndex.value = -1;
      } catch (error) {
        console.log(error);
      }
    };

    const contactStrings = computed(() => {
      return contacts.value.map((contact) => {
        const { name, email, address, phone } = contact;
        return [name, email, address, phone].join("");
      });
    });

    const filteredContacts = computed(() => {
      if (!searchText.value) {
        return contacts.value;
      }
      return contacts.value.filter((contact, index) => {
        return contactStrings.value[index].includes(searchText.value);
      });
    });

    const activeContact = computed(() => {
      if (activeIndex.value < 0) return null;
      return filteredContacts.value[activeIndex.value];
    });

    const filteredContactsCount = computed(() => {
      return filteredContacts.value.length;
    });

    async function removeAllContacts() {
      if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
        try {
          await ContactService.deleteAll();
          refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    }

    const goToAddContact = () => {
      router.push({name: "contact.add"})
    }

    return {
      contacts,
      activeIndex,
      searchText,
      contactStrings,
      filteredContacts,
      activeContact,
      retrieveContacts,
      refreshList,
      removeAllContacts,
      filteredContactsCount,
      goToAddContact
    };
  },
};
</script>

<style scoped>
.page {
  text-align: left;
  max-width: 750px;
  margin: 0 auto;
}
</style>
