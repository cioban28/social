import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { GoogleButton, FacebookButton, LinkedinButton, TwitterButton } from 'components/SocialButtons';

interface Props {
  shares: number;
  article: any;
}

const openShareWindow = (social, article) => {
  const openShare = (urlForWindow: string) =>
    window.open(
      urlForWindow,
      'shareWindow',
      'status = 1, height = 500, width = 420, resizable = 0, top=200, left=400, screenX=400, screenY=200'
    );

  // reportEvent(social);

  // Encode url and title back to prevent unsafe javascript navigation error.
  const url = encodeURIComponent(article.url);
  const title = encodeURIComponent(article.title);

  switch (social.toLowerCase()) {
    case 'share_twitter':
      return openShare(`https://twitter.com/share?url=${url}`);
    case 'share_google':
      return openShare(`https://plus.google.com/share?url=${url}`);
    case 'share_linkedin':
      return openShare(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=&source=`);
    default:
      return openShare(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
  }
};

const handleShareClick = (socialNetwork, article) => {
  return openShareWindow(socialNetwork, article);
};

const ShareButton = ({ shares, article }: Props) => (
  <UncontrolledDropdown direction="up">
    <DropdownToggle className="small" tag="a" style={{ cursor: 'pointer' }}>
      Shares
      <span className="badge badge-pill badge-light ml-1">{shares}</span>
    </DropdownToggle>
    <DropdownMenu style={{ borderRadius: '50px' }} className="py-1">
      <DropdownItem className="p-1 m-0" tag="p">
        <GoogleButton onClick={() => handleShareClick('share_google', article)} title="Google" />
        <FacebookButton onClick={() => handleShareClick('share_facebook', article)} title="Facebook" />
        <TwitterButton onClick={() => handleShareClick('share_twitter', article)} title="Twitter" />
        <LinkedinButton onClick={() => handleShareClick('share_linkedin', article)} title="Linkedin" />
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
);

export default ShareButton;
