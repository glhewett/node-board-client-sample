import '@ciscospark/plugin-board';
import '@ciscospark/plugin-conversation';
import CiscoSpark from '@ciscospark/spark-core';
import util from 'util';
import {map, pick} from 'lodash';

const spark = new CiscoSpark({
  credentials: {
    authorization: {
      access_token: process.env.CISCOSPARK_ACCESS_TOKEN
    }
  }
});


// register the device is necessary
spark.device.register()

  // list all of the conversations and choose one to get boards from.
  .then(() => spark.conversation.list())

  // choose a conversations
  .then((conversations) => conversations[0])

  // create a new board
  .then((conversation) => spark.board.createChannel(conversation))

  // display the board
  .then((board) => {
    console.log('================= BOARD ================');
    console.log(board);
    console.log('================= BOARD ================');
    return board;
  })

  .then(() => spark.device.unregister())
