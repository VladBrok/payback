export const EVENTS = {
  MESSAGE: "message-event",
  SUBSCRIPTION_ERROR: "pusher:subscription_error",
};

const ENCRYPTED = "private-encrypted-";

export const CHANNELS = {
  TEST: "my-channel",
  ENCRYPTED_TEST: `${ENCRYPTED}my-channel`,
  ENCRYPTED_BASE: ENCRYPTED,
};
