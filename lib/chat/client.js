// fixme
// export function connect(pusher, user, onMessage, onError) {
//   // todo: handle error
//   // socket.on("error", e => onError(`Client ${error}: ${e}`));
//   // socket.on("message", onMessage);

//   const channel = pusher.subscribe("my-channel");
//   channel.bind("my-event", onMessage);

//   return () => {
//     pusher.unsubscribe("my-channel");
//     pusher.disconnect();
//   };
// }
