import React, { Component } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  ListGroupItemHeading,
  ListGroupItemText,
  Form,
  FormGroup,
  Label
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import uuid from "uuid";

import { postItem } from "../../action/itemActions";
import { fetchItem } from "../../action/itemActions";
import { updateItem } from "../../action/itemActions";
import { deleteItem } from "../../action/itemActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          userid: uuid(),
          content: [],
          heading: "",
          isChecked: false,
          isUpdated: false
        }
      ],
      content: "", // input value를 위한 프로퍼티
      isFetched: false,
      checkedNow: false,
      update: [] // update를 위한 프로퍼티
    };
  }

  componentDidMount() {
    console.log("this.props", this.props);
    this.setState({
      isFetched: this.props.items.isFetched,
      items: this.props.items.fetchedData
    });
    console.log("componentDidMount", this.state);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      console.log(
        "nextProps.items.fetchedData:::",
        nextProps.items.fetchedData
      );
      this.setState({
        isFetched: nextProps.items.isFetched,
        items: nextProps.items.fetchedData
      });
      console.log("componentWillReceiveProps this.state:::", this.state);
    }
    if (nextProps.items.isAdded) {
      console.log("is_Added", nextProps);
      this.setState({
        items: [nextProps.items.addedData, ...this.state.items]
      });
      nextProps.items.addedData = "";
      nextProps.items.isAdded = !nextProps.items.isAdded;
    }

    if (nextProps.items.isDeleted) {
      // console.log("is Deleted", nextProps.items.isDeleted);
      // console.log("nextProps.items.fetchedData", nextProps.items.fetchedData);
      // console.log("this.props.items.deletedId", nextProps.items);
      this.props.items.fetchedData = nextProps.items.fetchedData.filter(
        item => item.userid !== nextProps.items.deletedId
      );
      console.log("after delete", this.props.items.fetchedData);
      this.setState({
        items: this.props.items.fetchedData
      });
      console.log("after delete state", this.state.items);
    }
  }

  // When FETCH button clicked
  fetchAll = () => {
    this.props.fetchItem();
    console.log("this.props", this.props);
    console.log("fetchAll", this.state);
  };

  // addItem for AJAX request
  addItem = () => {
    const heading = prompt("Enter Heading");
    if (heading) {
      const newItem = {
        id: uuid(),
        heading,
        content: this.state.content
      };
      // newItem.content = newItem.content.split("\n");
      this.props.postItem(newItem);
    }
    this.setState({ content: "" });
  };
  // delItem for AJAX request
  delItem = id => {
    console.log("delItem called", id);
    this.props.deleteItem(id);
  };
  // delete All
  delAll = () => {
    console.log("Del All");
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/api/items/all");
    xhr.send();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
        } else {
          console.log("Error!");
        }
      }
    };
  };

  // *** TODO *** updateItem Method
  onChange = e => {
    this.setState({ content: e.target.value }); // 일시적으로 입력되는 값을 저장
  };
  update = e => {
    this.setState({ update: e.target.value });
  };
  chkBtn(e) {
    console.log("e.target.id", e.target.id);
    this.props.items.fetchedData = this.props.items.fetchedData.map(item => {
      return e.target.id === item.userid
        ? { ...item, isChecked: !item.isChecked }
        : item;
    });

    this.setState(state => ({
      checkedNow: !state.checkedNow,
      items: this.props.items.fetchedData
    }));
    console.log("checked", this.state);
  }

  updateItem(e) {
    // console.log("before", this.props.items.fetchedData.isUpdated);
    this.props.items.fetchedData = this.props.items.fetchedData.map(item => {
      return e.target.id === item.userid
        ? { ...item, isUpdated: !item.isUpdated }
        : item;
      // if (e.target.id === item.userid) {
      //   return { ...item, isChecked: !item.isChecked };
      // } else if (e.target.id !== item.userid) {
      //   return item;
      // }
    });
    let letContent = this.props.items.fetchedData.filter(
      item => e.target.id === item.userid
    );

    this.setState(state => ({
      items: this.props.items.fetchedData,
      update: letContent[0].content
    }));
  }

  // SAVE btn clicked
  finishUpdate = e => {
    let updatedItem = {
      userid: "",
      content: "",
      heading: ""
    };
    this.props.items.fetchedData = this.props.items.fetchedData.map(item => {
      // return e.target.id === item.userid ? { ...item, isUpdated: false } : item;
      if (e.target.id === item.userid) {
        updatedItem.userid = item.userid;
        updatedItem.content = this.state.update.split("\n");
        console.log(updatedItem.content);
        updatedItem.heading = item.heading;

        return { ...item, isUpdated: false, content: updatedItem.content };
      } else return item;
    });
    // console.log(this.props.items.fetchedData);
    this.setState({
      items: this.props.items.fetchedData
    });

    // const updatedItem = {
    //   userid: e.target.id,
    //   content: this.state.update
    // };
    console.log("type of ", typeof updatedItem, updatedItem);
    this.props.updateItem(e.target.id, updatedItem);
  };

  render() {
    const { items } = this.state; // 객체 deStructuring // fetchedData를 담고 있음
    console.log("when rendering", items);
    return (
      <Container className="list-Container">
        <FormGroup>
          <Form className="form-text-area">
            <Label>Any comments?</Label>
            <textarea
              className="text-area"
              value={this.state.content}
              onChange={this.onChange}
            />
          </Form>
        </FormGroup>
        <Button
          color="dark"
          style={{ marginBottom: "2rem", marginRight: "10px" }}
          onClick={this.addItem}
        >
          Add Item
        </Button>
        {/* ********DELETE ALL 미완성*********** */}
        <Button
          color="danger"
          style={{ marginBottom: "2rem" }}
          onClick={() => {
            const yes = prompt("Are you sure you want to Delete All?");
            if (yes) {
              this.setState({
                items: [{ id: uuid(), name: "***Example***" }]
              });
              this.delAll();
            }
          }}
        >
          Delete checked Items
        </Button>
        {/* FETCH from myDB */}
        <Button
          color="success"
          style={{
            marginBottom: "2rem",
            float: "right"
          }}
          onClick={this.fetchAll}
        >
          FETCH from myDB
        </Button>
        {/* {this.state.items.length === 0 && "FETCH or Add Item"} */}
        {this.props.items.isFetched || this.props.items.isAdded ? (
          <ListGroup>
            <TransitionGroup className="shopping-list">
              {items.map(
                ({ userid, content, heading, isChecked, isUpdated }) =>
                  userid !== "undefined" && (
                    <CSSTransition key={userid} timeout={500} classNames="fade">
                      <ListGroupItem key={userid}>
                        {/* ListGroup => ul ListGroupItem => li */}
                        <Button
                          key={userid}
                          className="remove-btn"
                          color="danger"
                          size="sm"
                          onClick={() => {
                            //   // this.setState(state => ({
                            //   //   items: state.items.filter(
                            //   //     item => item.userid !== userid
                            //   //   )
                            //   // }));
                            //   // map 과정에서 모든 요소들의 key 프로퍼티에 items의 id가 할당되었다
                            //   // filter iteration에서 state.items의 id와 클릭된 아이템의 id를 비교해서 조건식을 만족하지 못하면 filter한다. iteration 밖에서는 참조할 수 없다
                            this.delItem(userid);
                          }}
                        >
                          DELETE
                        </Button>
                        <div
                          className="radio-box"
                          style={{
                            position: "relative"
                          }}
                        >
                          <div
                            style={{
                              position: "relative",
                              width: "15px",
                              height: "15px",
                              border: "1px solid darkgoldenrod",
                              zIndex: "2"
                            }}
                            onClick={this.chkBtn.bind(this)}
                            id={userid}
                          />
                          <label htmlFor="cb1" />
                          {/* 해당 구문은 논리비교 조건식으로 만들어서 클릭되면 해당 엘리먼트를 렌더링하게 한다,
                          클릭된 요소만   */}
                          {isChecked && (
                            <ion-icon
                              for="cb1"
                              name="md-checkmark"
                              style={{
                                position: "absolute",
                                top: "0",
                                zIndex: "1"
                              }}
                            />
                          )}
                        </div>

                        {/* isUpdated = true이면 ItemHeading과 ItemText의 format을 변경 */}
                        {!isUpdated && (
                          <div>
                            <ListGroupItemHeading>
                              {heading}
                            </ListGroupItemHeading>
                            {/* {content.toString().split("\n")} */}
                            {Object.values(content).map(t => {
                              t = t.toString().split("\n");
                              console.log(t);
                              return t.map(text => (
                                <ListGroupItemText key={text}>
                                  {text}
                                </ListGroupItemText>
                              ));
                            })}
                          </div>
                        )}
                        {/* content는 객체화 되어 있어서 직접 map을 실행할 수 없다 */}
                        <button
                          className="update-btn btn-list"
                          id={userid}
                          onClick={this.updateItem.bind(this)}
                        >
                          UPDATE
                        </button>
                        {isUpdated && (
                          <div>
                            <textarea
                              value={this.state.update}
                              onChange={this.update}
                              className="textarea-update"
                              cols="30"
                              rows="10"
                              style={{ width: "600px" }}
                            />
                            <button
                              id={userid}
                              className="save-btn btn-list"
                              onClick={this.finishUpdate}
                            >
                              SAVE
                            </button>
                          </div>
                        )}
                      </ListGroupItem>
                    </CSSTransition>
                  )
              )}
            </TransitionGroup>
          </ListGroup>
        ) : (
          <p
            style={{
              fontSize: "2.5rem",
              textAlign: "center",
              marginTop: "60px"
            }}
          >
            You may want to Fetch Data from database.
          </p>
        )}
      </Container>
    );
  }
}

ItemList.propTypes = {
  items: PropTypes.object.isRequired,
  fetchItem: PropTypes.func.isRequired,
  postItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired
};

const mapStatetoProps = state => ({
  items: state.items
});

export default connect(
  mapStatetoProps,
  { fetchItem, postItem, updateItem, deleteItem }
)(ItemList);
