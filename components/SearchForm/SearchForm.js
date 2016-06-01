import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import ErrorAlert from '../ErrorAlert';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {orderBy: props.orderBy, sortBy: props.sortBy, error: false};
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  static propTypes = {
    show: PropTypes.bool.isRequired,
    handleSearch: PropTypes.func.isRequired,
    sortBy: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
  };

  handleSubmitForm (e) {
    e.preventDefault();
    const valid = this.validateForm();
    if (valid === true) {
      this.setState({error: false});
      this.props.handleSearch(this.getDataForm());
    } else {
      this.setState({error: valid.error});
    }
  };

  sortChange = (e) => {
    this.setState({sortBy: e.target.value});
  };

  orderChange = (e) => {
    this.setState({orderBy: e.target.value});
  };

  getDataForm () {
    return {
      query: this.refs.query.value,
      language: this.refs.language.value,
      owner: this.refs.owner.value,
      size: {
        from: this.refs.size_from.value,
        to: this.refs.size_up.value,
      },
      stars: {
        from: this.refs.stars_from.value,
        to: this.refs.stars_up.value,
      },
      forks: {
        from: this.refs.forks_from.value,
        to: this.refs.forks_up.value,
      },
      sortBy: this.state.sortBy,
      orderBy: this.state.orderBy,
    };
  }

  resetFilterForm = (e) => {
    e.preventDefault();
    // todo logic to erase all data
  };

  validateForm = () => {
    // todo add more validations
    if (!this.refs.query.value
      && !this.refs.language.value
      && !this.refs.owner.value
      && !this.refs.size_from.value
      && !this.refs.size_up.value
      && !this.refs.stars_from.value
      && !this.refs.stars_up.value
      && !this.refs.forks_from.value
      && !this.refs.forks_up.value) {
      return {error: new Error('At least one of this inputs must be fill')};
    }
    return true;
  }

  render () {

    return (
      <div className={(this.props.show ? '' : 'hidden ') + "filter-block"}>
        {(this.state.error ? <ErrorAlert message={this.state.error.message} /> : null)}
        <form onSubmit={this.handleSubmitForm} ref="searchForm" className="form-inline">
          <div className="row">
            <div className="col-md-6">
              <div className={'form-group' + (this.state.error && ' has-error')} >
                <h4>Query</h4>
                <input type="text" aria-label="Query" name="query" className="form-control" ref="query" placeholder="Your search query"/>
              </div>
            </div>
            <div className="col-md-6">
              <div className={'form-group pull-right' + (this.state.error && ' has-error')}>
                <h4>Size in kilobytes</h4>
                <input type="number" aria-label="Size from" className="form-control" ref="size_from" placeholder="from"/>
                &nbsp;&nbsp;
                <input type="number" aria-label="Size up" className="form-control" ref="size_up" placeholder="up to"/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className={'form-group' + (this.state.error && ' has-error')}>
                <h4>Language</h4>
                <input type="text" aria-label="Language" className="form-control" ref="language" placeholder="language"/>
              </div>
            </div>
            <div className="col-md-3">
              <div className={'form-group text-center' + (this.state.error && ' has-error')}>
                <h4>Owner (user or organization)</h4>
                <input type="text" aria-label="owner" className="form-control" ref="owner" placeholder="Owner"/>
              </div>
            </div>
            <div className="col-md-6">
              <div className={'form-group pull-right' + (this.state.error && ' has-error')}>
                <h4>Forks</h4>
                <input type="number" aria-label="Forks from" className="form-control" ref="forks_from" placeholder="from"/>
                &nbsp;&nbsp;
                <input type="number" aria-label="Forks up" className="form-control" ref="forks_up" placeholder="up to"/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <h4>Default sort</h4>
                <label className="radio-inline">
                  <input type="radio" name="sortByOptions" id="inlineRadio1" value="created" defaultChecked onChange={this.sortChange} /> by created
                </label>
                <label className="radio-inline">
                  <input type="radio" name="sortByOptions" id="inlineRadio2" value="updated" onChange={this.sortChange} /> by updated
                </label>
                <label className="radio-inline">
                  <input type="radio" name="sortByOptions" id="inlineRadio3" value="stars" onChange={this.sortChange} /> by stars
                </label>
                <label className="radio-inline">
                  <input type="radio" name="sortByOptions" id="inlineRadio4" value="forks" onChange={this.sortChange} /> by forks
                </label>
                <br/>
                <hr/>
                <label className="radio-inline">
                  <input type="radio" name="orderBy" id="inlineRadio3" value="asc" onChange={this.orderChange} /> ASC
                </label>
                <label className="radio-inline">
                  <input type="radio" name="orderBy" id="inlineRadio3" value="desc" defaultChecked onChange={this.orderChange} /> DESC
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className={'form-group pull-right' + (this.state.error && ' has-error')}>
                <h4>Stars</h4>
                <input type="number" aria-label="Stars from" className="form-control" ref="stars_from" placeholder="from"/>
                &nbsp;&nbsp;
                <input type="number" aria-label="Stars up" className="form-control" ref="stars_up" placeholder="up to"/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 pull-right text-right">
              <button type="submit" className="btn btn-success"><span className="glyphicon glyphicon-search"></span> Apply</button>
              &nbsp;&nbsp;
              <button type="button" className="btn default" onClick={this.resetFilterForm}><span className="glyphicon glyphicon-erase"></span> Erase all</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
