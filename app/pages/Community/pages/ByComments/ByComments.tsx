import React from 'react';
import { inject, observer } from 'mobx-react';
// import Select from 'react-select';
// import SelectPublisherState from './components/SelectPublisherState';
import { CommunityByComments } from 'stores/CommunityByComments';
import Header from 'pages/Community/components/Header';
import TableEmptyState from 'pages/Community/components/TableEmptyState';
import Table from './components/Table';

import './styles.scss';

interface Props {
  communityByComments: CommunityByComments;
}

interface State {}

@inject('communityByComments')
@observer
class ByPointsPage extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    /* if (this.props.communityByComments.publishers.length <= 0) {
      this.props.communityByComments.getPublishers();
    } */

    this.props.communityByComments.getUsers();
  }

  componentWillUnmount() {
    this.props.communityByComments.clearState();
  }

  render() {
    return (
      <div>
        <Header title="Leaderboard 🏆" description="Top users by comments" />
        <div className="container">
          <div className="community-table-top">
            <div className="table-tabs-btn-group btn-group" role="group" aria-label="Basic example">
              <button
                type="button"
                onClick={() => this.props.communityByComments.changePeriod('week')}
                className={`btn btn-secondary ${this.props.communityByComments.timePeriod === 'week' ? 'active' : ''}`}
              >
                Week
              </button>
              <button
                type="button"
                onClick={() => this.props.communityByComments.changePeriod('month')}
                className={`btn btn-secondary ${this.props.communityByComments.timePeriod === 'month' ? 'active' : ''}`}
              >
                Month
              </button>
            </div>
            <div>
              {/* <Select
                defaultValue={this.props.communityByComments.selectedPublisher}
                isLoading={this.props.communityByComments.publishersLoading}
                isClearable={false}
                isSearchable={true}
                options={this.props.communityByComments.publishers}
                name="publisher"
                placeholder="Select site..."
                onChange={(newValue: any) => this.props.communityByComments.changePublisher(newValue.value)}
              /> */}
            </div>
          </div>
          <div className="card">
            {/* !this.props.communityByComments.selectedPublisher ? (
              <SelectPublisherState />
            ) : */ !this
              .props.communityByComments.loading && this.props.communityByComments.users.length <= 0 ? (
              <TableEmptyState />
            ) : (
              <Table loading={this.props.communityByComments.loading} users={this.props.communityByComments.users} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ByPointsPage;
