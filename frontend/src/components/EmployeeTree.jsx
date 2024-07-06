import {useEffect, useRef, useState} from "react";
import axiosClient from "../services/axios-client";
import "./EmployeeTree.css";
import { TbPhone } from "react-icons/tb";
import { TbMail } from "react-icons/tb";
import { TbUserEdit } from "react-icons/tb";
import { TbUserMinus } from "react-icons/tb";

function EditWindow({ employee, closeWindow }) {

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    axiosClient.post('/save', payload)
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        console.error(error.message);
      });
  }

  function _closeWindow(e) {
    e.preventDefault();
    closeWindow();
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, employee)}>
      <div className="edit-window" onMouseLeave={ (e) => _closeWindow(e) }>
        <input name="id" type="hidden" value={ employee.id }/>

        <label className="fs15">First name:</label>
        <input name="firstName" type="text" placeholder="First name" defaultValue={ employee.firstName }/>

        <label className="fs15">Last name:</label>
        <input name="lastName" type="text" placeholder="Last name" defaultValue={ employee.lastName }/>

        <label className="fs15">Email:</label>
        <input name="email" type="email" placeholder="Email" defaultValue={ employee.email }/>

        <label className="fs15">Phone</label>
        <input name="phone" type="text" placeholder="Phone" defaultValue={ employee.phone }/>

        <label className="fs15">Position:</label>
        <input name="position" type="text" placeholder="position" defaultValue={ employee.position }/>

        <label className="fs15">Move to:</label>
        <input name="refChiefId" type="number" placeholder="Chief id" defaultValue={ employee.refChiefId }/>

        <button type="submit">Save</button>
        <button onClick={(e) => _closeWindow(e)}>Cancel</button>
      </div>
    </form>
  )
    ;
}

function ToolBox({ children, employee }) {

  const [showEditWindow, setShowEditWindow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  function deleteEmployee(id) {
    axiosClient.delete('/delete/?id=' + id)
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        console.error(error.message);
      })
  }

  function closeToolBox() {
    setIsVisible(false);
    setShowEditWindow(false);
  }

  return (
    <div
      className="toolbox"
      onMouseOver={() => setIsVisible(true)}
      onMouseLeave={() => closeToolBox()}
    >
      {children}
      {isVisible && <div className="tooltip">
        <span className="tooltip-button" onClick={() => {
          setShowEditWindow(true);
        }}><TbUserEdit/></span>
        <span className="tooltip-button" onClick={() => {
          deleteEmployee(employee.id);
          setIsVisible(false);
        }}><TbUserMinus/></span>
        {showEditWindow && <EditWindow employee={ employee } closeWindow={ closeToolBox }/>}
      </div>}
    </div>
  );
}

function Employee(employee) {

  const [ isOpened, setIsOpened ] = useState(false);

  const {
    id,
    firstName,
    lastName,
    position,
    email,
    phone,
    subordinates,
  } = employee || {};

  return (
    <ToolBox employee={ employee }>
      <div className="indent-10">
        <button
          onClick={(event) => {
            setIsOpened(!isOpened);
            employee.handleClick(employee);
          }}
        >
          {'#' + id + ' ' + firstName + ' ' + lastName}
        </button>
        <span>position: {position} <TbPhone/> {phone} <TbMail/> {email}</span>
        <div className={` ${!isOpened ? "" : "closed "}`}>
          {subordinates && subordinates.length > 0 && subordinates.map((el) =>
            <Employee key={ el.id } { ...el } handleClick={ employee.handleClick }/>
          )}
        </div>
      </div>
    </ToolBox>
  );
}

export default function EmployeeTree() {
  const [ data, setData ] = useState(null);

  const handleClick = (employee) => {
    if (employee.subordinates.length === 0) {
      fetchData(employee);
    }
  }

  function fetchData(chief) {
    const uri = chief ? '/?id=' + chief.id : '/';
    axiosClient.get(uri)
      .then(response => {
        let data = response.data.map(el => {
          return {...el, subordinates: []}
        });
        if (chief) {
          chief.subordinates.push(...data);
        } else {
          setData(data);
        }
      })
      .catch(error => {
        console.error(error.message);
      });
  }

  useEffect(() => {
    fetchData(null);
  }, []);

  return (
    <div className="tree-wrapper">
      {data && data.map(el => <Employee key={el.id} {...el} handleClick={ handleClick }/>)}
    </div>
  );
}