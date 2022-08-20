import { useEffect, useState } from "react";
import Loading from "components/Loading";

export default function withDataFetching(
  Component,
  fetchCallback,
  getFetchDeps,
  renderIfFailedToFetch = false,
  customStateInit = undefined
) {
  withDataFetching.displayName = `WithDataFetching(${getDisplayName(
    Component
  )})`;

  return props => {
    const [fetchedData, setFetchedData] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [customState, setCustomState] = useState(customStateInit);
    const fetchDeps = getFetchDeps(props);
    console.log([...Object.values(fetchDeps), customState], fetchDeps);

    useEffect(() => {
      console.log("fetching...");
      fetchCallback(fetchDeps, customState)
        .then(result => {
          setFetchedData(result);
        })
        .finally(() => {
          setIsLoaded(true);
        });
    }, [...Object.values(fetchDeps), customState]);

    if (!isLoaded) {
      return <Loading />;
    }

    if (fetchedData == undefined && !renderIfFailedToFetch) {
      return;
    }

    return (
      <Component
        {...props}
        fetchedData={fetchedData}
        setFetchedData={setFetchedData}
        customState={customState}
        setCustomState={setCustomState}
      />
    );
  };
}

function getDisplayName(Component) {
  return Component.displayName || Component.name || "Component";
}
