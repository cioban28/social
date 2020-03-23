import React from 'react';
import publisherPlaceholderImg from './publisher-placeholder.png';

interface Props {
  size?: string;
  name: string;
}

interface State {
  imageError: boolean;
}

class PublisherLogo extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {
    size: '36px',
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      imageError: false,
    };
  }

  render() {
    return (
      <img
        src={
          this.state.imageError
            ? publisherPlaceholderImg
            : `https://logo.clearbit.com/${this.props.name}?s=${parseInt(this.props.size, 10)}`
        }
        alt={this.props.name}
        onError={() => this.setState({ imageError: true })}
        width={this.props.size}
        height={this.props.size}
        style={{ borderRadius: '50%' }}
      />
    );
  }
}

export default PublisherLogo;
