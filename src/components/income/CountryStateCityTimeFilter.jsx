import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getCountries, getStates, getCities } from '../../actions/schoolAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CountryStateCityTimeFilter = ({
  School: { countries, states, cities },
  getCountries,
  getStates,
  getCities,
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

  // const getCountries = async () => {
  //   try {
  //     const countries = await axios.get(
  //       'https://countriesnow.space/api/v0.1/countries'
  //     );
  //     setCountries(countries.data.data);
  //   } catch (error) {
  //     console.log('errororororr', error);
  //   }
  // };

  // const getStates = async (country) => {
  //   try {
  //     const states = await axios.post(
  //       'https://countriesnow.space/api/v0.1/countries/states',
  //       { country: country[0].country }
  //     );
  //     setStates(states.data.data.states);
  //   } catch (error) {
  //     console.log('errororororr', error);
  //   }
  // };

  // const getCities = async (country, state) => {
  //   try {
  //     const city = await axios.post(
  //       'https://countriesnow.space/api/v0.1/countries/state/cities',
  //       { country: country[0].country, state: state[0].name }
  //     );
  //     setCities(city.data.data);
  //   } catch (error) {
  //     console.log('errororororr', error);
  //   }
  // };

  const onCountriesChange = (country) => {
    setSelectedState([]);
    setSelectedCity([]);
    setSelectedCountry(country);
    if (country.length > 0) {
      getStates(country[0].country);
    }
  };

  console.log('statess:::', states);
  const onStatesChange = (state) => {
    // setCities([]);
    setSelectedCity([]);
    setSelectedState(state);
    if (state.length > 0) {
      getCities(selectedCountry[0].country, state[0].name);
    }
  };
  console.log('cities::::::::::::', cities);

  const onCitiesChange = (city) => {
    setSelectedCity(city);
  };

  const onSchoolChange = (school) => {
    setSelectedSchool(school);
  };
  const onSubmit = () => {};

  return (
    <div className='div'>
      {/* <div className="container-fluid" >
          <div className="row">
            <div className="col-md-6 ">
              <form>
                <div class="form-group row">
                  <label for="country" class="col-sm-4 col-form-label">Select Country</label>
                  <div class="col-sm-8">
                  <Typeahead
                id='multiple-typeahead'
                clearButton
                labelKey='country'
                options={countries}
                placeholder='Select Country....'
                onChange={(data) => onCountriesChange(data)}
              />

                  </div>
                </div>
              </form>


            </div>
            <div className="col-md-6 ">
             <form> 
                <div class="form-group row">
                  <label for="Select State" class="col-sm-4 col-form-label">Select State</label>
                  <div class="col-sm-8">
                  <Typeahead
                id='multiple-typeahead'
                clearButton
                labelKey="name"
                options={states}
                selected={selectedState}
                placeholder='Select State....'
                onChange={(data) => onStatesChange(data)}
              />

                  </div>
                </div>
             </form>
            </div>


            <div className="col-md-6 col-lg-6 ">
              <form>
                <div class="form-group row">
                  <label for="Select City" class="col-sm-4 col-form-label">Select City</label>
                  <div class="col-sm-8">
                  <Typeahead
                id='multiple-typeahead'
                clearButton
                labelKey=""
                options={cities}
                selected={selectedCity}
                placeholder='Select City....'
                onChange={(data) => onCitiesChange(data)}
              />
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-6 ">

              <form>
                <div class="form-group row">
                  <label for="Select School" class="col-sm-4 col-form-label">Select School</label>
                  <div class="col-sm-8">
                    <Typeahead
                id='multiple-typeahead'
                clearButton
                labelKey='schoolName'
                options={schools}
                placeholder='Select School....'
                onChange={(data) => onSchoolChange(data)}
              />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
     

    
      
      <div className="col-md-12  " >
        <div className="row">
          <div className="col-md-4 ">
          
          </div>
          <div className="col-md-4 ">
          </div>
          <div className="col-md-4">
            <button type="button" className="btn btn-primary btn-sm" id="btn-1">Submit</button>
          </div>
        </div>
      </div> */}

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
                  options={
                    selectedCountry.length > 0 && states !== null ? states : []
                  }
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
                  options={
                    selectedState.length > 0 && cities !== null ? cities : []
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
                {/* <Typeahead
                  id='multiple-typeahead'
                  clearButton
                  labelKey='schoolName'
                  options={schools}
                  placeholder='Select School....'
                  onChange={(data) => onSchoolChange(data)}
                /> */}
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

CountryStateCityTimeFilter.propTypes = {
  School: PropTypes.object.isRequired,
  getCountries: PropTypes.func.isRequired,
  getStates: PropTypes.func.isRequired,
  getCities: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  School: state.School,
});

export default connect(mapStateToProps, { getCountries, getStates, getCities })(
  CountryStateCityTimeFilter
);
