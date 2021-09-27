import React from 'react';

type Props = {
  filterItems: Announcement[];
  selectId: number;
  editOnSubmit: (event: React.FormEvent) => void;
  title: string;
  description: string;
  editOnChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  editOnChangeDescription: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  findSimilar: () => Announcement[];
};

export const SelectItem: React.FC<Props> = ({
  filterItems,
  selectId,
  editOnSubmit,
  title,
  description,
  editOnChangeTitle,
  editOnChangeDescription,
  findSimilar,
}) => {
  const similar = findSimilar();

  return (
    <>
      <h3 className="app__title">
        Title:
        {' '}
        {filterItems.map(item => (item.id === selectId ? item.title : null))}
      </h3>
      <p className="app__item-p">
        Description:
        {' '}
        {filterItems.map(item => (
          item.id === selectId ? item.description : null
        ))}
      </p>
      <p className="app__item-p">
        Data:
        {' '}
        {filterItems.map(item => (
          item.id === selectId ? item.date : null
        ))}
      </p>
      <form
        className="app__form"
        onSubmit={editOnSubmit}
      >
        <h3 className="app__title">Edit announcement:</h3>
        <input
          name="title"
          type="text"
          placeholder="Enter new title"
          className="form-control input-sm app__input"
          value={title}
          onChange={editOnChangeTitle}
        />
        <textarea
          name="description"
          placeholder="Enter new description"
          className="form-control input-sm app__input"
          value={description}
          onChange={editOnChangeDescription}
        />
        <button type="submit" className="btn btn-info app__button">Save</button>
      </form>
      <p className="app__similar">
        Similar announcements by title:
        {' '}
        {similar.length === 0 && 'Not found'}
      </p>
      <ul className="list-group list-group-flush">
        {similar.map(item => (
          <li
            key={item.id}
            className="list-group-item list-group-item-light app__list-item"
          >
            Title:
            {' '}
            {item.title}
          </li>
        ))}
      </ul>
    </>
  );
};
