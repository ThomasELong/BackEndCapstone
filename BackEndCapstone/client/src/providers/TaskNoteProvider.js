import React, { useState, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const TaskNoteContext = React.createContext();

export const TaskNoteProvider = (props) => {

  const apiUrl = "/api/tasknote";
  const [tasknotes, setTaskNotes] = useState([]);

  const { getToken } = useContext(UserProfileContext);

  const getTaskNote = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json()));
  };

  const getTaskNotesByTaskId = (id) => 
   getToken().then((token) =>
      fetch(apiUrl+`/getbytaskid/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => setTaskNotes(res))
    );

  const getAllTaskNotes = () =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then(setTaskNotes));

  const getTaskNoteById = (id) =>
    getToken().then((token) =>
      fetch(`/api/tasknote/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => res.json()));


  const addTaskNote = (tasknote) =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(tasknote)
      }).then((resp) => {
        return resp.json();
      }));


  const updateTaskNote = (tasknote) =>
    getToken().then((token) =>
      fetch(`${apiUrl}/${tasknote.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tasknote),
      }).then((resp) => {
        return resp })
    );

    const deleteTaskNote = (id) => {
      return getToken().then((token) =>
        fetch(`${apiUrl}/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }).then(getTaskNotesByTaskId));
      }






  return (
    <TaskNoteContext.Provider value={{ tasknotes, getTaskNote, getTaskNoteById, addTaskNote, getAllTaskNotes, getTaskNotesByTaskId, updateTaskNote, deleteTaskNote }}>
      {props.children}
    </TaskNoteContext.Provider>
  );
};