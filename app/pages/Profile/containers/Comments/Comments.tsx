import React from 'react';
import { inject, observer } from 'mobx-react';
import { CommentsStore } from 'stores/Comments';
import { PublicProfileStore } from 'stores/PublicProfile';
import { UserStore } from 'stores/User';
import Select from 'react-select';
import Comment from './components/Comment';
import CommentSkeleton from './components/CommentSkeleton';
import Spin from 'antd/lib/spin';
import Modal from 'antd/lib/modal';
import notification from 'antd/lib/notification';
const confirm = Modal.confirm;

interface State {
  comments: number;
}

interface Props {
  comments: CommentsStore;
  profile: PublicProfileStore;
  user: UserStore;
}

interface Option {
  value: '0' | '1' | '2';
  label: string;
}

const options: Option[] = [
  { value: '0', label: 'Approved' },
  { value: '1', label: 'On moderation' },
  { value: '2', label: 'Rejected' },
];

@inject('comments', 'profile', 'user')
@observer
class CommentsPage extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      comments: 5,
    };
  }

  componentDidMount() {
    if (this.props.comments.items.length <= 0 && !this.props.comments.loading) {
      this.props.comments.getComments();
    }
  }

  handleCommentDelete = (comment) => {
    confirm({
      title: 'Do you want to delete this comment?',
      content: '',
      onOk: () => {
        this.props.comments.removeComment(comment).then((isSuccess: boolean) => {
          if (!isSuccess) {
            notification.error({
              message: 'Comment has not been removed',
              description: 'Please try again a bit later if error ',
            });
          }
        });
      },
    });
  };

  render() {
    const isOwner = (this.props.user.details && this.props.user.details.id) === this.props.profile.id;
    return (
      <div>
        {isOwner && (
          <div style={{ marginBottom: '10px', textAlign: 'right' }}>
            <span style={{ marginRight: '10px' }}>Show:</span>
            <Select
              options={options}
              defaultValue={options.find((item) => item.value === this.props.comments.status)}
              styles={{
                container: (base: any) => ({
                  ...base,
                  'min-width': '180px',
                  display: 'inline-block',
                  textAlign: 'left',
                }),
              }}
              onChange={(selected: Option) => this.props.comments.changeStatus(selected.value)}
            />
          </div>
        )}
        {this.props.comments.loading &&
          this.props.comments.items.length <= 0 && (
            <>
              <CommentSkeleton />
              <CommentSkeleton />
              <CommentSkeleton />
            </>
          )}
        {this.props.comments.items.map((comment) => (
          <Comment
            key={comment.data.id}
            comment={comment}
            profileDetails={this.props.profile.details}
            isOwner={isOwner}
            handleCommentDelete={this.handleCommentDelete}
          />
        ))}
        {this.props.comments.loadMoreAvailable &&
          this.props.comments.items.length > 0 && (
            <button
              type="button"
              className="btn btn-secondary btn-block"
              disabled={this.props.comments.loading}
              onClick={() => this.props.comments.getComments(true)}
            >
              {this.props.comments.loading ? <Spin wrapperClassName="light" /> : 'Load More'}
            </button>
          )}
      </div>
    );
  }
}

export default CommentsPage;
