import React, { Fragment, useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  ButtonToolbar,
  ButtonGroup,
} from 'reactstrap';
import Switch from 'react-switch';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UpdatePassword from './UpdatePassword';
import { titleCase } from 'title-case';
import { deleteSubAdmin, allowAccess} from '../../actions/usersManagementActions';
import { ACCESSITEMS } from './Access';
import { toast } from 'react-toastify';

const AssignRoles = ({ UserManagement: { selectedSubAdmin}, deleteSubAdmin, allowAccess, id}) => {
  const [updateModal, setUpdateModal] = useState(false);
  const [accessItems, setAccessItems]  = useState(ACCESSITEMS)

  useEffect(()=>{
    if(selectedSubAdmin !== null && selectedSubAdmin !== undefined){
      let accessArray = [...accessItems]
      let allowAccess = JSON.parse(selectedSubAdmin.access)
  
       accessArray[0].Items.some(item => {  
        if(allowAccess.includes(item.access)){
          item.toggle = true
        }
        else{
        item.toggle = false
        }

        if(item.children){
          item.children.some(children => {
            if(allowAccess.includes(children.access)){
              children.toggle = true
            }
            else{
              children.toggle = false
            }
            if(children.children){
              children.children.some(child => {
                if(allowAccess.includes(child.access)){
                  child.toggle = true
                }
                else{
                  child.toggle = false
                }
              })
            }
          })
        } 
      })
      setAccessItems(accessArray)
    }
    
  // eslint-disable-next-line
  },[selectedSubAdmin])

  const validate = ()=>{
    if(accessItems[0].Items[4].children[1].toggle && !accessItems[0].Items[1].children[1].children[0].toggle ){
      setTimeout(() => {
        toast.error("You need to enable School Profile for Renewable Requests");
      }, 200);
      return false
    }
    return true
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if(validate()){
      var access = []
      for (let i = 0 ; i < accessItems[0].Items.length; i++){
        if(accessItems[0].Items[i].toggle){
          access.push(accessItems[0].Items[i].access)
        }
        if(accessItems[0].Items[i].children){
          for(let j = 0 ; j < accessItems[0].Items[i].children.length ; j++){
            if(accessItems[0].Items[i].children[j].toggle){
              access.push(accessItems[0].Items[i].children[j].access)
            }
            if(accessItems[0].Items[i].children[j].children){
              for(let k = 0 ; k < accessItems[0].Items[i].children[j].children.length ; k++){
                if(accessItems[0].Items[i].children[j].children[k].toggle){
                  access.push(accessItems[0].Items[i].children[j].children[k].access)
                }
                
              }
          }
        }
      }
    }
    const data = {
      id: id,
      access: access
    }
    console.log("data", data)
    allowAccess(data)
    }
   
};

  const updateToggle = () => setUpdateModal(!updateModal);

  const blockSubAdmin = () => {
    const data = {
      id: id,
      is_blocked: 1
    }
    deleteSubAdmin(data)
  };
  const unblockSubAdmin = () => {
    const data = {
      id: id,
      is_blocked: 0
    }
    deleteSubAdmin(data)
  };

  const onChange = ( i, index, key )=>{
    let accessArray = [...accessItems]
    
    if(index === undefined){
      accessArray[0].Items[i].toggle = !accessArray[0].Items[i].toggle
      console.log("toggel")
    }
    else if(key === undefined){
      accessArray[0].Items[i].children[index].toggle = !accessArray[0].Items[i].children[index].toggle
      if(i === 1){
        let count = 0;
        for(let x = 0; x < accessArray[0].Items[i].children.length; x++){
         
          if(accessArray[0].Items[i].children[x].toggle){
            count = count + 1
          }
          else{
            count = count - 1
          }
        }
        if(count === -2){
          accessArray[0].Items[i].toggle = false
        }
        else{
          accessArray[0].Items[i].toggle = true
        }
      }
      
      
    }
    else{
      accessArray[0].Items[i].children[index].children[key].toggle = !accessArray[0].Items[i].children[index].children[key].toggle
    
    }

    if(!accessArray[0].Items[i].toggle){
      if(accessArray[0].Items[i].children){
        for(let k = 0; k < accessArray[0].Items[i].children.length ; k++){
          accessArray[0].Items[i].children[k].toggle = false
        }
      }
    }
    if(index !== undefined && accessArray[0].Items[i].children[index].children){
         if(!accessArray[0].Items[i].children[index].toggle){
          for(let k = 0; k < accessArray[0].Items[i].children[index].children.length ; k++){
            accessArray[0].Items[i].children[index].children[k].toggle = false
          }
        }
      }
    
    setAccessItems(accessArray)
  }
  return (
    <div>
      <Fragment>
        <div className='profile-img-style'>
          <Row>
            <Col sm={12} md={6}>
              <div className='media'>
                <div className='media-body align-self-center'>
                  <h5 className='mt-0 user-name'>User Name</h5>
                  <p>{titleCase(selectedSubAdmin.name)}</p>
                </div>
              </div>
            </Col>
            <Col sm={12} md={6}>
            <ButtonToolbar style={{ justifyContent: 'flex-end' }}>
                <ButtonGroup style={{ marginTop: '10px' }}>
                  <Button
                    color='primary'
                    className='btn btn-sm'
                    onClick={updateToggle}
                  >
                    <span>Change Password</span>
                  </Button>
                </ButtonGroup>
                <ButtonGroup style={{ marginLeft: '10px', marginTop: '10px' }}>
                  {selectedSubAdmin.is_blocked === "0" ? 
                  <Button
                  color='secondary'
                  className='btn btn-sm'
                  onClick={blockSubAdmin}
                >
                  <span>Block</span>
                </Button>:
                <Button
                color='secondary'
                className='btn btn-sm'
                onClick={unblockSubAdmin}
              >
                <span>Unblock</span>
              </Button>
                }
                  
                </ButtonGroup>

                <UpdatePassword
                  modal={updateModal}
                  toggle={updateToggle}
                  id={selectedSubAdmin.id}
                />
              </ButtonToolbar>
            </Col>
          </Row>
        </div>
        <hr />
        
        {selectedSubAdmin.is_blocked === "0" && 
        <Fragment>
        <h6>Allow Access</h6>
        <hr/>
        <ul>
        {
          accessItems.map((Item, i) =>
          <Fragment key={i}>
            {Item.Items.map((menuItem, i) => 
             <li key={i} >
               {(menuItem.type === 'sub')? (
                  <div className='media'>
                  <div className='media-body'>
                    <span>{menuItem.title}</span>
                  </div>
                  <div className='align-self-center'>
                    <div className='float-sm-right'>
                      <label htmlFor={menuItem.title}>
                        <Switch
                          onChange={()=> onChange(i)}
                          checked={menuItem.toggle}
                          onColor="#f69f97"
                          onHandleColor="#ed4030"
                          handleDiameter={20}
                          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                          height={20}
                          width={40}
                          className="react-switch"
                          id="normal-switch"
                          disabled={menuItem.disable}
                        />
                      </label>
                    </div>
                  </div>
                </div>
               ) : (
                  ""
               )}
               {(menuItem.type === 'link') ?
                <div className='media'>
                <div className='media-body'>
                  <span>{menuItem.title}</span>
                </div>
                <div className='align-self-center'>
                  <div className='float-sm-right'>
                    <label htmlFor={menuItem.title}>
                      <Switch
                        onChange={()=> onChange(i)}
                        checked={menuItem.toggle}
                        onColor="#f69f97"
                        onHandleColor="#ed4030"
                        handleDiameter={20}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={20}
                        width={40}
                        className="react-switch"
                        id="normal-switch"
                        disabled={menuItem.disable}
                      />
                    </label>
                  </div>
                </div>
              </div>
                : ''}
                  {menuItem.children ?
                  <ul style={{marginLeft: "20px"}}>
                    {menuItem.children.map((childrenItem, index) => {
                      return (
                        <li key={index}>
                          {(childrenItem.type === 'sub') ?
                           <div className='media'>
                           <div className='media-body'>
                             <span>{childrenItem.title}</span>
                           </div>
                           <div className='align-self-center'>
                             <div className='float-sm-right'>
                               <label htmlFor={menuItem.title}>
                                 <Switch
                                   onChange={()=> onChange( i , index)}
                                   checked={childrenItem.toggle}
                                   onColor="#f69f97"
                                   onHandleColor="#ed4030"
                                   handleDiameter={20}
                                   boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                   activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                   height={20}
                                   width={40}
                                   className="react-switch"
                                   id="normal-switch"
                                   disabled={childrenItem.disable}
                                 />
                               </label>
                             </div>
                           </div>
                         </div>
                            : ''
                            }
                            {(childrenItem.type === 'link')  ?
                              <div className='media'>
                              <div className='media-body'>
                                <span>{childrenItem.title}</span>
                              </div>
                              <div className='align-self-center'>
                                <div className='float-sm-right'>
                                  <label htmlFor={menuItem.title}>
                                    <Switch
                                      onChange={()=> onChange( i , index)}
                                      checked={childrenItem.toggle}
                                      onColor="#f69f97"
                                      onHandleColor="#ed4030"
                                      handleDiameter={20}
                                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                      height={20}
                                      width={40}
                                      className="react-switch"
                                      id="normal-switch"
                                      disabled={childrenItem.disable}
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                             : ''
                            }

                          {childrenItem.children ?
                            <ul >
                              {childrenItem.children.map((childrenSubItem, key) =>
                                <li key={key}>
                                  
                                    {(childrenSubItem.type === 'link')?
                                    <div className='media'>
                                    <div className='media-body'>
                                      <span>{childrenSubItem.title}</span>
                                    </div>
                                    <div className='align-self-center'>
                                      <div className='float-sm-right'>
                                        <label htmlFor={menuItem.title}>
                                          <Switch
                                            onChange={()=> onChange( i , index, key)}
                                            checked={childrenSubItem.toggle}
                                            onColor="#f69f97"
                                            onHandleColor="#ed4030"
                                            handleDiameter={20}
                                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                            height={20}
                                            width={40}
                                            className="react-switch"
                                            id="normal-switch"
                                            disabled={childrenSubItem.disable}
                                          />
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                    : ''}
                                </li>
                              )}
                            </ul>
                            : ""}

                        </li>
                      )
                    })}
                  </ul>
                  : ''}
                  <hr/>
             </li>
            )}
          </Fragment>
          )}
        </ul>
      
        <Button
          type='submit'
          className='btn btn-sm float-right'
          color='primary'
          onClick={onSubmit}
        >
          Save Changes
        </Button>
        </Fragment>
        }
      </Fragment>
    </div>
  );
};

AssignRoles.propTypes = {
  UserManagement: PropTypes.object.isRequired,
  deleteSubAdmin: PropTypes.func.isRequired,
  allowAccess: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  UserManagement: state.UserManagement,
});

export default connect(mapStateToProps, { allowAccess, deleteSubAdmin })(AssignRoles);