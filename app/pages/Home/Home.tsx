import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import withSizes from 'react-sizes';
import { HomePageArticles } from 'stores/Home';
import Footer from 'components/Footer';
import Sorting from 'components/Sorting';
import SortingOption from 'stores/models/Sorting';
import Publishers from 'components/Publishers';
import ArticleList from 'components/ArticleList';

const sortingOptions: SortingOption[] = [
  { value: 'most-commented', label: 'Most commented today' },
  { value: 'most-recommended', label: 'Most recommeneded' },
  { value: 'latest-comments', label: 'Latest comments' },
];

interface Props {
  home: HomePageArticles;
  isMobile: boolean;
}

@withSizes(({ width }) => ({ isMobile: width < 768 }))
@inject('home')
@observer
class HomePage extends Component<Props, {}> {
  componentDidMount() {
    if (!this.props.home.loading && this.props.home.articles.length <= 0) {
      this.props.home.getArticles();
      this.props.home.getPublishers();
      this.props.home.getTrendingTags();
    }
  }

  componentWillUnmount() {
    this.props.home.reset();
  }

  render() {
    const { isMobile } = this.props;
    return (
      <div>
        <div className="container" style={{ marginTop: '50px' }}>
          <div className="row">
            <div className="col-md-4 col-lg-3">
              <Sorting
                title="Feed"
                sortingOptions={sortingOptions}
                active={this.props.home.sorting}
                onChange={this.props.home.changeSorting}
                isMobile={isMobile}
              />
              {/* {!isMobile && (
                <TagsList title="Trending tags" tags={this.props.home.trendingTags} loading={this.props.home.loading} />
              )} */}
            </div>
            <div className="col-md-8 col-lg-6">
              <ArticleList articles={this.props.home.articles} loading={this.props.home.loadingArticles} />
            </div>
            <div className="col-md-4 col-lg-3">
              {/* {isMobile && (
                <TagsList title="Trending tags" tags={this.props.home.trendingTags} loading={this.props.home.loading} />
              )} */}
              <Publishers
                title="Popular publishers"
                publishers={this.props.home.publishers}
                loading={this.props.home.loadingPublishers}
              />
              <Footer className="hide-xs" style={{ marginTop: '40px' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
