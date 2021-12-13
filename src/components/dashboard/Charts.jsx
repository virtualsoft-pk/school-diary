import React from 'react';
import { Card, CardBody,CardHeader, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ApexCharts from 'react-apexcharts';
import configDB from '../../data/customizer/config';

const Charts = (
  {Dashboard: 
    { 
      graph
    }
  }
) => {

  const primary =  configDB.data.color.primary_color;
  const secondary = configDB.data.color.secondary_color;
  const areaSpaline = {
    series: [{
      name: 'Recent Purchase',
      data:
          graph !== null
            ? graph.purchases.map((purchase) => {
                return purchase.recent_purchase;
              })
          :
          [],
    }],
    options: {
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      colors:[primary, '#f10542'],
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        categories:
        graph !== null
        ? graph.purchases.map((purchase) => {
            return purchase.monthname.slice(0,3);
          })
      :
      [],
      },
      tooltip: {
        x: {
          formatter: function (val) {
            return val;
          },
        },
      },
  },

}

  return (
        <Card>
           <CardHeader>
                <h5>Purchase</h5>
              </CardHeader>
          <CardBody >
            <div id='chart'>
              <ApexCharts
                options={areaSpaline.options}
                series={areaSpaline.series}
                type='area'
                height={350}
              />
            </div>
          </CardBody>
        </Card>
  );
};
Charts.propTypes = {
  Dashboard: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  Dashboard: state.Dashboard,
});
export default connect(mapStateToProps, null )(Charts);
