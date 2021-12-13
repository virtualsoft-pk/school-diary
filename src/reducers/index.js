import { combineReducers } from 'redux';

import authReducer from './auth/authReducer';
import customizerReducer from './customizer/customizerReducer';
// import blogReducer from './blog/blogReducer';
// import purchaseReducer from './purchase/purchaseReducer';
// import productReducer from './product/productReducer';
// import purchaseReportReducer from './purchaseReport/purchaseReportReducer';
// import purchaseReturnReportReducer from './purchaseReturnReport/purchaseReturnReportReducer';
// import alertReducer from './alert/alertReducer';
// import salesReportReducer from './salesReport/salesReportReducer';
// import salesReturnReportReducer from './salesReturnReport/salesReturnReportReducer';
import dashboardReducer from './dashhboard/dashboardReducer';
// import contactUsReducer from './contactUs/contactUsReducer';
// import ordersReducer from './orders/ordersReducer';
import userManagementReducer from './userManagement/userManagementReducer';
// import emailTemplateReducer from './emailTemplate/emailTemplateReducer';
// import productReportReducer from './productReport/productReportReducer';

import schoolReducer from './schools/schoolReducer';
import packageReducer from './package/packageReducer';
import classReducer from './schoolClass/classReducer';
import roleReducer from './role/roleReducer';
import salesPersonsReducer from './salesPerson/salesPersonsReducer';
import queriesReducer from './queries/queriesReducer';
import renewableRequestReducer from './renewableRequest/renewableRequestReducer';
import incomeReducer from './income/incomeReducer';
import supportReducer from './support/supportReducer';
import notificationReducer from './notification/notificationReducer';
import citySchoolReducer from './citySchools/citySchoolReducer';
import sectionReducer from './section/sectionReducer';
import feeGroupReducer from './feeGroup/feeGroupReducer';
import feeTypeReducer from './feeType/feeTypeReducer';
import emailLogReducer from './email/emailLogReducer';
import assignSectionReducer from './assignSection/assignSectionReducer';
import feeDiscountReducer from './feeDiscount/feeDiscountReducer';
import studentCategoryReducer from './studentCategory/studentCategoryReducer';
import feeMasterReducer from './feeMaster/feeMasterReducer';

export default combineReducers({
  Auth: authReducer,
  Customizer: customizerReducer,
  School: schoolReducer,
  Package: packageReducer,
  Class: classReducer,
  Role: roleReducer,
  SalesPersons: salesPersonsReducer,
  Query: queriesReducer,
  RenewableRequest: renewableRequestReducer,
  Income: incomeReducer,
  Support: supportReducer,
  Notification: notificationReducer,
  CitySchool: citySchoolReducer,
  Section: sectionReducer,
  FeeGroup: feeGroupReducer,
  FeeType: feeTypeReducer,
  FeeDiscount: feeDiscountReducer,
  EmailLog: emailLogReducer,
  AssignSection: assignSectionReducer,
  StudentCategory: studentCategoryReducer,
  FeeMaster: feeMasterReducer,
  // Blog: blogReducer,
  // Purchase: purchaseReducer,
  // Product: productReducer,
  // ProductReport: productReportReducer,
  // PurchaseReport: purchaseReportReducer,
  // PurchaseReturnReport: purchaseReturnReportReducer,
  // Alert: alertReducer,
  // Sales: salesReportReducer,
  // SalesReturnReport: salesReturnReportReducer,
  Dashboard: dashboardReducer,
  // ContactUs: contactUsReducer,
  // Orders: ordersReducer,
  UserManagement: userManagementReducer,
  // EmailTemplate: emailTemplateReducer,
});
