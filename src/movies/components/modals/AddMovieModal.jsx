/**
 * @fileoverview a component to add a new movie to the database.
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, List, Avatar } from 'antd';
import useMovieSearch from '../../search/useMoviesSearch';
import styled from 'styled-components';
import classNames from 'classnames';

const SelectableItem = styled(List.Item)`
  border-radius: 8px;

  &:hover {
    background-color: #ccccff80;
    cursor: pointer;
  }

  &.selected {
    background-color: #ccccff;
  }
`;

const MovieSearch = styled(Input)`
  margin-bottom: 10px;
`;

export default function AddMovieModal(props) {
  const { showModal, addMovie, closeModal } = props;
  const [searchQuery, setSearchQuery] = useState('');
  const { movies } = useMovieSearch(searchQuery);
  const [selectedMovie, setSelectedMovie] = React.useState({});

  function getItemClassnames(id) {
    return classNames({
      'selected': id === selectedMovie.id
    });
  }

  function onOk() {
    addMovie(selectedMovie);
    closeModal();
  }

  return (
    <Modal
      title="Add Movie"
      visible={showModal}
      onOk={onOk}
      onCancel={closeModal}
    >
      <MovieSearch
        placeholder="Search Movies"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <List
        dataSource={movies}
        renderItem={(item) => (
          <SelectableItem 
            key={item.id}
            onClick={() => setSelectedMovie(item)}
            className={getItemClassnames(item.id)}
          >
            <List.Item.Meta
              avatar={
                <Avatar shape="square" size="large" src={item.avatarUrl} />
              }
              title={item.title}
              description={item.description}
            />
          </SelectableItem>
        )}
      />
    </Modal>
  );
}

AddMovieModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  addMovie: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
};