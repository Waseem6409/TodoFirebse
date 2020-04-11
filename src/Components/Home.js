import React, { useState, useEffect, useContext } from "react";
import "../Styles/Home.css";
import Modal from "react-modal";
import firebase from "../Config/FireBase";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { AuthState } from "../App";
import { EmailId } from "../App";
Modal.setAppElement("#root");

function Home() {
  const authState = useContext(AuthState);
  const emailId = useContext(EmailId);
  const history = useHistory();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isEditModelOpen, setIsEditModelOpen] = useState(false);
  const [add, setAdd] = useState("");
  const [edit, setEdit] = useState("");
  const [empty, setEmpty] = useState(false);
  const [emptyEdit, setEmptyEdit] = useState(false);
  const [todoItems, setTodoItems] = useState([]);
  const [change, setchange] = useState(false);
  const [editId, setEditId] = useState("");

  const addHandler = () => {
    setIsModelOpen(true);
  };
  const addTextHandler = (e) => {
    setAdd(e.target.value);
  };

  const editHandler = (e) => {
    setEdit(e.target.value);
  };
  const editTextHandler = (e) => {
    e.preventDefault();
    const time = moment().format("hh:mm a");
    const date = moment().format("DD-MM-YYYY");
    if (edit) {
      firebase
        .firestore()
        .collection(emailId)
        .doc(editId)
        .update({
          todo: edit,
          date: date,
          time: time,
        })
        .then((response) => {
          setIsEditModelOpen(false);
          setEdit("");
          setEditId("");
          setchange(!change);
          setEmptyEdit(false);
        })
        .catch((error) => {});
    } else {
      setEmptyEdit(true);
      setTimeout(() => {
        setEmptyEdit(false);
      }, 6000);
    }
  };

  const emptyInput = (
    <h5 className="wronginfo">Input is empty Please Try again</h5>
  );
  const addTodoHandler = (e) => {
    e.preventDefault();
    const time = moment().format("hh:mm a");
    const date = moment().format("DD-MM-YYYY");
    if (add) {
      firebase
        .firestore()
        .collection(emailId)
        .add({
          todo: add,
          date: date,
          time: time,
        })
        .then((response) => {
          setIsModelOpen(false);
          setAdd("");
          setchange(!change);
        })
        .catch((error) => {});
    } else {
      setEmpty(true);
      setTimeout(() => {
        setEmpty(false);
      }, 6000);
    }
  };

  const deletAllHandler = () => {
    todoItems.map((todo) => {
      return firebase.firestore().collection(emailId).doc(todo.id).delete();
    });
    setchange(!change);
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection(emailId)
      .get()
      .then((response) => {
        setTodoItems(
          response.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      })
      .catch((error) => {});
  }, [change]);

  const deleteHandler = (e) => {
    const id = e.target.id;
    firebase.firestore().collection(emailId).doc(id).delete();
    setchange(!change);
  };
  const editModalHanlder = (e) => {
    setIsEditModelOpen(true);
    const id = e.target.id;
    setEditId(id);
  };

  return (
    <div className="home-main-container">
      {authState ? (
        <React.Fragment>
          <title>Home | Todo</title>
          <div className="search-add-container">
            <button onClick={addHandler} className="add-todo-button">
              Add
            </button>
            <Modal
              isOpen={isModelOpen}
              onRequestClose={() => setIsModelOpen(false)}
            >
              <form>
                <div className="search-add-container">
                  <h1 className="heading">Add a todo item</h1>
                  <input
                    className="search-input"
                    type="text"
                    value={add}
                    autoCorrect="false"
                    required
                    placeholder="Add an item"
                    spellCheck="false"
                    onChange={addTextHandler}
                  />
                  {empty ? emptyInput : null}
                  <div className="button-container">
                    <input
                      type="submit"
                      onClick={addTodoHandler}
                      className="add-todo-button"
                      value="Add Item"
                    />
                  </div>

                  <div className="button-container">
                    <button
                      onClick={() => setIsModelOpen(false)}
                      className="add-todo-button"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </form>
            </Modal>
            <div className="width"></div>
            <button onClick={deletAllHandler} className="add-todo-button-edit">
              Delete All
            </button>
          </div>
          {todoItems.map((todo, index) => {
            return (
              <div key={todo.id} className="main-todo-container">
                <div className="todo-container">
                  <div className="numbers-container">
                    <h4 className="number">{index + 1}</h4>
                  </div>
                  <div className="todo">
                    <h4 className="description">{todo.todo}</h4>
                    <h6 className="create">
                      Created on {todo.time},{todo.date}{" "}
                    </h6>
                  </div>
                  <div className="buttons">
                    <button
                      id={todo.id}
                      onClick={editModalHanlder}
                      className="button"
                    >
                      Edit
                    </button>
                    <Modal
                      isOpen={isEditModelOpen}
                      onRequestClose={() => setIsEditModelOpen(false)}
                    >
                      <form>
                        <div className="search-add-container">
                          <h1 className="heading">Edit a todo item</h1>
                          <input
                            className="search-input"
                            type="text"
                            value={edit}
                            autoCorrect="false"
                            required
                            placeholder="Edit the item"
                            spellCheck="false"
                            onChange={editHandler}
                          />
                          {emptyEdit ? emptyInput : null}
                          <div className="button-container">
                            <input
                              type="submit"
                              onClick={editTextHandler}
                              className="add-todo-button"
                              value="Save Changes"
                            />
                          </div>

                          <div className="button-container">
                            <button
                              onClick={() => setIsEditModelOpen(false)}
                              className="add-todo-button"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </form>
                    </Modal>
                    <button
                      onClick={deleteHandler}
                      id={todo.id}
                      className="button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </React.Fragment>
      ) : (
        history.push("/login")
      )}
    </div>
  );
}

export default Home;
