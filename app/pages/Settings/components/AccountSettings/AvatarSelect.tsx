import React from 'react';
import { UserStore } from 'stores/User';
import { uploadUserAvatar } from 'services/api';
import Avatar from 'components/Avatar';
import Select from 'react-select';
import md5 from 'md5';

interface Option {
  label: string;
  value: string;
}

interface Props {
  user?: UserStore;
  onChange: (fieldName: string, value: string | Option) => void;
  onBlur: (fieldName: string, blur: boolean) => void;
  value: Option;
  avatarUrl?: string;
  touched?: boolean;
}

class AvatarSelect extends React.Component<Props> {
  options: Option[];

  constructor(props: Props) {
    super(props);

    this.options = [
      { value: `gravatar`, label: 'Gravatar' },
      { value: 'default', label: 'Default' },
      { value: 'upload', label: 'Upload' },
    ];
  }
  handleChange = (selected: Option) => {
    let val = '';
    // this is going to call setFieldValue and manually update values.avatar
    if (selected.value === 'gravatar') {
      val = `https://www.gravatar.com/avatar/${md5(this.props.user.details.email)}`;
    }

    this.props.onChange('avatarSelect', selected);
    this.props.onChange('avatarUrl', val);
  };

  handleFileInputChange = (e) => {
    const formData = new FormData();
    formData.append('File', e.target.files[0]);

    uploadUserAvatar(formData);
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.avatar
    this.props.onBlur('avatarSelect', true);
  };

  render() {
    const { user, avatarUrl, value } = this.props;

    return (
      <div className="form-group">
        <label htmlFor="avatar">Avatar</label>
        <div style={{ display: 'flex' }}>
          {/** We could use if inside `src` param but since Avatar is pureComponent we need to use this */}
          <div style={{ minWidth: '50px' }}>
            <Avatar src={avatarUrl} name={user.details.name} size="49px" />
          </div>
          <div style={{ width: '100%', maxWidth: '250px', marginLeft: '10px', verticalAlign: 'middle' }}>
            <div className="form-group">
              <Select
                options={this.options}
                id="avatar"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                value={value}
              />
            </div>
            {value &&
              value.value === 'upload' && (
                <div className="form-group">
                  <input
                    type="file"
                    name="avatarFile"
                    accept=".png, .jpg, .jpeg"
                    onChange={this.handleFileInputChange}
                  />
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default AvatarSelect;
