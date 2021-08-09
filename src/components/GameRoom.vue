<template>
  <div class="flex justify-center px-6">
    <div
      :class="gameBackgroundColor"
      class=" bg-opacity-40 flex w-2/4 h-32 p-4 my-2  rounded-lg border border-gray-100 shadow-md"
    >
      <div v-if="game.loading" class="w-full flex justify-center">
        <spinner />
      </div>
      <div v-else class="w-full flex">
        <div class="grid grid-cols-3 gap-4 w-3/4 text-left">
          <div class="text-sm font-ligh text-gray-50 col-span-2">
            {{ betTitle }} : {{ betAmount }}
          </div>
          <div></div>
          <div class="text-md font-ligh text-gray-50 col-span-2">
            {{ player1name }} : {{ address1 }}
          </div>
          <div>
            <img
              v-if="isComplete && player1Move"
              width="20"
              height="20"
              :src="player1MoveImage"
            />
          </div>

          <div class=" col-span-2">
            <div class="text-md font-ligh text-gray-50" v-if="!isRoomAvailable">
              {{ player2name }} : {{ address2 }}
            </div>
            <div v-else-if="!isMyRoom">
              <button
                @click="joinRoom"
                class="bg-green-400 hover:bg-green-500 pl-2 pr-2 w-full rounded-sm shadow-md flex justify-center items-center text-white"
              >
                Join
              </button>
            </div>
            <div v-else>Waiting for an opponent...</div>
          </div>

          <div>
            <img
              v-if="isComplete && player2Move"
              width="20"
              height="20"
              :src="player2MoveImage"
            />
          </div>
        </div>

        <div class="flex justify-end w-1/2">
          <div class="" v-if="isMyRoom && !didIMove">
            <div>Pick a move:</div>
            <div class="flex">
              <button
                @click="pickAMove('1')"
                class="bg-blue-400 hover:bg-blue-500 ml-2 rounded-lg p-2 shadow-md flex justify-center items-center"
              >
                <img width="30" height="30" src="@/assets/rock.png" />
              </button>

              <button
                @click="pickAMove('2')"
                class="bg-blue-400 hover:bg-blue-500 ml-2 rounded-lg p-2 shadow-md flex justify-center items-center"
              >
                <img width="30" height="30" src="@/assets/paper.png" />
              </button>

              <button
                @click="pickAMove('3')"
                class="bg-blue-400 hover:bg-blue-500 ml-2 rounded-lg p-2 shadow-md flex justify-center items-center"
              >
                <img width="30" height="30" src="@/assets/scissors.png" />
              </button>
            </div>
          </div>
          <div v-else-if="isMyRoom && didIMove && !isComplete">
            Waiting for your opponents move.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Web3Utils = require("web3-utils");
import { computed } from "vue";
import { useStore } from "vuex";

import Spinner from "@/components/Spinner.vue";

export default {
  components: {
    Spinner,
  },
  props: ["id", "game", "account"],
  setup(props) {
    const store = useStore();

    const moves = {
      0: false,
      1: "rock.png",
      2: "paper.png",
      3: "scissors.png",
    };

    const player1name = computed(() => {
      if (props.game.player1.toLowerCase() === store.getters.getAccountNo)
        return "YOU";
      else return "Player 1";
    });

    const player2name = computed(() => {
      if (props.game.player2.toLowerCase() === store.getters.getAccountNo)
        return "YOU";
      else return "Player 2";
    });

    const address1 = computed(() => {
      return (
        props.game.player1.substring(0, 5) +
        "..." +
        props.game.player1.substring(38)
      );
    });

    const address2 = computed(() => {
      return (
        props.game.player2.substring(0, 5) +
        "..." +
        props.game.player2.substring(38)
      );
    });

    const isRoomAvailable = computed(() => {
      return props.game.player2 == "0x0000000000000000000000000000000000000000";
    });

    const amIHosting = computed(() => {
      return props.game.player1.toLowerCase() === store.getters.getAccountNo;
    });

    const isMyRoom = computed(() => {
      return (
        props.game.player1.toLowerCase() === store.getters.getAccountNo ||
        props.game.player2.toLowerCase() === store.getters.getAccountNo
      );
    });

    const betAmount = computed(() => {
      return Web3Utils.fromWei(props.game.bet, "ether") + " ether";
    });

    const isComplete = computed(() => props.game.winner != 0);
    const player1Move = computed(() => moves[props.game.move1]);
    const player2Move = computed(() => moves[props.game.move2]);

    const player1MoveImage = computed(() => {
      return require("@/assets/" + player1Move.value);
    });

    const player2MoveImage = computed(() => {
      return require("@/assets/" + player2Move.value);
    });

    const didIMove = computed(() => {
      if (props.game.player1.toLowerCase() === store.getters.getAccountNo)
        return player1Move.value;
      else return player2Move.value;
    });

    const didIWin = computed(() => {
      if (props.game.player1.toLowerCase() === store.getters.getAccountNo)
        return props.game.winner == 1;
      else return props.game.winner == 2;
    });

    const joinRoom = async function() {
      store.dispatch("joinRoom", { id: props.id, value: props.game.bet });
    };

    const pickAMove = function(move) {
      store.dispatch("pickAMove", { id: props.id, move: move });
    };

    const gameBackgroundColor = computed(() => {
      if (!isMyRoom.value) {
        if (isComplete.value) return "bg-yellow-200";
        else return "bg-blue-200";
      }

      if (!isComplete.value) return "bg-gray-100";

      return didIWin.value ? "bg-green-300" : "bg-red-300";
    });

    const betTitle = computed(() => {
      if (isMyRoom.value && isComplete.value) {
        if (didIWin.value) return "WON";
        else return "LOST";
      }
      return "Bet";
    });

    return {
      address1,
      address2,
      player1name,
      player2name,
      isRoomAvailable,
      isComplete,
      player1Move,
      player2Move,
      amIHosting,
      betAmount,
      isMyRoom,
      didIMove,
      pickAMove,
      joinRoom,
      player1MoveImage,
      player2MoveImage,
      didIWin,
      gameBackgroundColor,
      betTitle,
    };
  },
};
</script>

<style scoped>
.roomBackground {
  backdrop-filter: saturate(180%) blur(10px);
}
</style>
