import React from 'react';
import { css } from 'emotion';

interface Props {
  children: React.ReactElement<any> | HTMLElement;
}

export default class Truncate extends React.Component<Props> {
  commentDiv: HTMLParagraphElement;
  state = { truncated: false };

  componentDidMount() {
    if (this.commentDiv.offsetHeight > 100) {
      this.setState({ truncated: true });
    }
  }

  expandComment = (e) => {
    e.preventDefault();
    this.setState({ truncated: false });
  };

  render() {
    return [
      <p
        key="comment"
        ref={(el) => (this.commentDiv = el)}
        style={this.state.truncated ? { maxHeight: '350px', overflow: 'hidden' } : {}}
      >
        {this.props.children}
      </p>,
      this.state.truncated && (
        <a
          className={css`
            z-index: 901;
            text-align: center;
            font-size: 12px;
            font-weight: 700;
            padding: 5px 0;
            border-top: 2px solid #e7e9ee;
            display: block;
            color: #656c7a;
            &:before {
              content: ' ';
              height: 3px;
              display: block;
              box-shadow: 0 -3px 3px rgba(0, 0, 0, 0.08);
              position: relative;
              top: -5px;
            }
            &:hover {
              color: #2e9fff;
            }
            &:hover,
            &:focus {
              text-decoration: none;
              outline: none;
              box-shadow: none;
            }
          `}
          href="#1"
          onClick={this.expandComment}
          key="see-more"
        >
          Read more
        </a>
      ),
    ];
  }
}
