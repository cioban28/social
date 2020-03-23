import React from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Upload from 'antd/lib/upload';
import message from 'antd/lib/message';
import Cookies from 'js-cookie';
const FormItem = Form.Item;
import axios from 'axios';
const Dragger = Upload.Dragger;
import './styles.scss';

interface Props {
  form?: any;
}

interface DraggerProps {
  name: string;
  multiple: boolean;
  action: string;
  onChange: (info: { file: any }) => void;
  customRequest: (customRequest: any) => void;
}

class AccountSettings extends React.Component<Props, {}> {
  draggerProps: DraggerProps;

  constructor(props: any) {
    super(props);
    this.state = {};
    this.draggerProps = {
      name: 'file',
      multiple: false,
      action: `${process.env.API_URL}/api/v1/Users/uploadUserImage`,
      customRequest: (customRequest: any) => {
        const token = Cookies.get(process.env.SESSION_COOKIE_NAME);
        const formData = new FormData();
        formData.append('file', customRequest.file);
        return axios
          .post(`${process.env.API_URL}/api/v1/Users/uploadUserImage`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          })
          .then(customRequest.onSuccess)
          .catch(customRequest.onError);
      },
      onChange(info: { file: any }) {
        const status = info.file.status;
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <p>Avatar:</p>
        <div className="avatar-update-wrapper">
          <Dragger {...this.draggerProps} className="avatar-dragger">
            <p className="ant-upload-text">Change avatar</p>
            <p className="ant-upload-hint">Click or drag file to this area to upload</p>
          </Dragger>
          <span>
            or <a href="#">reset to default avatar</a>
          </span>
        </div>
        <Form>
          <FormItem label="Name">
            {getFieldDecorator('text', {
              rules: [
                {
                  required: true,
                  message: 'Please enter your name',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="E-mail">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please enter your email',
                },
              ],
            })(<Input />)}
          </FormItem>
          <Button type="primary" style={{ display: 'block', width: '100%' }} htmlType="submit">
            Save
          </Button>
        </Form>
      </div>
    );
  }
}

export default Form.create()(AccountSettings);
