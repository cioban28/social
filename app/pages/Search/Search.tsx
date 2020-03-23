import React from 'react';
import { inject, observer } from 'mobx-react';
import { SearchStore, tabType } from 'stores/Search';
import SubHeader from './components/SubHeader';
import Tabs from './components/Tabs';
import ArticleList from 'components/ArticleList';
import Users from './containers/Users';
import Publishers from './containers/Publishers';

interface Props {
  search: SearchStore;
  location: {
    search: string;
  };
}

@inject('search')
@observer
class Search extends React.Component<Props, {}> {
  getSearchValue = (query: string) => {
    try {
      const searchParams = new URLSearchParams(query);
      const searchValue = searchParams.get('value');

      if (searchValue) {
        return (this.props.search.searchValue = searchValue);
      }

      this.props.search.searchValue = null;
    } catch (e) {
      this.props.search.searchValue = null;
    }
  };

  componentWillMount() {
    this.getSearchValue(this.props.location.search);
  }

  componentWillUpdate(nextProps: Props) {
    if (this.props.location.search !== nextProps.location.search) {
      this.getSearchValue(nextProps.location.search);
    }
  }

  render() {
    const { activeTab } = this.props.search;
    return (
      <>
        <SubHeader searchValue={this.props.search.searchValue} />
        <Tabs activeTab={activeTab} onTabChange={(tab: tabType) => (this.props.search.activeTab = tab)} />
        <div className="container">
          <div className="row">
            <div className="col-lg-3" />
            <div className="col-lg-6">
              {activeTab === 'articles' && (
                <ArticleList articles={this.props.search.articles.items} loading={this.props.search.articles.loading} />
              )}
              {activeTab === 'publishers' && (
                <Publishers
                  loading={this.props.search.publishers.loading}
                  result={this.props.search.publishers.items}
                  loadMore={() => this.props.search.getPublishersResult(true)}
                />
              )}
              {activeTab === 'users' && (
                <Users
                  loading={this.props.search.users.loading}
                  result={this.props.search.users.items}
                  loadMore={() => this.props.search.getUsersResult(true)}
                />
              )}
            </div>
            <div className="col-lg-3" />
          </div>
        </div>
      </>
    );
  }
}

export default Search;
