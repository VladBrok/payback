import styles from "./withDataFetching.module.scss";
import utilStyles from "styles/utils.module.scss";
import Loading from "components/Loading";
import { useEffect, useState } from "react";

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
    const [pageCursor, setPageCursor] = useState();
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

    function handleShowMoreClick() {
      console.log("ok.");
    }

    if (!isLoaded) {
      return <Loading />;
    }

    if (fetchedData == undefined && !renderIfFailedToFetch) {
      return;
    }

    return (
      <>
        <Component
          {...props}
          fetchedData={fetchedData}
          setFetchedData={setFetchedData}
          customState={customState}
          setCustomState={setCustomState}
        />
        {fetchedData != undefined && pageCursor != undefined && (
          <div className={styles["button-wrapper"]}>
            <button
              type="button"
              className={utilStyles["button-secondary"]}
              onClick={handleShowMoreClick}
            >
              Show more
            </button>
          </div>
        )}
      </>
    );
  };
}

function getDisplayName(Component) {
  return Component.displayName || Component.name || "Component";
}
