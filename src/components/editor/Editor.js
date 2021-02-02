import { Form } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
const Editor = ({ onChange, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
    </>
);
export default Editor