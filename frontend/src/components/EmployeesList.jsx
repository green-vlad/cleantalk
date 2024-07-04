import axiosClient from "../services/axios-client";
import {useEffect, useState} from "react";
import "./EmployeesList.css"

export default function EmployeesList(props) {
  const [ employeesList, setEmployeesList ] = useState([]);

  function getEmployeesListByChief(id, chief) {
    let uri = id ? '/?id=' + id : '/';
    axiosClient.get(uri)
      .then(response => {
        const _employeesList = response.data.map((employee) => {
          return { subordinates: null, isExpaned: false, ...employee }
        });
        if (chief) {
          chief.subordinates = _employeesList;
        }
        // chief.subordinates = _employeesList;
        console.log(chief);
        setEmployeesList(_employeesList);
      })
      .catch(error => {
        console.error(error.message);
      })
  }

  function handleClick(id, chief) {
    console.log(chief);
    getEmployeesListByChief(id, chief);
    return (
      <EmployeesList id={id} />
    );
  }

  useEffect(() => {
    getEmployeesListByChief(props.id);
  }, []);

  return (
    <div>
      <ul>
        {employeesList && employeesList.map((employee, index) => {
          return (
            <li key={ index } className="employee" onClick={ () => handleClick(employee.id, employee) }>
              #{employee.id} { employee.firstName + ' ' + employee.lastName }
            </li>
          )
        })}
      </ul>
    </div>
  );
}
