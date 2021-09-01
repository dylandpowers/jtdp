/**
 * @fileoverview Component for rendering a movie list.
 */
import React, { useState, useContext } from 'react';
import { List } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import AddMovieModal from './modals/AddMovieModal';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { FirebaseContext } from '../../components/Firebase/firebase';
import { commitReorder } from '../ranking/MovieController';
export default function ToWatchList(props) {
  const { renderListItem, movies, saveMovie } = props;
  const [showModal, setShowModal] = useState(false);
  const firebase = useContext(FirebaseContext);

  function onDragEnd(result) {
    if (!result.source || !result.destination) {
      return;
    }

    commitReorder(
      movies, 
      result.source.index, 
      result.destination.index, 
      firebase.getMovieRefWithId,
      firebase.newBatch()
    );
  }

  return (
    <>
      <PlusCircleOutlined 
        role="button"
        tabIndex={0}
        onClick={() => setShowModal(true)}
        style={{ fontSize: '24px' }}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="to-watch-movies">
          {(provided, __) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <List
                dataSource={movies}
                renderItem={renderListItem}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <AddMovieModal
        showModal={showModal}
        addMovie={saveMovie}
        closeModal={() => setShowModal(false)}
      />
    </>
  );
}