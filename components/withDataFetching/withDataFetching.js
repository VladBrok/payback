import { useEffect, useState } from "react";
import Loading from "components/Loading";

export default function withDataFetching(
  Component,
  fetchCallback,
  getFetchDeps,
  renderIfFailedToFetch = false
) {
  withDataFetching.displayName = `WithDataFetching(${getDisplayName(
    Component
  )})`;

  return props => {
    const [fetchedData, setFetchedData] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const fetchDeps = getFetchDeps(props);
    console.log(Object.values(fetchDeps), fetchDeps);

    useEffect(() => {
      console.log("fetching...");
      fetchCallback(fetchDeps)
        .then(result => {
          setFetchedData(result);
        })
        .finally(() => {
          setIsLoaded(true);
        });
    }, Object.values(fetchDeps));

    if (!isLoaded) {
      return <Loading />;
    }

    if (fetchedData == undefined && !renderIfFailedToFetch) {
      return;
    }

    return <Component {...props} fetchedData={fetchedData} />;
  };
}

function getDisplayName(Component) {
  return Component.displayName || Component.name || "Component";
}
