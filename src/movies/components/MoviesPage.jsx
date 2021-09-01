/**
 * @fileoverview Component to render a movies page with future recommendations and ratings.
 */
import React, { useState, useEffect, useContext, useMemo } from 'react';
import { List, Avatar, Button } from 'antd';
import styled from 'styled-components';

import { FirebaseContext } from '../../components/Firebase/firebase';
import Background from '../../components/Background';
import MovieList from './MovieList';
import RateMovieModal from './modals/RateMovieModal';
import { orderMovies, appendUnwatched } from '../ranking/MovieController';
import { Draggable } from 'react-beautiful-dnd';

const ColumnLayout = styled.div`
  display: flex;
`;

const Column = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ColumnTitle = styled.h1`
  align-self: center;
  color: white;
  text-decoration: underline;
`;

const RatingBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 170px;
`;

const RatingRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function MoviesPage(props) {
  const [movies, setMovies] = useState([]);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({});
  const firebase = useContext(FirebaseContext);

  const currentUserFirstName = firebase.getCurrentUserFirstName();

  useEffect(() => {
    const unsubscribe = firebase.registerMovieSnapshotListener(setMovies);
    return () => unsubscribe();
  }, []);

  const unwatchedMovies = useMemo(() => {
    return orderMovies(movies.filter((m) => !m.isWatched));
  }, [movies]);

  const watchedMovies = useMemo(() => {
    return movies.filter((m) => m.isWatched);
  }, [movies]);

  function onRateClick(movie) {
    setSelectedMovie(movie);
    setShowRatingModal(true);
  }

  function renderToWatchListItem(item) {
    return (
      <Draggable key={item.id} draggableId={item.id} index={item.index}>
        {(provided, __) => (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar shape="square" size="large" src={item.avatarUrl} />
                }
                title={`${item.index + 1}. ${item.title}`}
                description={item.description}
              />
              <Button onClick={() => onRateClick(item)}>Rate</Button>
            </List.Item>
          </div>
        )}
      </Draggable>
    );
  }

  function renderWatchedListItem(item) {
    return (
      <List.Item key={item.title}>
        <List.Item.Meta
          avatar={
            <Avatar shape="square" size="large" src={item.avatarUrl} />
          }
          title={item.title}
          description={item.description}
        />
        <RatingBox>
          <RatingRow>
            <p>Jasmine Rating:</p>
            {item.jasmineRating ? (
              <b>{item.jasmineRating}</b>
            ) : (
              <>
                {currentUserFirstName === 'Jasmine' ? (
                  <Button onClick={() => onRateClick(item)}>Rate</Button>
                ) : (
                  <p>Pending</p>
                )}
              </>
            )}
          </RatingRow>
          <RatingRow>
            <p>Dylan Rating:</p>
            {item.dylanRating ? (
              <b>{item.dylanRating}</b>
            ) : (
              <>
                {currentUserFirstName === 'Dylan' ? (
                  <Button onClick={() => onRateClick(item)}>Rate</Button>
                ) : (
                  <p>Pending</p>
                )}
              </>
            )}
          </RatingRow>
        </RatingBox>
      </List.Item>
    );
  }

  function renderRateMovieModal() {
    return (
      <RateMovieModal
        showModal={showRatingModal}
        closeModal={() => setShowRatingModal(false)}
        rateMovie={(rating) => 
          firebase.rateMovie(selectedMovie, rating, () => setShowRatingModal(false))}
        movie={selectedMovie}
      />
    );
  }

  return (
    <Background>
      <ColumnLayout>
        <Column>
          <ColumnTitle>To Watch</ColumnTitle>
          <MovieList 
            movies={unwatchedMovies} 
            renderListItem={renderToWatchListItem}
            saveMovie={(movie) => appendUnwatched(
              unwatchedMovies, movie, firebase.getMovieRefWithId, firebase.newBatch())}
          />
        </Column>
        <Column>
          <ColumnTitle>Watched</ColumnTitle>
          <MovieList 
            movies={watchedMovies}
            renderListItem={renderWatchedListItem}
            saveMovie={(movie) => firebase.saveMovie(movie, true /* isWatched */)}
          />
        </Column>
      </ColumnLayout>
      {renderRateMovieModal()}
    </Background>
  );
}