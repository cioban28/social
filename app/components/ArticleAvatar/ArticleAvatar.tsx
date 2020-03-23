import React from 'react';
import avatarPlaceholder from 'static/article-avatar-placeholder.png';

interface Props {
  image: string | null;
  title: string;
}

interface State {
  imageError: boolean;
}

class ArticleAvatar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      imageError: false,
    };
  }

  render() {
    const { image, title } = this.props;
    return (
      <img
        className="card-img-top mb-3 mb-sm-3 mb-md-0"
        src={this.state.imageError ? avatarPlaceholder : image}
        alt={title}
        onError={() => {
          this.setState({ imageError: true });
        }}
      />
    );
  }
}

export default ArticleAvatar;
