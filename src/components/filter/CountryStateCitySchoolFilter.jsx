import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getCountries, getStates, getCities , getStateCities} from '../../actions/schoolAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CountryStateCitySchoolFilter = ({  
  School: {countries, states, cities}, 
  getCountries,
  getStates,
  getCities,
  getStateCities
}) => {
  const schools = [
    {
      schoolId: '1',
      schoolName: 'MTB',
      location: 'SDK',
      branch: 'Sadiqabad',
      postalCode: '4037',
      principal: 'Zaid',
      salesPersonId: '2',
      noOfStudent: 1500,
      packages: 'Gold',
      price: 55000,
      payAmount: 30000,
      blockDate: '2021-02-23',
    },
    {
      schoolId: '2',
      schoolName: 'Punjab',
      location: 'RYK',
      branch: 'RYK',
      postalCode: '4337',
      principal: 'Asif',
      salesPersonId: '3',
      noOfStudent: 1000,
      packages: 'Silver',
      price: 35000,
      payAmount: 20000,
      blockDate: '2021-07-05',
    },
    {
      schoolId: '3',
      schoolName: 'MTB',
      location: 'SDK',
      branch: 'Sadiqabad',
      postalCode: '4037',
      principal: 'Zaid',
      salesPersonId: '2',
      noOfStudent: 1500,
      packages: 'Gold',
      price: 55000,
      payAmount: 30000,
      blockDate: '2020-10-13',
    },
  ];
  // const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  // const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState([]);
  // const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState([]);

  useEffect(() => {
    getCountries();
    // eslint-disable-next-line
  }, []);

  const onCountriesChange = (country) => {
    setSelectedState([]);
    setSelectedCity([]);
    setSelectedCountry(country);
    if (country.length > 0) {
      getStates(country[0].country);
      getCities(country[0].country);
    }
  };

  const onStatesChange = (state) => {
    setSelectedCity([]);
    setSelectedState(state);
    if (state.length > 0) {
      getStateCities(selectedCountry[0].country, state[0].name);
    }
  };

  const onCitiesChange = (city) => {
    setSelectedCity(city);
  };

  const onSchoolChange = (school) => {
    setSelectedSchool(school);
  };
  const onSubmit = () => {};
  if(states !== null){

    console.log(" states.length",  states.length)
  }
  return (
    <div className='div'>
      <div className='date-picker'>
        <Form onSubmit={onSubmit} className='theme-form'>
          <Row className='row justify-content-between'>
            <Col sm={12} md={3}>
            <FormGroup>
                <Label htmlFor='countries'>Select Country</Label>
                <Typeahead
                  id='multiple-typeahead'
                  clearButton
                  labelKey='country'
                  options={countries !== null ? countries : []}
                  selected={selectedCountry}
                  placeholder='Select Country....'
                  onChange={(data) => onCountriesChange(data)}
                />
              </FormGroup>
            </Col>

            <Col sm={12} md={3}>
            <FormGroup>
              <Label htmlFor='states'>Select State</Label>
              <Typeahead
                id='multiple-typeahead'
                clearButton
                labelKey='name'
                options={selectedCountry.length > 0 && states !== null && states.length > 0 ? states : []}
                selected={selectedState}
                placeholder='Select State....'
                onChange={(data) => onStatesChange(data)}
              />
              </FormGroup>
            </Col>

            <Col sm={12} md={3}>
            <FormGroup>
              <Label htmlFor='cities'>Select City</Label>
              <Typeahead
                id='multiple-typeahead'
                clearButton
                labelKey=''
                options={states !== null && states.length > 0 ?
                  selectedState.length !== 0 && cities !== null && cities.length > 0 ?
                  cities : []
                  :
                  cities !== null && cities.length > 0 ?
                  cities : []
                }
                selected={selectedCity}
                placeholder='Select City....'
                onChange={(data) => onCitiesChange(data)}
              />
            </FormGroup>
            </Col>
            <Col sm={12} md={3}>
              <FormGroup>
                <Label htmlFor='school'>Select School</Label>
                <Typeahead
                  id='multiple-typeahead'
                  clearButton
                  labelKey='schoolName'
                  options={schools}
                  placeholder='Select School....'
                  onChange={(data) => onSchoolChange(data)}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
        <Button
          type='submit'
          className='btn btn-sm float-right'
          color='primary'
          // onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

CountryStateCitySchoolFilter.propTypes = {
  School: PropTypes.object.isRequired,
  getCountries: PropTypes.func.isRequired,
  getStates: PropTypes.func.isRequired,
  getCities: PropTypes.func.isRequired,
  getStateCities: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  School: state.School,
});

export default connect(mapStateToProps, {getStateCities, getCountries, getStates,getCities })(CountryStateCitySchoolFilter);
