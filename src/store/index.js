import { createStore } from 'vuex'
const Web3Utils = require('web3-utils');

export default createStore({
  state: {
    accountNo: '0',
    contract: null,
    rooms: [],
    loadingRoomCreation: false,
    earnings: 0
  },
  mutations: {
    setAccount(state, payload){
      state.accountNo = payload.account.toLowerCase();
    },
    setContract(state, payload){
      state.contract = payload.contract;
    },
    setRooms(state, payload){
      let rooms = [];

      payload.forEach((r) => {
        const newRoom = {
          id: r.id,
          player1: r.player1,
          player2: r.player2,
          move1: r.move1,
          move2: r.move2,
          bet: r.bet,
          winner: r.winner,
          cancelled: r.cancelled,
        };
        rooms.push(newRoom);
      });

      state.rooms = rooms;
    },
    addRoom(state, payload){
      const newRoom = {
        id: payload.id,
        player1: payload.player1,
        player2: payload.player2,
        move1: payload.move1,
        move2: payload.move2,
        bet: payload.bet,
        cancelled: payload.cancelled,
        winner: payload.winner
      };
      state.rooms.push(newRoom);
      state.loadingRoomCreation = false;
    },
    updateRoom(state, payload){
      const room = {
        id: payload.id,
        player1: payload.player1,
        player2: payload.player2,
        move1: payload.move1,
        move2: payload.move2,
        bet: payload.bet,
        winner: payload.winner,
        cancelled: payload.cancelled,
        loading: false
      };
      const index = state.rooms.findIndex(r=>r.id === payload.id);
      state.rooms[index] = room;
    },
    setRoomLoading(state, payload){
      const index = state.rooms.findIndex(r=>r.id === payload.id);
      state.rooms[index].loading = payload.val;
    },
    setCreateLoading(state, payload){
      state.loadingRoomCreation = payload.val;
    },
    setEarnings(state, payload){
      state.earnings = payload;
    },
    updateEarnings(state, payload){
      state.earnings = payload;
    }
  },
  actions: {
    setAccount(_, payload){
      this.commit('setAccount', payload);
    },
    setContract(_, payload){
      this.commit('setContract', payload);
    },
    createRoom(context, payload){
      context.commit('setCreateLoading', {val:true});
      context.state.contract.methods
      .createRoom()
      .send({ from: context.state.accountNo,
            value: Web3Utils.toWei(payload.value.toString(), 'ether') }, function(error, result) {
        if (!error) {
          console.log(result);
        } else 
        {
          console.error(error);
          context.commit('setCreateLoading', {val:false});
        }
      });
    },
    addRoom(context, payload){
      context.commit('addRoom', payload);
    },
    updateRoom(context, payload){
      context.commit('updateRoom', payload);
    },
    joinRoom(context, payload) {
      context.commit('setRoomLoading', {id:payload.id, val:true});

      context.state.contract.methods
      .joinRoom(payload.id)
      .send({ 
        from: context.state.accountNo,
        value: payload.value
      }).then(function(receipt){
        console.log(receipt);
      }).catch(() => context.commit('setRoomLoading', {id:payload.id, val:false}));
    },
    loadRooms(context){
      context.state.contract.methods
      .getRooms()
      .call({ from: context.state.accountNo }, function(error, result) {
        if (!error) {
          context.commit('setRooms', result);
        } else console.error(error);
      });
    },
    pickAMove(context, payload){
      context.commit('setRoomLoading', {id:payload.id, val:true});

      context.state.contract.methods
      .makeMove(payload.id, payload.move)
      .send({ from: context.state.accountNo }, function(error, result) {
        if (!error) {
          console.log(result);
        } else
        {
          console.error(error);
          context.commit('setRoomLoading', {id:payload.id, val:false});
        }
      });
    },
    loadPlayerEarnings(context)
    {
      context.state.contract.methods
      .getEarnings()
      .call({ from: context.state.accountNo }, function(error, result) {
        if (!error) {
          context.commit("updateEarnings", result);
        } else 
        console.error(error);
      });
    },
    updateEarnings(context, payload){
      context.commit("updateEarnings", payload);
    }
  },
  getters: {
    getAccountNo(state){
      return state.accountNo;
    },
    getRooms(state){
      return state.rooms;
    },
    getEarnings(state){
      return state.earnings;
    }
  }
})
