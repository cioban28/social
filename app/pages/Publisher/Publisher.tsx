import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import withSizes from 'react-sizes';

/* import components */
import Footer from 'components/Footer';
import Sorting from 'components/Sorting';
import ArticleList from 'components/ArticleList';
import PublisherCard from './components/PublisherCard';
import UsersList from './components/UsersList';

/* import types */
import SortingOption from 'stores/models/Sorting';
import { PublisherStore } from 'stores/PublisherPageStore';

const sortingOptions: SortingOption[] = [
  { value: 'most-commented', label: 'Most commented today' },
  { value: 'most-recommended', label: 'Most recommeneded' },
  { value: 'latest-comments', label: 'Latest comments' },
];

interface Props {
  publisher: PublisherStore;
  isMobile?: boolean;
  match: {
    params: {
      publisherName: string;
    };
  };
  location: {
    pathname: string;
  };
  history: {
    replace: (route: string) => void;
  };
}

@withSizes(({ width }) => ({ isMobile: width < 768 }))
@inject('publisher')
@observer
class PublisherPage extends Component<Props, {}> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.publisher.publisherName = this.props.match.params.publisherName;

    if (!this.props.publisher.loadingPublisher && !this.props.publisher.publisher) {
      this.props.publisher.getPublisher();
    }
    // if (!this.props.publisher.loadingTags && this.props.publisher.trendingTags.length <= 0) {
    //   this.props.publisher.getTrendingTags();
    // }
    if (!this.props.publisher.loadingArcticles && this.props.publisher.articles.length <= 0) {
      this.props.publisher.getArticles('most-commented');
    }
    if (!this.props.publisher.loadingUsers && this.props.publisher.users.length <= 0) {
      this.props.publisher.getUsers();
    }
  }

  componentWillUpdate(nextProps: Props) {
    /** If user is not found */
    if (nextProps.publisher.error) {
      this.props.history.replace('/not-found');
    }

    console.log(nextProps, this.props);
  }

  componentWillUnmount() {
    /** Clear auth values on route change */
    this.props.publisher.reset();
  }
  render() {
    const { isMobile } = this.props;
    const {
      loadingArcticles,
      // loadingTags,
      loadingPublisher,
      loadingUsers,
      sorting,
      articles,
      changeSorting,
      // trendingTags,
      publisher,
      users,
      getUsers,
    } = this.props.publisher;

    return (
      <div>
        {isMobile && <PublisherCard publisher={publisher} loading={loadingPublisher} />}
        <div className="container mt-4 mt-sm-4">
          {isMobile && (
            <UsersList title="Most active users" users={users} loading={loadingUsers} loadMore={() => getUsers()} />
          )}
          <div className="row">
            <div className="col-md-4 col-lg-3">
              <Sorting
                title="Feed"
                sortingOptions={sortingOptions}
                active={sorting}
                onChange={changeSorting}
                isMobile={isMobile}
              />
              {/* {!isMobile && <TagsList title="Trending tags" tags={trendingTags} loading={loadingTags} />} */}
            </div>
            <div className="col-md-8 col-lg-6">
              <ArticleList articles={articles} loading={loadingArcticles} />
            </div>
            <div className="col-md-4 col-lg-3">
              {/* {isMobile && <TagsList title="Trending tags" tags={trendingTags} loading={loadingTags} />} */}
              {!isMobile && <PublisherCard publisher={publisher} loading={loadingPublisher} />}
              {!isMobile && <UsersList title="Most active users" users={users} loading={loadingUsers} />}
              <Footer className="hide-xs" style={{ marginTop: '40px' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PublisherPage;
