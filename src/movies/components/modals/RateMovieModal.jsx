/**
 * @fileoverview A modal to rate a given movie.
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Rate } from 'antd';
import styled from 'styled-components';

const RateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const PaddedRate = styled(Rate)`
  margin-bottom: 10px;
`;

export default function RateMovieModal(props) {
  const { showModal, closeModal, rateMovie, movie } = props;
  const [rating, setRating] = useState(1);

  return (
    <Modal
      title={`Rate ${movie.title}`}
      visible={showModal}
      onCancel={closeModal}
      onOk={() => rateMovie(rating)}
    >
      <RateWrapper>
        <PaddedRate
          count={10}
          value={rating}
          onChange={setRating}
        />
        Note: this will also move the movie to the "watched" column.
      </RateWrapper>
    </Modal>
  );
}

RateMovieModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  rateMovie: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired,
}