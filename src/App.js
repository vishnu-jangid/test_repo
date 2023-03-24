import React, { useState, useEffect, useCallback } from "react";
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";
import { gamesAction } from "../src/store/game/actions";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdClear } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { Spinner } from "react-spinners-css";
import {
  GoChevronLeft as LeftIcon,
  GoChevronRight as RightIcon,
} from "react-icons/go";

// import styles from "./App.css";
import styles from './styles.module.scss'

function App({gamesFetch, data, totalCount}) {
  const [input, setInput] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

   const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.currentTarget.title === "search") {
      input ? handleSubmit() : alert("Please enter search term to get results");
    }
  };

  const handleSubmit = () => {
    setPage(1);
    fetchData();
  };

  const handlePagination = (direction) => {
    let offset = page * 31;
    let results = data
      ? totalCount
      : totalCount || 0;
    if (direction === "prev" && page >= 2) {
      setPage(page - 1);
    }
    if (direction === "next" && page > 0 && offset < results) {
      setPage(page + 1);
    }
  };

  const fetchData = useCallback(() => {
      setLoading(true);
      const queryTerm = `q=` + encodeURIComponent(input);
      const queryPerPage = `&per_page=${10}`;
      const queryPage = `&page=${page || 1}`;
      const queryString = queryTerm + queryPerPage + queryPage;

      gamesFetch(queryString).then((res) => {
        if (res?.payload?.data && res?.payload?.status === 200) {
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
    },
    [page, input]
  );

  useEffect(() => {
    fetchData();
  }, [page, fetchData]);

  return (
    <div className={styles.container}>
      <div className={styles.container__block}>
        <div className={styles.container__searchcontainer}>
          <input
            className={styles.container__input}
            type="text"
            value={input || ""}
            placeholder={"Search..."}
            onChange={handleInput}
            onKeyPress={handleKeyPress}
            id="inputID"
          />
          <div className={styles.container__icon}>
            {input && <MdClear value="" onClick={handleInput}/>}
          </div>
          <div className={styles.container__icon} title={"search"} onClick={handleKeyPress}>
            <FaSearch />
          </div>
        </div>
      </div>

      <div className={styles.container__list}>
        <div className={styles.container__listitem}>
          <div className={styles.container__totalresults}>
            {totalCount || 0}{" "}
            results
          </div>
          {loading ? (
            <div className={styles.container__loading}>
              <Spinner color={`#cf9fff`} />
            </div>
          ) : data?.length > 0 ? (
            <>
              {data?.map((item, index) => (
                <Card key={index} style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>{item?.full_name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {item?.name}
                    </Card.Subtitle>
                    <Card.Text>{item?.stargazers_count}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
              <div className={styles.container__pagination}>
                <div className={styles.container__bottomicon} onClick={() => handlePagination("prev")}>
                  <LeftIcon />
                  Prev
                </div>
                Page {page}
                <div className={styles.container__bottomicon} onClick={() => handlePagination("next")}>
                  Next
                  <RightIcon />
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.game.games,
    totalCount: state.game.totalCount
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    gamesFetch: (params) => dispatch(gamesAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
