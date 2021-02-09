import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StateType as MasterState } from '../../store/masterSlice/types';
import { StateType as SpecializationState } from '../../store/specializationSlice/types';
import { MasterRow } from './__row';
import { useField } from '../../shared/hooks/useField';
import { MasterThunk } from '../../store/masterSlice/thunk';
import './style.css';

export const Master = ({
  masterState,
  specializationState,
}) => {
  /* fields */
  const login = useField();
  const name = useField();
  const surname = useField();
  const patronymic = useField();

  /* state */
  const [specializationId, setSpecializationId] = useState(-1);
  const [filterSpecId, setFilterSpecId] = useState(0);

  /* hooks */
  const dispatch = useDispatch();

  /* vars */
  const isLoading = masterState.loading;
  const isFormDisabled = isLoading || specializationId === -1;

  /* methods */
  const handleAdd = async (e) => {
    e.preventDefault();
    if (isFormDisabled) {
      return;
    }
    const obj = {
      login: login.props.value.trim(),
      name: name.props.value.trim(),
      surname: surname.props.value.trim(),
      patronymic: patronymic.props.value.trim(),
      specId: specializationId,
    };
    const actionResult = await dispatch(MasterThunk.add(obj));
    const { error } = actionResult.payload;
    if (error) {
      alert(error);
    } else {
      login.clear();
      name.clear();
      surname.clear();
      patronymic.clear();
      setSpecializationId(-1);
    }
  };

  const handleSelectChange = (e) => {
    setSpecializationId(parseInt(e.target.value, 10));
  };

  const handleChangeFilter = (e) => {
    setFilterSpecId(parseInt(e.target.value, 10));
  };

  const handleApplyFilter = () => {
    dispatch(MasterThunk.update(filterSpecId));
  };

  return (
    <div className="master">
      <div className="master__tableHeader">
        <div className="master__headerId">id</div>
        <div>login</div>
        <div>name</div>
        <div>surname</div>
        <div>patronymic</div>
        <div>specialization</div>
      </div>
      {masterState.data.map((item) => (
        <MasterRow
          key={item.id}
          data={item}
          specializationState={specializationState}
          masterState={masterState}
        />
      ))}
      <form className="master__addRow" onSubmit={handleAdd}>
        <input className="master__addRowLogin" type="text" {...login.props} />
        <input type="text" {...name.props} />
        <input type="text" {...surname.props} />
        <input type="text" {...patronymic.props} />
        <select onChange={handleSelectChange} value={specializationId}>
          <option value={-1}>(не выбрано)</option>
          {specializationState.data.map((spec) => (
            <option key={spec.id} value={spec.id}>
              {spec.title}
            </option>
          ))}
        </select>
        <button className="master__addBtn" type="submit" disabled={isFormDisabled}>Add</button>
      </form>
      <div className="master__filter">
        <select onChange={handleChangeFilter} defaultValue={0}>
          <option value={0}>(не выбрано)</option>
          {specializationState.data.map((spec) => (
            <option value={spec.id} key={spec.id}>{spec.title}</option>
          ))}
        </select>
        <button type="button" onClick={handleApplyFilter}>
          Отфильтровать
        </button>
      </div>
    </div>
  );
};

Master.propTypes = {
  masterState: MasterState.isRequired,
  specializationState: SpecializationState.isRequired,
};
