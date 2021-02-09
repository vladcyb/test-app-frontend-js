import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { SpecializationThunk } from '../../../store/specializationSlice/thunk';
import { useField } from '../../../shared/hooks/useField';
import { StateType } from '../../../store/specializationSlice/types';

export const SpecializationRow = ({ id, title, specializationState }) => {
  /* state */
  const [isEditing, setIsEditing] = useState(false);
  const titleField = useField(title);

  /* hooks */
  const dispatch = useDispatch();

  /* vars */
  const isLoading = specializationState.loading;

  /* methods */
  const handleDelete = async () => {
    const result = await dispatch(SpecializationThunk.delete(id));
    if (result.payload.error) {
      alert(result.payload.error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const handleEdit = async () => {
    if (isLoading) {
      return;
    }
    const result = await dispatch(SpecializationThunk.edit({ id, title: titleField.props.value }));
    if (!result.payload.error) {
      setIsEditing(false);
    }
  };

  return (
    <div className="specialization__row" key={id}>
      <div className="specialization__actions">
        {/* eslint-disable-next-line */}
        <button
          className="specialization__edit"
          type="button"
          onClick={handleEditClick}
        />
        {/* eslint-disable-next-line */}
        <button
          className="specialization__remove"
          type="button"
          onClick={handleDelete}
        />
      </div>
      <div>
        {id}
      </div>
      {isEditing ? (
        <div>
          <input type="text" {...titleField.props} />
          <button
            className="specialization__save"
            type="button"
            onClick={handleEdit}
            disabled={isLoading}
          >
            Save
          </button>
          <button className="specialization__cancel" type="button" onClick={cancelEdit}>
            Cancel
          </button>
        </div>
      ) : (
        <div>
          {title}
        </div>
      )}
    </div>
  );
};

SpecializationRow.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  specializationState: StateType.isRequired,
};
