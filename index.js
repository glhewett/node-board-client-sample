require('@ciscospark/internal-plugin-board');
require('@ciscospark/internal-plugin-conversation');
const CiscoSpark = require('@ciscospark/spark-core').default;

const spark = new CiscoSpark({
  credentials: {
    authorization: {
      access_token: process.env.CISCOSPARK_ACCESS_TOKEN
    }
  }
});


// register the device is necessary
spark.internal.device.register()

  // list all of the conversations and choose one to get boards from.
  .then(() => spark.internal.conversation.list())

  // choose a conversations
  .then((conversations) => conversations[0])

  // create a new board
  .then((conversation) => spark.internal.board.createChannel(conversation))

  // display the board
  .then((board) => {
    console.log('================= BOARD ================');
    console.log(board);
    console.log('================= BOARD ================');
    return board;
  })

  .then(() => spark.internal.device.unregister())
