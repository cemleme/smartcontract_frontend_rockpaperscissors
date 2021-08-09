<template>
  <div>
    <div v-if="loadingRoomCreation" class="w-full flex justify-center">
      <spinner />
    </div>
    <div class="flex justify-center" v-else>
      <span
        class="text-sm border border-2 rounded-l px-4 py-2 bg-gray-300 whitespace-no-wrap"
        >New Bet:</span
      >
      <input
        :disabled="loadingRoomCreation"
        type="number"
        step="0.001"
        class="border border-2 px-4 py-2 w-28"
        placeholder="Ether to bet"
        v-model="betAmount"
      />
      <button
        @click="createRoom"
        :disabled="loadingRoomCreation"
        class="text-sm border border-2 rounded-r px-4 py-2 bg-green-300 whitespace-no-wrap"
      >
        Create New Game
      </button>
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/Spinner.vue";

import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    Spinner,
  },
  setup() {
    const store = useStore();
    const popup = ref(false);
    const betAmount = ref(0);

    const showCreate = function() {
      popup.value = true;
    };

    const createRoom = function() {
      store.dispatch("createRoom", {value: betAmount.value });
    };

    const updateAmount = function(amount){
        betAmount.value = amount;
    }

    const loadingRoomCreation = computed(() => store.state.loadingRoomCreation);

    return { showCreate, popup, loadingRoomCreation, createRoom, betAmount, updateAmount };
  },
};
</script>
