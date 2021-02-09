import React from 'react';
import { useDispatch } from 'react-redux';
import { StateType } from '../../store/specializationSlice/types';
import { useField } from '../../shared/hooks/useField';
import { SpecializationThunk } from '../../store/specializationSlice/thunk';
import { SpecializationRow } from './__row';
import './style.css';

export const Specialization = ({ state }) => {
  /* hooks */
  const titleField = useField();
  const dispatch = useDispatch();

  /* vars */
  const isLoading = state.loading;

  /* methods */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    dispatch(SpecializationThunk.add({ title: titleField.props.value }));
    titleField.clear();
  };

  return (
    <div className="specialization">
      <div className="specialization__tableHeader">
        <div className="specialization__headerId">id</div>
        <div className="specialization__headerTitle">title</div>
      </div>
      {state.data.map((item) => (
        <SpecializationRow
          key={item.id}
          id={item.id}
          title={item.title}
          specializationState={state}
        />
      ))}
      <form onSubmit={handleSubmit}>
        <div className="specialization__addRow">
          <div />
          <div />
          <div>
            <input type="text" {...titleField.props} disabled={isLoading} />
            <button className="specialization__add" type="submit" disabled={isLoading}>
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

Specialization.propTypes = {
  state: StateType.isRequired,
};
