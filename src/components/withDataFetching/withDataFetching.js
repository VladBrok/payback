import styles from "./withDataFetching.module.scss";
import utilStyles from "styles/utils.module.scss";
import Loading from "components/Loading";
import { uniqueById } from "lib/db/uniqueById";
import useFirstRender from "hooks/useFirstRender";
import Error from "next/error";
import { useEffect, useState } from "react";
import { getPreviouslyFocused } from "lib/focus";

export default function withDataFetching(
  Component,
  fetchCallback,
  getFetchDeps,
  renderIfFailedToFetch = false,
  customStateInit = undefined,
  renderAtTop = true
) {
  const Wrapper = ({ data, reset, ...props }) => {
    const initialData = data?.pageData ?? data;
    const [fetchedData, setFetchedData] = useState(initialData);
    const [isLoaded, setIsLoaded] = useState(data != null);
    const [notFound, setNotFound] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [curPageCursor, setCurPageCursor] = useState(data?.pageCursor ?? "");
    const [prevPageCursor, setPrevPageCursor] = useState("");
    const [customState, setCustomState] = useState(customStateInit);
    const isFirstRender = useFirstRender();

    const fetchDeps = getFetchDeps(props);
    const pageCursor = reset ? "" : showMore ? curPageCursor : prevPageCursor;
    const renderShowMore =
      !showMore && fetchedData != undefined && curPageCursor != "";

    useEffect(() => {
      if (isFirstRender && initialData != null) {
        return;
      }

      fetchCallback(fetchDeps, customState, pageCursor)
        .then(result => {
          if (result.pageData) {
            setFetchedData(cur =>
              cur && !reset
                ? uniqueById([...cur, ...result.pageData])
                : result.pageData
            );
          } else {
            setFetchedData(result);
          }

          setCurPageCursor(result.pageCursor ?? "");
        })
        .catch(err => {
          if (err.message == 404) {
            setNotFound(true);
          } else {
            throw err;
          }
        })
        .finally(() => {
          setIsLoaded(true);
          setShowMore(false);
        });
    }, [
      ...Object.values(fetchDeps),
      customState,
      reset,
      pageCursor,
      isFirstRender,
      initialData,
    ]);

    useEffect(() => {
      if (showMore) {
        setPrevPageCursor(pageCursor);
      }
    }, [showMore, pageCursor]);

    useEffect(() => {
      if (reset) {
        setPrevPageCursor("");
        setCurPageCursor("");
      }
    }, [reset]);

    function handleShowMoreClick() {
      const prevFocused = getPreviouslyFocused();
      if (prevFocused && typeof prevFocused.focus === "function") {
        prevFocused?.focus();
      }
      setShowMore(true);
    }

    if (!isLoaded) {
      return <Loading />;
    }

    if (notFound) {
      return <Error statusCode={404} />;
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
