import Form from './form';

const App = () => {
  return (
    <Form
      initialValues={{
        username: '123',
        is_admin: true,
      }}
    >
      <Form.Item label="用户名" name="username" initialValue="345">
        <input type="text" />
      </Form.Item>
      <Form.Item label="品牌" name="role" initialValue="saab">
        <select>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </Form.Item>
      <Form.Item label="是否是管理员" name="is_admin" valuePropName="checked">
        <input type="checkbox" />
      </Form.Item>
    </Form>
  );
};

export default App;