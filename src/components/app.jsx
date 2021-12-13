import React, { Fragment } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

// Store
import { Provider } from 'react-redux';
import store from '../store';

import PrivateRoute from './routing/PrivateRoute';

// // Login page
// import Login from '../auth/Login';

// //Components

// dashboard
import Dashboard from '../components/dashboard/Dashboard';
import CitiesSchools from '../components/cities/CitiesSchools';

// School
import SchoolListing from '../components/school/SchoolListing';
import AddSchool from '../components/school/AddSchool';
import ViewSchool from '../components/school/ViewSchool';

//Subject
// import AddSubject from './subject/AddSubject';

//message

import Messages from '../components/messages/Messages';

//User Management
import Users from '../components/userManagement/Users';

//School Management
import Students from '../components/studentManagement/Students';
import ViewStudent from '../components/studentManagement/ViewStudent';
//Income
import Income from '../components/income/Income';
import Details from '../components/income/Details';

//Packages
import Packages from '../components/packages/Packages';
import ViewPackage from '../components/packages/ViewPackage';

//Block List
import BlockList from '../components/blockList/BlockList';

import ChangePassword from '../components/changePassword/ChangePassword';

//Add Student
import AddStudent from './studentAdmission/AddStudent';

//User Profile
import UserProfile from '../components/users/userProfile';
import StudentListing from './studentAdmission/StudentListing';

//Human Resources
import AddEmployeeForm from './humanResources/AddEmployeeForm';
import Employees from './humanResources/Employees';
// import AddRole from './humanResources/AddRole';
import RoleListing from './humanResources/RoleListing';

// Fee Management
import FeeSubmissionForm from './feeSubmission/FeeSubmissionForm';
import Fees from './feeSubmission/Fees';
import FeeType from './feeType/FeeType';
import FeeGroup from './feeGroup/FeeGroup';
import FeeMaster from './feeMaster/FeeMaster';
import CollectFees from './collectFees/CollectFees';

import SupportUs from './supportUs/SupportUs';
import SetNotification from './notification/SetNotification';
import RenewableRequest from './renewablePackage/RenewableRequest';
import Attendance from './attendance/Attendance';

//User Panel => school Management

import Subjects from './subject/Subjects';
import Section from './section/Section';
import SchoolClass from './schoolClass/SchoolClass';
import HomeWork from './homeWork/HomeWork';
import SendEmail from './email/SendEmail';

import EmailLog from './email/EmailLog';
import DownloadCenter from './downloadCenter/DownloadCenter';

//Communicate
import NoticeBoard from './noticeBoard/NoticeBoard';
import AddNewNotice from './noticeBoard/AddNewNotice';
import UpdateNotice from './noticeBoard/UpdateNotice';
import ViewNotice from './noticeBoard/ViewNotice';
import LoginCredentials from './loginCredentials/LoginCredentials';
import School from './cities/School';

//Sale Person
import SalePersons from './salePerson/SalePersons';

// User Login
import Login from '../auth/Login';

//Admin Login
import AdminLogin from '../adminAuth/Login';

//Time table
import TiemTable from './timetable/TimeTable';
import TimeTableDetails from './timetable/TimeTableDetails';
import AddTimeTable from './timetable/AddTimeTable';

import Default from '../components/dashboard/default';

//Errors
import Error404 from '../pages/errors/error404';

import AssignSection from './assignSection/AssignSection';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <PrivateRoute
              exact
              isAdmin={true}
              path='/virtualsoft/admin/dashboard'
              component={Dashboard}
            />

            <PrivateRoute
              exact
              isAdmin={true}
              path='/virtualsoft/admin/dashboard/schools'
              component={CitiesSchools}
            />
            <PrivateRoute
              exact
              isAdmin={true}
              path='/virtualsoft/admin/dashboard/schools/school'
              component={School}
            />

            <PrivateRoute
              exact
              isAdmin={true}
              path='/virtualsoft/admin/settings/support-us'
              component={SupportUs}
            />

            <PrivateRoute
              exact
              isAdmin={true}
              path='/virtualsoft/admin/settings/notification'
              component={SetNotification}
            />

            <PrivateRoute
              exact
              isAdmin={true}
              path='/virtualsoft/admin/school/school-listing'
              component={SchoolListing}
            />
            <PrivateRoute
              exact
              isAdmin={true}
              path='/virtualsoft/admin/school/school-listing/detail'
              component={ViewSchool}
            />

            <PrivateRoute
              exact
              isAdmin={true}
              path='/virtualsoft/admin/school/add-school'
              component={AddSchool}
            />
            <PrivateRoute
              exact
              isAdmin={true}
              path='/virtualsoft/admin/sales-person'
              component={SalePersons}
            />

            <PrivateRoute
              exact
              isAdmin={true}
              path='/virtualsoft/admin/message'
              component={Messages}
            />
            <PrivateRoute
              exact
              isAdmin={true}
              path='/virtualsoft/admin/usermanagement'
              component={Users}
            />
            <PrivateRoute
              exact
              isAdmin={true}
              path='/virtualsoft/admin/student-management'
              component={Students}
            />
            <PrivateRoute
              exact
              isAdmin={true}
              path='/virtualsoft/admin/student-management/student-profile'
              component={ViewStudent}
            />
            <PrivateRoute
              exact
              isAdmin={true}
              path='/virtualsoft/admin/income'
              component={Income}
            />
            <PrivateRoute
              exact
              isAdmin={true}
              path='/virtualsoft/admin/income/details'
              component={Details}
            />
            <PrivateRoute
              exact
              isAdmin={true}
              path='/virtualsoft/admin/packages'
              component={Packages}
            />
            <PrivateRoute
              exact
              isAdmin={true}
              path='/virtualsoft/admin/renewable-request'
              component={RenewableRequest}
            />
            <PrivateRoute
              exact
              isAdmin={true}
              path='/virtualsoft/admin/packages/detail'
              component={ViewPackage}
            />

            <PrivateRoute
              exact
              isAdmin={true}
              path='/virtualsoft/admin/settings/block-list'
              component={BlockList}
            />
            <PrivateRoute
              exact
              isAdmin={true}
              path='/virtualsoft/admin/settings/change-password'
              component={ChangePassword}
            />
            <PrivateRoute
              exact
              isAdmin={true}
              path='/virtualsoft/admin/settings/user-profile'
              component={UserProfile}
            />
            <PrivateRoute
              exact
              isAdmin={false}
              path='/school-management/subject'
              component={Subjects}
            />
            <PrivateRoute
              exact
              isAdmin={false}
              path='/school-management/section'
              component={Section}
            />
            <PrivateRoute
              exact
              isAdmin={false}
              path='/school-management/class'
              component={SchoolClass}
            />
            <PrivateRoute
              exact
              isAdmin={false}
              path='/school-management/assign-section'
              component={AssignSection}
            />
            <PrivateRoute
              exact
              isAdmin={false}
              path='/school-management/home-work'
              component={HomeWork}
            />

            <PrivateRoute
              exact
              isAdmin={false}
              path='/student-admission/add-student'
              component={AddStudent}
            />
            <PrivateRoute
              exact
              isAdmin={false}
              path='/student-admission/student-listing'
              component={StudentListing}
            />

            <PrivateRoute
              exact
              isAdmin={false}
              path='/human-resources/add-employee'
              component={AddEmployeeForm}
            />
            <PrivateRoute
              exact
              isAdmin={false}
              path='/human-resources/employee-list'
              component={Employees}
            />
            <PrivateRoute
              exact
              isAdmin={false}
              path='/human-resources/role'
              component={RoleListing}
            />

            <PrivateRoute
              exact
              isAdmin={false}
              path='/fee/fee-submission'
              component={FeeSubmissionForm}
            />
            <PrivateRoute
              exact
              isAdmin={false}
              path='/fee/fee-list'
              component={Fees}
            />
            <PrivateRoute
              exact
              isAdmin={false}
              path='/fee/fee-type'
              component={FeeType}
            />
            <PrivateRoute
              exact
              isAdmin={false}
              path='/fee/fee-group'
              component={FeeGroup}
            />
            <PrivateRoute
              exact
              isAdmin={false}
              path='/fee/fee-master'
              component={FeeMaster}
            />
            <PrivateRoute
              exact
              isAdmin={false}
              path='/fee/collect-fees'
              component={CollectFees}
            />

            <PrivateRoute
              exact
              isAdmin={false}
              path='/school-management/attendance'
              component={Attendance}
            />

            <PrivateRoute
              exact
              isAdmin={false}
              path='/communicate/send-email-sms'
              component={SendEmail}
            />
            <PrivateRoute
              exact
              isAdmin={false}
              path='/communicate/email-sms-log'
              component={EmailLog}
            />
            <PrivateRoute
              exact
              isAdmin={false}
              path='/communicate/notice-board'
              component={NoticeBoard}
            />

            <PrivateRoute
              exact
              isAdmin={false}
              path='/communicate/notice-board/add-notice'
              component={AddNewNotice}
            />

            <PrivateRoute
              exact
              isAdmin={false}
              path='/communicate/notice-board/update-notice'
              component={UpdateNotice}
            />

            <PrivateRoute
              exact
              isAdmin={false}
              path='/communicate/notice-board/view-notice'
              component={ViewNotice}
            />

            <PrivateRoute
              exact
              isAdmin={false}
              path='/communicate/download-centre'
              component={DownloadCenter}
            />

            <PrivateRoute
              exact
              isAdmin={false}
              path='/communicate/login-credentials'
              component={LoginCredentials}
            />
            <PrivateRoute
              exact
              isAdmin={false}
              path='/timetable/add-timetable'
              component={AddTimeTable}
            />

            <PrivateRoute
              exact
              isAdmin={false}
              path='/timetable/timetable-listing'
              component={TiemTable}
            />

            <PrivateRoute
              exact
              isAdmin={false}
              path='/timetable/timetable-listing/detail'
              component={TimeTableDetails}
            />

            <PrivateRoute
              exact
              isAdmin={false}
              path='/default'
              component={Default}
            />

            <Route exact path='/login' component={Login} />

            <Route
              exact
              path='/virtualsoft/admin/login'
              component={AdminLogin}
            />

            <Route component={Error404} />

            {/* <PrivateRoute exact path='/dashboard' component={Dashboard} /> */}
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
