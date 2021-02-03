import { Comment, Tooltip, List } from "antd";
import moment from "moment";
import Rate from "../rate/Rate";
const Reviews = ({ content }) => {
  return (
    <List
      className="comment-list"
      header={`${content.length} comments`}
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
                <span>{moment().subtract(1, "h").fromNow()}</span>
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
