import React from 'react';
import { inject, observer } from 'mobx-react';
import withSizes from 'react-sizes';
import { ExplorePublishers } from 'stores/Explore';
import Footer from 'components/Footer';
import Subheader from './components/Subheader';
import Sorting from 'components/Sorting';
import Publishers from 'components/Publishers';
import SortingOption from 'stores/models/Sorting';

const sortingOptions: SortingOption[] = [
  { value: 'popular', label: 'Popular Publishers' },
  { value: 'trending', label: 'Trending Publishers' },
  { value: 'newest', label: 'Newest Publishers' },
];

interface Props {
  explore: ExplorePublishers;
  isMobile: boolean;
}

@withSizes(({ width }) => ({ isMobile: width < 768 }))
@inject('explore')
@observer
class Explore extends React.Component<Props, {}> {
  componentDidMount() {
    if (!this.props.explore.loading && this.props.explore.publishers.length <= 0) {
      this.props.explore.getPublishers();
    }
  }

  render() {
    const { isMobile } = this.props;

    return (
      <div>
        <Subheader />
        <div className="container" style={{ marginTop: '50px' }}>
          <div className="row">
            <div className="col-md-4 col-lg-3">
              <Sorting
                sortingOptions={sortingOptions}
                active={this.props.explore.sorting}
                onChange={this.props.explore.changeSorting}
                isMobile={isMobile}
              />
              {!isMobile && <Footer className="hide-xs" />}
            </div>
            <div className="col-md-8 col-lg-6">
              <Publishers
                publishers={this.props.explore.publishers}
                loading={this.props.explore.loading}
                loadMore={this.props.explore.getPublishers}
              />
            </div>
          </div>
          {isMobile && <Footer className="hide-xs" style={{ marginTop: '40px' }} />}
        </div>
      </div>
    );
  }
}

export default Explore;
