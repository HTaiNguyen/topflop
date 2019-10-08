import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { listCompanies } from '../middlewares/list';
import { reset } from '../actions/list';
import { bindActionCreators } from 'redux';
import i18n from '../../../i18n';

class ListCompagnyView extends Component {
  componentDidMount = () => {
    this.props.listCompanies();
  };

  componentWillUnmount = () => {
    this.props.reset();
  };

  render = () => {
    const { payload } = this.props.list;
    const { currentUser } = this.props;

    return (
      <>
        <div className="page-header">
          <h1 className="page-title">{i18n.t('compagny.list.title')}</h1>
        </div>

        <div className="row">
          <div className={'col-lg-12'}>
            <div className={'card'}>
              <div className={'card-body text-wrap p-lg-6'}>
                <Link
                  to={'/companies/add'}
                  className="btn btn-outline-primary mb-4"
                >
                  <i className="icon fe fe-plus"></i>
                  {i18n.t('compagny.list.add')}
                </Link>
                <table className="table card-table table-striped table-vcenter">
                  <thead>
                    <tr>
                      <th>{i18n.t('compagny.list.name')}</th>
                      <th style={{ width: '150px' }}>
                        {i18n.t('compagny.list.action')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {payload.map(compagny => (
                      <tr key={compagny.id}>
                        <td>{compagny.name}</td>
                        <td>
                          {currentUser.compagny.id !== compagny.id && (
                            <button className="btn btn-secondary btn-sm">
                              <i className={'icon fe fe-unlock'}></i>{' '}
                              {i18n.t('compagny.list.active')}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
}

ListCompagnyView.propTypes = {
  listCompanies: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    compagny: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),
  list: PropTypes.shape({
    payload: PropTypes.array.isRequired,
  }),
};

export default connect(
  state => ({
    list: state.compagny.list,
    currentUser: state.auth.authentication.user,
  }),
  dispatch => ({
    ...bindActionCreators({ listCompanies, reset }, dispatch),
  }),
)(ListCompagnyView);
