export const contractAddress = "0x4bC276827A1c6F7838b9c5F2059aDd8E3BCB9325";

export const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "player1",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "player2",
            "type": "address"
          },
          {
            "internalType": "uint8",
            "name": "move1",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "move2",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "bet",
            "type": "uint256"
          },
          {
            "internalType": "uint8",
            "name": "winner",
            "type": "uint8"
          },
          {
            "internalType": "bool",
            "name": "cancelled",
            "type": "bool"
          }
        ],
        "indexed": false,
        "internalType": "struct RockPaperScissors.Room",
        "name": "room",
        "type": "tuple"
      }
    ],
    "name": "CreateRoom",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "player",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "int256",
        "name": "earnings",
        "type": "int256"
      }
    ],
    "name": "Earnings",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "player1",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "player2",
            "type": "address"
          },
          {
            "internalType": "uint8",
            "name": "move1",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "move2",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "bet",
            "type": "uint256"
          },
          {
            "internalType": "uint8",
            "name": "winner",
            "type": "uint8"
          },
          {
            "internalType": "bool",
            "name": "cancelled",
            "type": "bool"
          }
        ],
        "indexed": false,
        "internalType": "struct RockPaperScissors.Room",
        "name": "room",
        "type": "tuple"
      }
    ],
    "name": "UpdateRoom",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "cancelRoom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "createRoom",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "earnings",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getEarnings",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getRoom",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "player1",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "player2",
            "type": "address"
          },
          {
            "internalType": "uint8",
            "name": "move1",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "move2",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "bet",
            "type": "uint256"
          },
          {
            "internalType": "uint8",
            "name": "winner",
            "type": "uint8"
          },
          {
            "internalType": "bool",
            "name": "cancelled",
            "type": "bool"
          }
        ],
        "internalType": "struct RockPaperScissors.Room",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getRooms",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "player1",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "player2",
            "type": "address"
          },
          {
            "internalType": "uint8",
            "name": "move1",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "move2",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "bet",
            "type": "uint256"
          },
          {
            "internalType": "uint8",
            "name": "winner",
            "type": "uint8"
          },
          {
            "internalType": "bool",
            "name": "cancelled",
            "type": "bool"
          }
        ],
        "internalType": "struct RockPaperScissors.Room[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "joinRoom",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "move",
        "type": "uint8"
      }
    ],
    "name": "makeMove",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "rooms",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "player1",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "player2",
        "type": "address"
      },
      {
        "internalType": "uint8",
        "name": "move1",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "move2",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "bet",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "winner",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "cancelled",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];