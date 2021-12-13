import React from 'react';
import { Card, CardBody,CardHeader} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ApexCharts from 'react-apexcharts';
import configDB from '../../data/customizer/config';

const BarChart = (
  {Dashboard: 
    { 
      graph
    }
  }
) => {
  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
    'Jan',
  ];
  const primary = configDB.data.color.primary_color;
  const secondary =
    configDB.data.color.secondary_color;

  const apexBarChart = {
    series: [{
    data:  
    graph !== null
        ? graph.packages.map((p) => {
            return p.package_count;
          })
      :
      [],
  }],
  options: {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    colors:[primary],
    xaxis: {
      categories: 
      graph !== null
        ? graph.packages.map((p) => {
            return p.package;
          })
      :
      [],
    }
  },
};

  return (
        <Card>
            <CardHeader>
              <h5>Sold Packages</h5>
            </CardHeader>
          <CardBody>
            <div id="basic-bar">
              <ApexCharts options={apexBarChart.options} series={apexBarChart.series} type="bar" height={350} />
            </div>
          </CardBody>
        </Card>
  );
};
BarChart.propTypes = {
  Dashboard: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  Dashboard: state.Dashboard,
});
export default connect(mapStateToProps , null)(BarChart);
