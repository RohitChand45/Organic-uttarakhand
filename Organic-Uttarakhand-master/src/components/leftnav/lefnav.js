import { Link } from "react-router-dom"

const LeftNav = () => (
  <>
    {/* Hello world */}
    <div className="sidebar-wrapper" data-simplebar="true">
      <div className="sidebar-header">
        <div className>
          {/* <img src="assets/images/logo-icon.png" className="logo-icon-2" alt /> */}
        </div>
        <div>
          <h6 className="logo-text">Library Admin</h6>
        </div>
        <a href="javascript:;" className="toggle-btn ml-auto">
          {" "}
          <i className="bx bx-menu" />
        </a>
      </div>
      {/*navigation*/}
      <ul className="metismenu" id="menu">

        <li>
          <Link to={"/dashboard"}>
            <div className="parent-icon icon-color-5">
              <i className="bx bx-home-alt" />
            </div>
            <div className="menu-title">Dashboard</div>
          </Link>
        </li>

        <li>
          <Link to={"/studentDetails"}>
            <div className="parent-icon icon-color-5">
              <i className="bx bx-group" />
            </div>
            <div className="menu-title">Students</div>
          </Link>
        </li>

        <li>
          <Link to={"/seat"}>
            <div className="parent-icon icon-color-5">
              <i className="bx bx-chair" />
            </div>
            <div className="menu-title">Seat</div>
          </Link>
        </li>

        <li>
          <Link to={"/slot"}>
            <div className="parent-icon icon-color-5">
              <i className="lni lni-layers" />
            </div>
            <div className="menu-title">Slot</div>
          </Link>
        </li>
        
      </ul>
    </div>
  </>
)

export default LeftNav
