import React from "react";
import axios from "axios";
import Modal from "./Modal";
import Button from '@material-ui/core/Button';
import '../style/list.css';


export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      url: `https://api.github.com/users/:owner/repos`,
      show: [],
    };
    this.inputRef = React.createRef();
  }

  showModal = (key) => {
    this.setState(
      {
        show: {
          ...this.state.show,
          [key]: true,
        },
      },
      console.log(this.state.show)
    );
  };

  closeModal = (key) => {
    this.setState({
      show: {
        ...this.state.show,
        [key]: false,
      },
    });
  };

  focusTextInput = async () => {
    this.inputRef.current.focus();
    let owner = this.inputRef.current.value;
    let url = `https://api.github.com/users/${owner}/repos`;
    let response = await axios.get(url);
    this.setState({
      data: response.data,
    });
  };

  render() {
    return (
      <>
        <div className="list">
          <input type="text" ref={this.inputRef}  placeholder="Search..."/>
          <Button onClick={this.focusTextInput} size="large" variant="contained">Go</Button>
          <br />
          <br />
          <ul>
            {this.state.data.map((item, key) => {
              return (
                <div className="data" key={key}>
                  <li key={key} onClick={(e) => {this.showModal(key);}} >
                    {item.full_name}
                  </li>
                  <Modal
                    show={this.state.show[key]}
                    repo={item.name}
                    url={item.url}
                    onClose={() => {
                      this.closeModal(key);
                    }}
                  />
                </div>
              );
            })}
          </ul>
        </div>
      </>
    );
  }
}
