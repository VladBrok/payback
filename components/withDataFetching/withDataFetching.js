import styles from "./withDataFetching.module.scss";
import utilStyles from "styles/utils.module.scss";
import Loading from "components/Loading";
import { uniqueById } from "lib/db/uniqueById";
import { useEffect, useState } from "react";

export default function withDataFetching(
  Component,
  fetchCallback,
  getFetchDeps,
  renderIfFailedToFetch = false,
  customStateInit = undefined
) {
  const Wrapper = props => {
    const [fetchedData, setFetchedData] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [curPageCursor, setCurPageCursor] = useState("");
    const [prevPageCursor, setPrevPageCursor] = useState("");
    const [customState, setCustomState] = useState(customStateInit);

    const fetchDeps = getFetchDeps(props);
    const pageCursor = showMore ? curPageCursor : prevPageCursor;

    useEffect(() => {
      console.log("fetching with cursor:", pageCursor);

      fetchCallback(fetchDeps, customState, pageCursor)
        .then(result => {
          if (result.pageData) {
            setFetchedData(
              fetchedData
                ? uniqueById([...fetchedData, ...result.pageData])
                : result.pageData
            );
          } else {
            setFetchedData(result);
          }

          setCurPageCursor(result.pageCursor ?? "");
        })
        .finally(() => {
          setIsLoaded(true);
          setShowMore(false);
        });
    }, [...Object.values(fetchDeps), customState, pageCursor]);

    useEffect(() => {
      if (showMore) {
        setPrevPageCursor(pageCursor);
      }
    }, [showMore, pageCursor]);

    function handleShowMoreClick() {
      setShowMore(true);
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
        {showMore && <Loading />}
        {!showMore && fetchedData != undefined && curPageCursor != "" && (
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

  Wrapper.displayName = `WithDataFetching(${getDisplayName(Component)})`;
  return Wrapper;
}

function getDisplayName(Component) {
  return Component.displayName || Component.name || "Component";
}
