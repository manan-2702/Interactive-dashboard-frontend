import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { Users } from "../../Data/user-info";
import { TfiSearch } from "react-icons/tfi";
import "../CSS/admin-users.css";
import "../CSS/admin.css";
import AdminNavBar from "../NavBar/admin-navbar";
import AdminTopBar from "../TopBar/admin-topbar";
import axios from "axios";
//import MaterialReactTable from "material-react-table";

function AdminStudents() {
  // const [student, setStudent] = useState(true);
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [search, setSearch] = useState("");
  const [batch, setBatch] = useState("");

  const [data, setData] = useState([]);

  const fetchData = async () => {
    await axios
      .get(
        "https://interactive-dashboard-api.onrender.com/api/admin/all-students"
      )
      .then((res) => {
        const temp = res;
        setData(temp.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchStudentData = async () => {
    await axios
      .get(
        "https://interactive-dashboard-api.onrender.com/api/admin/all-students"
      )
      .then((res) => {
        const temp = res;
        setData(temp.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  useEffect(() => {
    if (college !== "" || department !== "" || batch !== "") {
      handleFilter();
    } else {
      fetchData();
    }
  }, [college, department, batch]);

  const handleFilter = async () => {
    await axios
      .post(
        `https://interactive-dashboard-api.onrender.com/api/admin/select-student?college=${college}&department=${department}&batch=${batch}`
      )
      .then((res) => {
        setData(res.data.data);
        // console.log('change department',res.data.data,department);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    const res = await axios.get(
      `https://interactive-dashboard-api.onrender.com/api/student/search?enrollment_no=${e.target.value}`
    );
    setData(res.data.data);
  };

  let srno = 1;

  return (
    <div className="admin-page">
      {/* <Router> */}
      <AdminNavBar />
      <AdminTopBar />
      <div>
        <div className="admin-users">
          <div className="header-add-btn">
            <h2 style={{ color: "rgb(143, 143, 145)" }}>Students Details</h2>
            <Link to="/admin/students/add-student">
              <button
                className="multistep-form-btn"
                style={{ backgroundColor: "#3b7197" }}
              >
                Add Student
              </button>
            </Link>
          </div>
          <div className="user-filter">
            <form action="">
              <div>
                <span>
                  College :{" "}
                  <select onChange={(e) => setCollege(e.target.value)}>
                    <option value="" selected>
                      --Select College--
                    </option>
                    <option value="GCET">GCET</option>
                    <option value="ADIT">ADIT</option>
                    <option value="MBIT">MBIT</option>
                  </select>
                </span>
                {college && (
                  <span>
                    Department :{" "}
                    <select onChange={(e) => setDepartment(e.target.value)}>
                      <option value="" selected>
                        --Select Department--
                      </option>
                      <option value="CP">CP</option>
                      <option value="IT">IT</option>
                      {college !== "MBIT" && <option value="EC">EC</option>}
                      {college !== "MBIT" && <option value="EE">EE</option>}
                      {college !== "MBIT" && <option value="ME">ME</option>}
                      {college !== "MBIT" && <option value="MC">MC</option>}
                      {college !== "MBIT" && <option value="CH">CH</option>}
                      {college !== "MBIT" && <option value="CL">CL</option>}
                    </select>
                  </span>
                )}
                {department && (
                  <span>
                    Batch :{" "}
                    <select onChange={(e) => setBatch(e.target.value)}>
                      <option value="" selected>
                        --Select Batch--
                      </option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                    </select>
                  </span>
                )}
              </div>
            </form>
            <div>
              <center>
                <input
                  type="text"
                  placeholder="Search by Enrollment no."
                  value={search}
                  onChange={handleSearch}
                />
                <button className="search">
                  <TfiSearch style={{ color: "white" }} />
                </button>
              </center>
            </div>
          </div>
          <div className="user-table">
            <table border={1}>
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>Enrollment No.</th>
                <th>Department</th>
                <th>College</th>
                <th>Admission Year</th>
                <th>Actions</th>
              </tr>
              {data.map((user) => {
                return (
                  <tr key={srno++}>
                    <td>{srno}</td>
                    <td>{user.name}</td>
                    <td>{user.enrollment_no}</td>
                    <td>{user.department}</td>
                    <td>{user.college}</td>
                    <td>{user.admission_year}</td>
                    <td id="table-actions">
                      <Link to={`/admin/students/info/${user.enrollment_no}`}>
                        <button className="view" style={{ minWidth: "30%" }}>
                          <center>View</center>
                        </button>
                      </Link>
                      <Link
                        to={`/admin/students/update-student/${user.enrollment_no}`}
                      >
                        <button className="update">
                          <center>Update</center>
                        </button>
                      </Link>
                      <Link>
                        <button className="delete">
                          <center>Delete</center>
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </table>
            {/* <MaterialReactTable columns={columns} data={Users} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminStudents;
