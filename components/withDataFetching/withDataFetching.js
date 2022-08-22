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
  customStateInit = undefined,
  renderAtTop = true
) {
  const Wrapper = props => {
    const [fetchedData, setFetchedData] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [displayShowMoreButton, setDisplayShowMoreButton] = useState(true);
    const [curPageCursor, setCurPageCursor] = useState("");
    const [prevPageCursor, setPrevPageCursor] = useState("");
    const [customState, setCustomState] = useState(customStateInit);

    const fetchDeps = getFetchDeps(props);
    const pageCursor = props.reset
      ? ""
      : showMore
      ? curPageCursor
      : prevPageCursor;
    const renderShowMore =
      !showMore &&
      fetchedData != undefined &&
      curPageCursor != "" &&
      displayShowMoreButton;

    useEffect(() => {
      fetchCallback(fetchDeps, customState, pageCursor)
        .then(result => {
          if (result.pageData) {
            setFetchedData(cur =>
              cur && !props.reset
                ? uniqueById([...cur, ...result.pageData])
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
    }, [...Object.values(fetchDeps), customState, props.reset, pageCursor]);

    useEffect(() => {
      if (showMore) {
        setPrevPageCursor(pageCursor);
      }
    }, [showMore, pageCursor]);

    useEffect(() => {
      if (props.reset) {
        setPrevPageCursor("");
        setCurPageCursor("");
      }
    }, [props.reset]);

    function handleShowMoreClick() {
      setShowMore(true);
    }

    if (!isLoaded) {
      return <Loading />;
    }

    if (fetchedData == undefined && !renderIfFailedToFetch) {
      return;
    }

    const wrappedComponent = (
      <Component
        {...props}
        fetchedData={fetchedData}
        setFetchedData={setFetchedData}
        customState={customState}
        setCustomState={setCustomState}
        setDisplayShowMoreButton={setDisplayShowMoreButton}
      />
    );

    return (
      <>
        {renderAtTop && wrappedComponent}

        {showMore && <Loading />}
        {renderShowMore && (
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

        {!renderAtTop && wrappedComponent}
      </>
    );
  };

  Wrapper.displayName = `WithDataFetching(${getDisplayName(Component)})`;
  return Wrapper;
}

function getDisplayName(Component) {
  return Component.displayName || Component.name || "Component";
}
