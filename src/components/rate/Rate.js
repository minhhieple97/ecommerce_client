import { Rate } from "antd";
const RateStar = ({ star }) => {
  return <Rate allowHalf value={star} disabled />;
};
export default RateStar;
