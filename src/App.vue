<template>
  <div>
    <div v-if="waitingForMetamask">Waiting for metamask...</div>
    <div v-else>
      <div class="flex flex-col-reverse justify-center ">
        <game-room
          v-for="game in filteredItems"
          :key="game.id"
          :game="game"
          :id="game.id"
        />

        <create-button ref="createButton" />
        <div class="text-sm font-ligh text-gray-50 col-span-2">
          My Earnings: {{ earningsEther }}
          <button v-if="earnings > 0"
            @click="setAllInn"
            class="text-sm border border-2 rounded-r px-4 py-2 bg-green-300 whitespace-no-wrap"
          >
            Bet All!
          </button>
        </div>
        <game-filter v-model="filter" />
      </div>
    </div>
  </div>
</template>

<script>
import Web3 from "@/web3.js";
const Web3Utils = require('web3-utils');
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { abi, contractAddress } from "@/contract/contract.js";

import GameRoom from "@/components/GameRoom.vue";
import GameFilter from "@/components/GameFilter.vue";
import CreateButton from "./components/CreateButton.vue";

export default {
  components: {
    GameRoom,
    GameFilter,
    CreateButton,
  },
  setup() {
    const store = useStore();
    const waitingForMetamask = ref(true);
    const games = computed(() => store.getters.getRooms);

    const filter = ref(1);

    onMounted(async () => {
      const web3 = await Web3();
      let accounts = await web3.eth.getAccounts();
      store.dispatch("setAccount", { account: accounts[0] });

      window.ethereum.on("accountsChanged", async function(accounts) {
        store.dispatch("setAccount", { account: accounts[0] });
        store.dispatch("loadPlayerEarnings");
        //console.log("account changed to: " + accounts[0]);
      });

      var rpsContract = new web3.eth.Contract(abi, contractAddress);

      store.dispatch("setContract", { contract: rpsContract });
      store.dispatch("loadRooms");
      store.dispatch("loadPlayerEarnings");

      rpsContract.events.CreateRoom(function(error, result) {
        if (!error) {
          store.dispatch("addRoom", result.returnValues.room);
        } else {
          console.log(error);
        }
      });

      rpsContract.events.UpdateRoom(function(error, result) {
        if (!error) {
          store.dispatch("updateRoom", result.returnValues.room);
        } else {
          console.log(error);
        }
      });

      rpsContract.events.Earnings({filter: {player: accounts[0]}}, function(error, result) {
        if (!error) {
          store.dispatch("updateEarnings", result.returnValues.earnings);
        } else {
          console.log(error);
        }
      });

      waitingForMetamask.value = false;
    });

    const filteredItems = computed(() => {
      if (filter.value === 1) return games.value;
      else if (filter.value === 2) {
        return games.value.filter(
          (g) => g["player1"].toLowerCase() == store.getters.getAccountNo
        );
      } else if (filter.value === 3) {
        return games.value.filter((g) => {
          return (
            (g["player1"].toLowerCase() == store.getters.getAccountNo &&
              g["move1"] == 0) ||
            (g["player2"].toLowerCase() == store.getters.getAccountNo &&
              g["move2"] == 0)
          );
        });
      } else if (filter.value === 4) {
        return games.value.filter(
          (g) =>
            g["player1"].toLowerCase() != store.getters.getAccountNo &&
            g["player2"].toLowerCase() ==
              "0x0000000000000000000000000000000000000000"
        );
      }
      return [];
    });

    const earnings = computed(() => {
      return store.getters.getEarnings;
    });

    const earningsEther = computed(() => {
      return Web3Utils.fromWei(earnings.value.toString(), 'ether') + ' ether';
    });

    const createButton = ref()

    const setAllInn = function(){
      //if(earning.value <= 0) return;
      createButton.value.updateAmount(5);
    }

    return { waitingForMetamask, filter, filteredItems, earnings, earningsEther, setAllInn, createButton };
  },
};
</script>

<style>
body {
  background-attachment: fixed;
  background-image: url("~@/assets/blurbg2.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
