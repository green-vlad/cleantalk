import {useEffect, useRef, useState} from "react";
import axiosClient from "../services/axios-client";
import "./EmployeeTree.css";
import { TbPhone } from "react-icons/tb";
import { TbMail } from "react-icons/tb";
import { TbUserEdit } from "react-icons/tb";
import { TbUserMinus } from "react-icons/tb";

function EditWindow({ employee }) {
  const [ isVisible, setIsVisible ] = useState(false);

  function handleSubmit(e, employee) {
    const [ empl, setEmpl ] = useState(employee);
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    axiosClient.post('/save', payload)
      .then(response => {

      })
  }

  return (
    <div className="edit-window">
      <form onSubmit={ (e) => handleSubmit(e, employee) }>
        <input name="id" type="hidden" value={employee.id} />
        <input name="firstName" type="text" placeholder="First name" defaultValue={employee.firstName}/>
        <input name="lastName" type="text" placeholder="Last name" defaultValue={employee.lastName}/>
        <input name="email" type="email" placeholder="Email" defaultValue={employee.email}/>
        <input name="phone" type="text" placeholder="Phone" defaultValue={employee.phone}/>
        <input name="position" type="text" placeholder="position" defaultValue={employee.position}/>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

function ToolBox({children, employee}) {

  const [showEditWindow, setShowEditWindow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="toolbox"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && <div className="tooltip">
        <span className="tooltip-button" onClick={() => setShowEditWindow(true)}><TbUserEdit/></span>
        <span className="tooltip-button" onClick={() => alert('Delete')}><TbUserMinus/></span>
        {showEditWindow && <EditWindow employee={ employee }/>}
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
      <div
        className="indent-10"
        onMouseOver={(event) => {

        }}

      >
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
            <Employee key={el.id} {...el} handleClick={employee.handleClick}/>
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
      {data && data.map(el => <Employee key={el.id} {...el} handleClick={handleClick}/>)}
    </div>
  );
}