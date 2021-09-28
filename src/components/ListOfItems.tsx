import React from 'react';

type Props = {
  filterItems: Announcement[];
  selectOnClick: (announcement: Announcement) => void;
  deleteOnClick: (announcement: Announcement) => void;
};

export const ListOfItems: React.FC<Props> = ({
  filterItems,
  selectOnClick,
  deleteOnClick,
}) => {
  return (
    <>
      <h3 className="app__title">List of announcements</h3>
      <ul className="list-group list-group-flush">
        {filterItems
          .map(announcement => (
            <>
              <li
                key={announcement.id}
                className="list-group-item list-group-item-light app__list-item"
              >
                <p className="app__item-title">{announcement.title}</p>
                <div className="app__item-buttons btn-group">
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => selectOnClick(announcement)}
                  >
                    Select
                  </button>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => deleteOnClick(announcement)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            </>
          ))}
      </ul>
      {filterItems.length === 0 && <div className="app__not-found">Not found</div>}
    </>
  );
};
