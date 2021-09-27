import React from 'react';

type Props = {
  addNewOnSubmit: (event: React.FormEvent) => void;
  titleNew: string,
  descriptionNew: string,
  titleError: string,
  descriptionError: string,
  addNewOnChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addNewOnChangeDescription: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const AddNewItem: React.FC<Props> = ({
  addNewOnSubmit,
  titleNew,
  descriptionNew,
  titleError,
  descriptionError,
  addNewOnChangeTitle,
  addNewOnChangeDescription,
}) => {
  return (
    <div className="app__add-new">
      <h3 className="app__title">Add new announcement</h3>
      <form
        className="form-horizontal app__form"
        onSubmit={addNewOnSubmit}
      >
        <input
          name="title"
          type="text"
          className="form-control input-sm app__input"
          placeholder="Enter title"
          value={titleNew}
          onChange={addNewOnChangeTitle}
        />
        <div className="alert-danger app__error">
          {titleError && titleError}
        </div>
        <textarea
          name="description"
          className="form-control input-sm app__input"
          placeholder="Enter description"
          value={descriptionNew}
          onChange={addNewOnChangeDescription}
        />
        <div className="alert-danger app__error">
          {descriptionError && descriptionError}
        </div>
        <button type="submit" className="btn btn-info app__button">
          Add announcement
        </button>
      </form>
    </div>
  );
};
