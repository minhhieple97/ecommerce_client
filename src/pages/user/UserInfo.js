import React, { useState } from "react";
import { Button, Card, Cascader, Tooltip } from "antd";
// import { toast } from "react-toastify";
// import { auth } from "../../firebase";
import { Form, Input, InputNumber, Select } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { getCities, getDistricts, getWards } from "../../services/api/address";
import { transformCascader, transformCascaderLeaf } from "../../ultil/helper";
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
// const validateMessages = {
//   required: `${label} is required!`,
//   types: {
//     email: "${label} is not a valid email!",
//     number: "${label} is not a valid number!",
//   },
//   number: {
//     range: "${label} must be between ${min} and ${max}",
//   },
// };
const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select defaultValue="+84" style={{ width: 70 }}>
      <Option value="+84">+84</Option>
    </Select>
  </Form.Item>
);
const UserInfo = () => {
  // const [password] = useState("");
  // const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState(null);
  const [form] = Form.useForm();

  const onChange = (value) => {
    console.log({ value });
  };
  const loadData = async (selectedOptions) => {
    if (selectedOptions.length < 3) {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;
      switch (selectedOptions.length) {
        case 1:
          (async () => {
            const { districts } = await getDistricts({
              cityCode: targetOption.value,
            });
            targetOption.children = transformCascaderLeaf(districts);
            targetOption.loading = false;
            setCities([...cities]);
          })();
          break;
        case 2:
          (async () => {
            const { wards } = await getWards({
              districtCode: targetOption.value,
            });
            targetOption.children = transformCascader(wards);
            targetOption.loading = false;
            setCities([...cities]);
          })();
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    const _getCities = async () => {
      const { cities } = await getCities();
      const transformCities = transformCascaderLeaf(cities);
      setCities(transformCities);
    };
    _getCities();
  }, []);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  // const handleSubmit = async () => {
  //   try {
  //     if (!password || password.length < 6) {
  //       throw new Error("Password must be 6 characters or more.");
  //     }
  //     setLoading(true);
  //     await auth.currentUser.updatePassword(password);
  //     setLoading(false);
  //     toast.success("Password successfully updated.");
  //   } catch (error) {
  //     setLoading(false);
  //     toast.error(error.message);
  //   }
  // };

  return (
    <Card>
      <Form
        {...formItemLayout}
        // validateMessages={validateMessages}
        form={form}
        name="user-info"
        onFinish={onFinish}
        initialValues={{
          home: ["City", "District", "Ward"],
          work_place: ["City", "District", "Ward"],
          prefix: "+84",
        }}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label={
            <span>
              Username&nbsp;
              <Tooltip title="What do you want others to call you?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone number"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="home" label="Home">
          <Cascader
            options={cities}
            onChange={onChange}
            loadData={loadData}
            changeOnSelect
            placeholder="Please enter your home address."
          />
        </Form.Item>
        <Form.Item name="work_place" label="Work place">
          <Cascader
            options={cities}
            onChange={onChange}
            loadData={loadData}
            changeOnSelect
            placeholder="Please enter your workplace's address."
          />
        </Form.Item>
        <Form.Item
          name="age"
          label="Age"
          rules={[
            {
              type: "number",
              min: 14,
              max: 99,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default UserInfo;
