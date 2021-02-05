import { Comment, Tooltip, List } from "antd";
import moment from "moment";
import Rate from "../rate/Rate";
const Reviews = ({ content }) => {
  return (
    <List
      className="comment-list"
      header={`The product has ${content.length} reviews.`}
      itemLayout="horizontal"
      dataSource={content}
      renderItem={(item) => (
        <li>
          <Comment
            author={item.user.name}
            avatar={item.user.avatar}
            content={item.review}
            datetime={
              <Tooltip
                title={moment(item.updatedAt).format("HH:mm:ss DD-MM-YYYY")}
              >
                <span>{moment(item.updatedAt).fromNow()}</span>
              </Tooltip>
            }
            children={<Rate star={item.star}></Rate>}
          />
        </li>
      )}
    />
  );
};

export default Reviews;
