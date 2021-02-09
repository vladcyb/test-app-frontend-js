import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { MasterThunk } from '../../../store/masterSlice/thunk';
import { useField } from '../../../shared/hooks/useField';
import { StateType as MasterState } from '../../../store/masterSlice/types';
import { StateType as SpecializationState } from '../../../store/specializationSlice/types';

export const MasterRow = ({
  data: {
    id,
    Specialization,
    patronymic,
    surname,
    name,
    login,
  },
  specializationState,
  masterState,
}) => {
  /* state */
  const [isEditing, setIsEditing] = useState(false);

  /* hooks */
  const dispatch = useDispatch();
  const isLoading = masterState.loading;

  /* fields */
  const loginField = useField(login);
  const nameField = useField(name);
  const surnameField = useField(surname);
  const patronymicField = useField(patronymic);
  const [specId, setSpecId] = useState(Specialization.id);

  /* methods */
  const handleDelete = () => {
    dispatch(MasterThunk.delete(id));
  };

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const handleEdit = async () => {
    if (isLoading) {
      return;
    }
    const editResult = await dispatch(MasterThunk.edit({
      id,
      login: loginField.props.value,
      surname: surnameField.props.value,
      name: nameField.props.value,
      patronymic: patronymicField.props.value,
      specId,
    }));
    const { error } = editResult.payload;
    if (error) {
      alert(error);
    } else {
      setIsEditing(false);
    }
  };

  const handleSpecializationChange = (e) => {
    setSpecId(parseInt(e.target.value, 10));
  };

  return (
    <div className={`master__row ${isEditing ? 'master__row_editing' : ''}`} key={id}>
      <div className="master__actions">
        {/* eslint-disable-next-line */}
        <button className="master__edit" onClick={handleStartEditing} type="button" />
        {/* eslint-disable-next-line */}
        <button className="master__remove" onClick={handleDelete} type="button" />
      </div>
      <div>
        {id}
      </div>
      {isEditing ? (
        <>
          <input type="text" {...loginField.props} />
          <input type="text" {...surnameField.props} />
          <input type="text" {...nameField.props} />
          <input type="text" {...patronymicField.props} />
          <select defaultValue={Specialization.id} onChange={handleSpecializationChange}>
            {specializationState.data.map((spec) => (
              <option value={spec.id} key={spec.id}>{spec.title}</option>
            ))}
          </select>
          <button
            className="master__cancelEdit"
            type="button"
            onClick={cancelEdit}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="master__save"
            type="submit"
            onClick={handleEdit}
            disabled={isLoading}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <div>{login}</div>
          <div>{surname}</div>
          <div>{name}</div>
          <div>{patronymic}</div>
          <div>{Specialization.title}</div>
        </>
      )}
    </div>
  );
};

MasterRow.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    Specialization: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
    patronymic: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
  }).isRequired,
  specializationState: SpecializationState.isRequired,
  masterState: MasterState.isRequired,
};
