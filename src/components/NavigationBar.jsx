import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <>
      <h1 className="d-flex justify-content-center">Task Manager</h1>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid d-flex justify-content-around">
          <div>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  TaskList
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/add-task">
                  Add Task
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
