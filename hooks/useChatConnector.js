import { useEffect, useState } from "react";

export default function useChatConnector() {
  const [module, setModule] = useState();

  useEffect(() => {
    import("lib/chat/client").then(setModule);
  }, []);

  return module;
}
