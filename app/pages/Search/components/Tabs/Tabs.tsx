import React from 'react';
import { css } from 'emotion';

interface Props {
  activeTab: string;
  onTabChange: (tabName: string) => void;
}

const tabs = new Map();
tabs.set('articles', 'Articles');
tabs.set('users', 'Users');
tabs.set('publishers', 'Publishers');
tabs.set('comments', 'Comments');

const Tabs = ({ activeTab, onTabChange }: Props) => {
  return (
    <div
      className={css`
        background: #fff;
        width: 100%;
      `}
    >
      <div className="container">
        <ul
          className={css`
            display: flex;
            li {
              box-sizing: border-box;
              display: inline-block;
              transition: all 0.15s ease;
              border-color: #dd2e44;
              a {
                color: #657786;
                display: block;
                font-weight: bold;
                padding: 15px 18px;
                text-decoration: none !important;
                &.active {
                  border-bottom: 2px solid #dd2e44;
                }
              }
            }
          `}
        >
          {Array.from(tabs.keys()).map((key: string) => (
            <li key={key}>
              <a
                href="#1"
                className={activeTab === key ? 'active' : null}
                onClick={(e) => {
                  e.preventDefault();
                  onTabChange(key);
                }}
              >
                {tabs.get(key)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tabs;
