import React from 'react';
import { getInitials } from 'utils';
import './styles.scss';

interface Props {
  size?: string;
  src?: string;
  name: string;
}

interface State {
  imageError: boolean;
}

class Avatar extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {
    size: '32px',
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      imageError: !props.src,
    };
  }

  componentWillUpdate(nextProps: any) {
    if (this.props.src !== nextProps.src) {
      this.setState({ imageError: false });
    }
  }

  handleError = () => this.setState({ imageError: true });

  render() {
    const { size, name } = this.props;
    const fontSize: string = parseInt(size, 10) / 2 + 'px';

    return (
      <figure className="avatar" data-initial={getInitials(name)} style={{ width: size, height: size, fontSize }}>
        {!this.state.imageError && this.props.src && <img src={this.props.src} alt={name} onError={this.handleError} />}
      </figure>
    );
  }
}

export default Avatar;
