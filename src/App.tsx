import React from 'react';
import './App.scss';
import announcementsFromServer from './api/announcements.json';
import { SelectItem } from './components/SelectItem';
import { AddNewItem } from './components/AddNewItem';
import { ListOfItems } from './components/ListOfItems';

type State = {
  announcements: Announcement[];
  showList: boolean;
  edit: boolean;
  selectId: number;
  title: string;
  description: string;
  titleNew: string;
  descriptionNew: string;
  titleError: string;
  descriptionError: string;
  query: string;
};

class App extends React.Component<{}, State> {
  state: State = {
    announcements: announcementsFromServer,
    edit: false,
    showList: false,
    selectId: 0,
    title: '',
    description: '',
    titleNew: '',
    descriptionNew: '',
    titleError: '',
    descriptionError: '',
    query: '',
  };

  search = () => {
    return this.state.announcements.filter((item) => (
      item.title.toLowerCase().includes(this.state.query.toLowerCase())
    ));
  };

  edit = (id: number, title: string, description: string) => {
    this.setState(currentState => {
      return {
        announcements: currentState.announcements.map(item => {
          if (item.id !== id) {
            return item;
          }

          return {
            ...item,
            title: title.length > 0 ? title : item.title,
            description: description.length > 0 ? description : item.description,
          };
        }),
      };
    });
  };

  delete = (id: number) => {
    this.setState((currentState) => {
      return {
        announcements: currentState.announcements.filter(item => item.id !== id),
      };
    });
  };

  onSubmit = () => {
    if (!this.state.titleNew) {
      this.setState({
        titleError: 'Please enter the title',
      });
    }

    if (!this.state.descriptionNew) {
      this.setState({
        descriptionError: 'Please enter the description',
      });
    }

    if (this.state.titleNew && this.state.descriptionNew) {
      this.setState((currentState) => {
        const lengthOfArray = currentState.announcements.length;
        const newId = currentState.announcements[lengthOfArray - 1].id + 1;
        const newTitle = currentState.titleNew;
        const newDescription = currentState.descriptionNew;
        const newDate = new Date().toLocaleString();
        const newAnnouncement = {
          id: newId,
          title: newTitle,
          description: newDescription,
          date: newDate,
        };

        return {
          announcements: [...currentState.announcements, newAnnouncement],
          titleNew: '',
          descriptionNew: '',
          titleError: '',
          descriptionError: '',
        };
      });
    }
  };

  findSimilar = () => {
    const selected = this.state.announcements.find(item => item.id === this.state.selectId);
    const selectedTitle = selected?.title.toLowerCase().split(' ') || [];
    const newAr: Announcement[] = [];

    this.state.announcements.map(item => {
      if (item.id !== this.state.selectId) {
        for (let i = 0; i < selectedTitle?.length; i += 1) {
          if (item.title.toLowerCase().includes(selectedTitle[i])) {
            newAr.push(item);
          }
        }
      }

      return item;
    });

    return newAr.slice(0, 3);
  };

  editOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.edit(this.state.selectId, this.state.title, this.state.description);
    this.setState({
      title: '',
      description: '',
    });
  };

  editOnChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({ title: value });
  };

  editOnChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;

    this.setState({ description: value });
  };

  addNewOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.onSubmit();
  };

  addNewOnChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      titleNew: event.target.value,
      titleError: '',
    });
  };

  addNewOnChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      descriptionNew: event.target.value,
      descriptionError: '',
    });
  };

  selectOnClick = (announcement: Announcement) => {
    this.setState({
      edit: true,
      selectId: announcement.id,
    });
  };

  deleteOnClick = (announcement: Announcement) => {
    this.delete(announcement.id);
    this.setState({ selectId: 0 });
  };

  render() {
    const filterItems = this.search();

    return (
      <div className="app">
        <div className="app__first-block">
          <button
            type="button"
            className="btn btn-info app__show-button"
            onClick={() => {
              this.setState({ showList: true });
            }}
            disabled={this.state.showList}
          >
            Show announcements
          </button>
          {this.state.showList && (
            <div>
              <input
                type="text"
                className="form-control input-sm app__search-input"
                placeholder="Search by title"
                value={this.state.query}
                onChange={(event) => {
                  this.setState({
                    query: event.target.value,
                  });
                }}
              />
            </div>
          )}
          {this.state.showList && (
            <ListOfItems
              filterItems={filterItems}
              selectOnClick={this.selectOnClick}
              deleteOnClick={this.deleteOnClick}
            />
          )}
        </div>
        <div className="app__second-block">
          <AddNewItem
            addNewOnSubmit={this.addNewOnSubmit}
            titleNew={this.state.titleNew}
            descriptionNew={this.state.descriptionNew}
            titleError={this.state.titleError}
            descriptionError={this.state.descriptionError}
            addNewOnChangeTitle={this.addNewOnChangeTitle}
            addNewOnChangeDescription={this.addNewOnChangeDescription}
          />
          {this.state.selectId !== 0 && (
            <div className="app__select">
              {this.state.edit && (
                <SelectItem
                  filterItems={filterItems}
                  selectId={this.state.selectId}
                  editOnSubmit={this.editOnSubmit}
                  title={this.state.title}
                  description={this.state.description}
                  editOnChangeTitle={this.editOnChangeTitle}
                  editOnChangeDescription={this.editOnChangeDescription}
                  findSimilar={this.findSimilar}
                />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
