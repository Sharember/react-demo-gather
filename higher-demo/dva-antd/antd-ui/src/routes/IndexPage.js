import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import EditableTable from '../components/EditableTable'

// function IndexPage() {
//   return (
//     <div className={styles.normal}>
//       <h1 className={styles.title}>Yay! Welcome to dva!</h1>
//       <div className={styles.welcome} />
//       <ul className={styles.list}>
//         <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
//         <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
//       </ul>
//     </div>
//   );
// }
//
// IndexPage.propTypes = {
// };
//
// export default connect()(IndexPage);

class App extends React.Component {
  state = {
    data: [],
  }

  newRecord = {
    name: undefined,
    position: undefined,
    type: undefined,
    description: undefined,
    editing: true,
  }

  saveEditing(form, callback) {
    const { data } = this.state;
    let editingIndex;
    for (let i = 0; i < data.length; i++) {
      if (data[i].editing) {
        editingIndex = i;
        break;
      }
    }
    if (editingIndex !== undefined) {
      this.handleSave(form, editingIndex, callback);
    } else {
      callback();
    }
  }

  handleNew = (form) => {
    const { data } = this.state;
    this.saveEditing(form, () => {
      const nextData = data.map(item => item.editing ? { ...item, editing: false } : item);
      this.setState({
        data: [...nextData, this.newRecord],
      });
    });
  }

  handleEdit = (form, index) => {
    const { data } = this.state;
    this.saveEditing(form, () => {
      this.setState({
        data: updateList(prevState.data, index, { editing: true }),
      });
    });
  }

  handleChange = (index, key, value) => {
    this.setState(prevState => ({
      data: updateList(prevState.data, index, { [key]: value }),
    }));
  }

  handleSave = (form, index, callback) => {
    form.validateFields((errors) => {
      if (!errors || !Object.keys(errors).some(field => field.indexOf(`${index}_`) === 0)) {
        this.setState(prevState => {
          const data = updateList(prevState.data, index, { editing: false });
          if ((data.length - 1) === index) {
            data.push(this.newRecord);
          }
          return { data };
        });
        callback && callback();
      }
    });
  }

  handleDelete = (index) => {
    this.setState(prevState => ({
      data: prevState.data.reduce((acc, record, i) => {
        if (i !== index) {
          acc.push(record);
        }
        return acc;
      }, [])
    }));
  }

  render() {
    const { data } = this.state;

    return (
      <EditableTable
        data={[...data, {}]}
        handleNew={this.handleNew}
        handleSave={this.handleSave}
        handleEdit={this.handleEdit}
        handleChange={this.handleChange}
        handleDelete={this.handleDelete}
      />
    );
  }
}

export default connect()(App);
